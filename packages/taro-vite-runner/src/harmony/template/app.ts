import path from 'path'

import { escapePath, resolveAbsoluteRequire } from '../../utils'
import { TARO_COMP_SUFFIX } from '../entry'
import { TARO_TABBAR_PAGE_PATH } from '../page'
import BaseParser from './base'

import type { AppConfig } from '@tarojs/taro'
import type { TRollupResolveMethod } from '@tarojs/taro/types/compile/config/plugin'
import type { ViteHarmonyBuildConfig } from '@tarojs/taro/types/compile/viteCompilerContext'

export default class Parser extends BaseParser {
  #setReconciler = ''
  #setReconcilerPost = ''

  constructor (
    protected appPath: string,
    protected appConfig: AppConfig,
    protected buildConfig: ViteHarmonyBuildConfig,
    protected loaderMeta: Record<string, unknown>,
  ) {
    super()
    this.init()
  }

  init () {
    const runtimePath = Array.isArray(this.buildConfig.runtimePath) ? this.buildConfig.runtimePath : [this.buildConfig.runtimePath]
    this.#setReconciler = runtimePath.reduce((res, item) => {
      if (item && /^post:/.test(item)) {
        this.#setReconcilerPost += `import '${item.replace(/^post:/, '')}'\n`
        return res
      } else {
        return res + `import '${item}'\n`
      }
    }, '') || ''
  }

  get pxTransformConfig () {
    const pxTransformOption = this.buildConfig.postcss?.pxtransform || {}
    const pxTransformConfig = pxTransformOption.config || {}
    pxTransformConfig.designWidth = this.buildConfig.designWidth
    pxTransformConfig.deviceRatio = this.buildConfig.deviceRatio
    return pxTransformConfig
  }

  getInitPxTransform () {
    return this.transArr2Str([
      'initPxTransform({',
      this.transArr2Str([
        `designWidth: ${this.pxTransformConfig.designWidth},`,
        `deviceRatio: (${JSON.stringify(this.pxTransformConfig.deviceRatio)}) as Record<string, number>,`,
        `baseFontSize: ${this.pxTransformConfig.baseFontSize},`,
        `unitPrecision: ${this.pxTransformConfig.unitPrecision},`,
        `targetUnit: ${JSON.stringify(this.pxTransformConfig.targetUnit)},`,
      ], 2),
      '} as TaroAny)',
    ])
  }

  get instantiateApp () {
    const { modifyInstantiate } = this.loaderMeta
    const { pages = [], entryPagePath = pages[0], tabBar } = this.appConfig
    let entryPath = entryPagePath
    const tabbarList = tabBar?.list || []
    const tabbarIndex = tabbarList.findIndex(item => item.pagePath === entryPagePath)
    if (tabbarIndex >= 0) {
      entryPath = TARO_TABBAR_PAGE_PATH
    }

    let instantiateApp = `export default class EntryAbility extends UIAbility {
  app?: AppInstance

  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
    AppStorage.setOrCreate('__TARO_ENTRY_PAGE_PATH', '${entryPagePath}')
    AppStorage.setOrCreate('__TARO_PAGE_STACK', [])
    // 引入
    initHarmonyElement()
    this.app = createComponent()
    callFn(this.app?.onLaunch, this, ObjectAssign(want, launchParam))
  }

  onDestroy() {}

  onWindowStageCreate(stage: ohWindow.WindowStage) {
    context.resolver(this.context)
    stage.loadContent('${entryPath}', (err, data) => {
      if (err.code) {
        return callFn(this.app?.onError, this, err)
      }
    })
  }

  onForeground() {
    callFn(this.app?.onShow, this)
  }

  onBackground() {
    callFn(this.app?.onHide, this)
  }

  onMemoryLevel(level: AbilityConstant.MemoryLevel) {
    let levelRes: number

    switch (level) {
      case AbilityConstant.MemoryLevel.MEMORY_LEVEL_MODERATE:
        levelRes = 5
        break
      case AbilityConstant.MemoryLevel.MEMORY_LEVEL_LOW:
        levelRes = 10
        break
      case AbilityConstant.MemoryLevel.MEMORY_LEVEL_CRITICAL:
        levelRes = 15
        break
    }

    if (levelRes) {
      hooks.call('getMemoryLevel', { level: levelRes })
    }
  }
}
`

    if (typeof modifyInstantiate === 'function') {
      instantiateApp = modifyInstantiate(instantiateApp, 'app')
    }

    return instantiateApp
  }

  parse (rawId: string, name = 'TaroPage', resolve?: TRollupResolveMethod) {
    const { modifyResolveId } = this.loaderMeta

    const code = this.transArr2Str([
      'import type Want from "@ohos.app.ability.Want"',
      'import type ohWindow from "@ohos.window"',
      '',
      'import UIAbility from "@ohos.app.ability.UIAbility"',
      'import AbilityConstant from "@ohos.app.ability.AbilityConstant"',
      'import { callFn, context, ObjectAssign, TaroAny, window } from "@tarojs/runtime"',
      'import { AppInstance } from "@tarojs/runtime/dist/runtime.esm"',
      'import { initHarmonyElement, hooks } from "@tarojs/runtime"',
      'import Taro, { initNativeApi, initPxTransform } from "@tarojs/taro"',
      `import createComponent, { config } from "./${path.basename(rawId, path.extname(rawId))}${TARO_COMP_SUFFIX}"`,
      '',
      'window.__taroAppConfig = config',
      'initNativeApi(Taro)',
      this.getInitPxTransform(),
      this.instantiateApp,
    ])

    const { outputRoot = 'dist', sourceRoot = 'src' } = this.buildConfig
    return resolveAbsoluteRequire({
      name,
      importer: rawId,
      code,
      outputRoot,
      targetRoot: path.resolve(this.appPath, sourceRoot),
      resolve,
      modifyResolveId,
    })
  }

  parseEntry (rawId: string, config = {}) {
    const { creator, creatorLocation, frameworkArgs, importFrameworkStatement } = this.loaderMeta
    const createApp = `${creator}(component, ${frameworkArgs})`

    return this.transArr2Str([
      this.#setReconciler,
      `import { ${creator} } from "${creatorLocation}"`,
      `import component from "${escapePath(rawId)}"`,
      this.#setReconcilerPost,
      importFrameworkStatement,
      `export const config = ${this.prettyPrintJson(config)}`,
      `export default () => ${createApp}`,
    ])
  }
}
