const TARO_TEMPLATES_f0t0 = `import { createLazyChildren, createChildItem } from '../render'
import { FlexManager } from '../utils/FlexManager'
import { TOUCH_EVENT_MAP } from '../utils/constant/event'
import { getNodeThresholds, getNormalAttributes, getFontAttributes } from '../utils/helper'
import { TaroElement, eventHandler, getComponentEventCallback, AREA_CHANGE_EVENT_NAME, VISIBLE_CHANGE_EVENT_NAME } from '../../runtime'
import { DynamicCenter } from '../utils/DynamicCenter'

import type { TaroViewElement, TaroAny, TaroStyleType, TaroTextStyleType } from '../../runtime'

@Extend(Flex)
function attrs (style: TaroStyleType) {
  .id(style.id)
  .key(style.id)
  .padding(style.padding)
  .margin(style.margin)
  .width(style.width)
  .height(style.height)
  .constraintSize(style.constraintSize)
  .flexGrow(style.flexGrow)
  .flexShrink(style.flexShrink)
  .flexBasis(style.flexBasis)
  .alignSelf(style.alignSelf)
  .backgroundColor(style.backgroundColor)
  .backgroundImage(style.backgroundImage, style.backgroundRepeat)
  .backgroundImageSize(style.backgroundImageSize)
  .backgroundImagePosition(style.backgroundImagePosition)
  .rotate(style.rotate)
  .scale(style.scale)
  .translate(style.translate)
  .transform(style.transform)
  .borderStyle(style.borderStyle)
  .borderWidth(style.borderWidth)
  .borderColor(style.borderColor)
  .borderRadius(style.borderRadius)
  .linearGradient(style.linearGradient)
  .zIndex(style.zIndex)
  .opacity(style.opacity)
  .clip(style.clip)
}
@Extend(Image)
function attrsImage (style: TaroStyleType) {
  .id(style.id)
  .key(style.id)
  .padding(style.padding)
  .margin(style.margin)
  .width(style.width)
  .height(style.height)
  .constraintSize(style.constraintSize)
  .flexGrow(style.flexGrow)
  .flexShrink(style.flexShrink)
  .flexBasis(style.flexBasis)
  .alignSelf(style.alignSelf)
  .backgroundColor(style.backgroundColor)
  .backgroundImage(style.backgroundImage, style.backgroundRepeat)
  .backgroundImageSize(style.backgroundImageSize)
  .backgroundImagePosition(style.backgroundImagePosition)
  .rotate(style.rotate)
  .scale(style.scale)
  .translate(style.translate)
  .transform(style.transform)
  .borderStyle(style.borderStyle)
  .borderWidth(style.borderWidth)
  .borderColor(style.borderColor)
  .borderRadius(style.borderRadius)
  .linearGradient(style.linearGradient)
  .zIndex(style.zIndex)
  .opacity(style.opacity)
  .clip(style.clip)
}

function getImageMode (mode: string): ImageFit {
  switch (mode) {
    case 'aspectFit': return ImageFit.Contain
    case 'aspectFill': return ImageFit.Cover
    case 'scaleToFill': return ImageFit.Fill
    case 'widthFix': return ImageFit.Auto
    case 'heightFix': return ImageFit.Auto
    default: return ImageFit.Contain
  }
}
@Component
export default struct TARO_TEMPLATES_f0t0 {
  node: TaroViewElement = new TaroElement('Ignore')

  dynamicCenter: DynamicCenter = new DynamicCenter()

  aboutToAppear () {
    this.dynamicCenter.bindComponentToNodeWithDFS(this.node, this)
  }

  @State node0: TaroElement = new TaroElement('Ignore')
  @State node1: TaroElement = new TaroElement('Ignore')
  @State node2: TaroElement = new TaroElement('Ignore')
  @State node3: TaroElement = new TaroElement('Ignore')
  @State node4: TaroElement = new TaroElement('Ignore')
  @State node5: TaroElement = new TaroElement('Ignore')
  
  build() {
    Flex(FlexManager.flexOptions(this.node0 as TaroElement)) {
      Flex(FlexManager.flexOptions(this.node1 as TaroElement)) {
        Flex(FlexManager.flexOptions(this.node2 as TaroElement)) {}
        .attrs(getNormalAttributes(this.node2 as TaroElement))
        .onVisibleAreaChange(getNodeThresholds(this.node2 as TaroElement) || [0.0, 1.0], getComponentEventCallback(this.node2 as TaroElement, VISIBLE_CHANGE_EVENT_NAME))
        .onAreaChange(getComponentEventCallback(this.node2 as TaroElement, AREA_CHANGE_EVENT_NAME, (res: TaroAny) => {
          if (this.node) {
            this.node2._nodeInfo.areaInfo = res[1]
          }
        }))
        Flex(FlexManager.flexOptions(this.node1.childNodes[1] as TaroElement)) {}
        .attrs(getNormalAttributes(this.node1.childNodes[1] as TaroElement))
        .onVisibleAreaChange(getNodeThresholds(this.node1.childNodes[1] as TaroElement) || [0.0, 1.0], getComponentEventCallback(this.node1.childNodes[1] as TaroElement, VISIBLE_CHANGE_EVENT_NAME))
        .onAreaChange(getComponentEventCallback(this.node1.childNodes[1] as TaroElement, AREA_CHANGE_EVENT_NAME, (res: TaroAny) => {
          if (this.node) {
            this.node1.childNodes[1]._nodeInfo.areaInfo = res[1]
          }
        }))
        Flex(FlexManager.flexOptions(this.node3 as TaroElement)) {
          Flex(FlexManager.flexOptions(this.node4 as TaroElement)) {}
          .attrs(getNormalAttributes(this.node4 as TaroElement))
          .onVisibleAreaChange(getNodeThresholds(this.node4 as TaroElement) || [0.0, 1.0], getComponentEventCallback(this.node4 as TaroElement, VISIBLE_CHANGE_EVENT_NAME))
          .onAreaChange(getComponentEventCallback(this.node4 as TaroElement, AREA_CHANGE_EVENT_NAME, (res: TaroAny) => {
            if (this.node) {
              this.node4._nodeInfo.areaInfo = res[1]
            }
          }))
        }
        .attrs(getNormalAttributes(this.node3 as TaroElement))
        .onVisibleAreaChange(getNodeThresholds(this.node3 as TaroElement) || [0.0, 1.0], getComponentEventCallback(this.node3 as TaroElement, VISIBLE_CHANGE_EVENT_NAME))
        .onAreaChange(getComponentEventCallback(this.node3 as TaroElement, AREA_CHANGE_EVENT_NAME, (res: TaroAny) => {
          if (this.node) {
            this.node3._nodeInfo.areaInfo = res[1]
          }
        }))
      }
      .attrs(getNormalAttributes(this.node1 as TaroElement))
      .onVisibleAreaChange(getNodeThresholds(this.node1 as TaroElement) || [0.0, 1.0], getComponentEventCallback(this.node1 as TaroElement, VISIBLE_CHANGE_EVENT_NAME))
      .onAreaChange(getComponentEventCallback(this.node1 as TaroElement, AREA_CHANGE_EVENT_NAME, (res: TaroAny) => {
        if (this.node) {
          this.node1._nodeInfo.areaInfo = res[1]
        }
      }))
      Image((this.node0.childNodes[1] as TaroElement).getAttribute('src'))
      .objectFit(getImageMode((this.node0.childNodes[1] as TaroElement).getAttribute('mode')))
      .attrsImage(getNormalAttributes(this.node0.childNodes[1] as TaroElement))
      .onVisibleAreaChange(getNodeThresholds(this.node0.childNodes[1] as TaroElement) || [0.0, 1.0], getComponentEventCallback(this.node0.childNodes[1] as TaroElement, VISIBLE_CHANGE_EVENT_NAME))
      .onAreaChange(getComponentEventCallback(this.node0.childNodes[1] as TaroElement, AREA_CHANGE_EVENT_NAME, (res: TaroAny) => {
        if (this.node) {
          this.node0.childNodes[1]._nodeInfo.areaInfo = res[1]
        }
      }))
      Image((this.node5 as TaroElement).getAttribute('src'))
      .objectFit(getImageMode((this.node5 as TaroElement).getAttribute('mode')))
      .attrsImage(getNormalAttributes(this.node5 as TaroElement))
      .onVisibleAreaChange(getNodeThresholds(this.node5 as TaroElement) || [0.0, 1.0], getComponentEventCallback(this.node5 as TaroElement, VISIBLE_CHANGE_EVENT_NAME))
      .onAreaChange(getComponentEventCallback(this.node5 as TaroElement, AREA_CHANGE_EVENT_NAME, (res: TaroAny) => {
        if (this.node) {
          this.node5._nodeInfo.areaInfo = res[1]
        }
      }))
    }
    .attrs(getNormalAttributes(this.node0 as TaroElement))
    .onVisibleAreaChange(getNodeThresholds(this.node0 as TaroElement) || [0.0, 1.0], getComponentEventCallback(this.node0 as TaroElement, VISIBLE_CHANGE_EVENT_NAME))
    .onAreaChange(getComponentEventCallback(this.node0 as TaroElement, AREA_CHANGE_EVENT_NAME, (res: TaroAny) => {
      if (this.node) {
        this.node0._nodeInfo.areaInfo = res[1]
      }
    }))
  }
}
`;
function Index() {
    return <View compileMode="f0t0" _dynamicID="node0">

            <View class={myClass} _dynamicID="node1">

              <View style={myStyle} customProp={myCustomProp} _dynamicID="node2"></View>

              <View class="center"/>

              <View onTouch={myTime} _dynamicID="node3">

                <View hoverClass={myHoverClass} _dynamicID="node4"></View>

              </View>

            </View>

            <Image alt="占位符" src="https://www.jd.com/test.jpg"/>

            <Image alt="占位符" src={src} _dynamicID="node5"/>

          </View>;
}
