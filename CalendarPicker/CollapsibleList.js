import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Animated, TouchableOpacity, Text, Image } from 'react-native'

export default class CollapsibleList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // Animation stop points
      maxHeight: 0,
      minHeight: 0,
      //
      // Track items that was calculated their size
      calculatedItems: 0,
      calculationCompleted: false,
      //
      collapsed: true,
      initialized: false,
      animation: new Animated.Value(),
      fadeContentOpacity: new Animated.Value(),

      started: false
    }
  }

  setMinHeight(event) {
    const { height: minHeight } = event.nativeEvent.layout

    if (this.state.started) {
      this.state.animation.setValue(minHeight)
    } else {
      this.state.animation.setValue(this.props.initialHeight)
    }

    this.state.fadeContentOpacity.setValue(this.state.collapsed ? 1 : 0)

    this.setState({ minHeight }, () => {
      this.setState({ initialized: true, started: true })
    })
  }

  animate(toHeightValue, toOpacityValue, callback) {
    const { animation, fadeContentOpacity } = this.state
    const { animationConfig, animationType } = this.props
    switch (animationType) {
      case 'spring':
        Animated.spring(animation, { ...animationConfig, toValue: toHeightValue }).start()
        Animated.spring(fadeContentOpacity, { ...animationConfig, toValue: toOpacityValue }).start(callback)
        break
      case 'timing':
        Animated.timing(animation, { ...animationConfig, toValue: toHeightValue }).start()
        Animated.timing(fadeContentOpacity, { ...animationConfig, toValue: toOpacityValue }).start(callback)
        break
    }
  }

  onItemLayout(event) {
    const { calculatedItems, calculationCompleted } = this.state
    const { children, numberOfVisibleItems } = this.props
    const { height } = event.nativeEvent.layout

    // Generate maximum height of list based on height of the items
    if (!calculationCompleted) {
      this.setState(prevState => ({ maxHeight: prevState.maxHeight + height }), () => {
        if (calculatedItems < React.Children.count(children)) {
          this.setState(prevState => ({ calculatedItems: prevState.calculatedItems + 1 }))
        }

        if (calculatedItems === (React.Children.count(children) - 1) - numberOfVisibleItems) {
          this.setState({ calculationCompleted: true })
        }
      })
    }
  }

  toggle() {
    const { maxHeight, minHeight, collapsed } = this.state
    const { onToggle } = this.props
    let nextHeight
    let nextOpacity

    if (collapsed) {
      nextHeight = this.props.defaultMinHeight
      nextOpacity = 0
    } else {
      nextHeight = minHeight + maxHeight
      nextOpacity = 1
    }

    this.animate(nextHeight, nextOpacity, () => this.setState({ collapsed: !collapsed }, () => {
      if (onToggle) onToggle(this.state.collapsed)
    }))
  }

  render() {
    const {
      animation,
      initialized,
      collapsed,
      fadeContentOpacity
    } = this.state
    const {
      numberOfVisibleItems,
      wrapperStyle,
      children,
      buttonText,
      icon,
      icon2,
      touchStyle,
      buttonStyle,
      iconStyle,
      textStyle,
      icon2Style,
      collapsedComponent,
      contentWrapperStyle
    } = this.props

    return (
      <View style={wrapperStyle}>
        <View style={contentWrapperStyle}>
          {
            !collapsed && collapsedComponent && <View style={{ height: undefined, width: '100%', position: 'absolute' }}>
              {collapsedComponent}
            </View>
          }
          <Animated.View style={{ overflow: 'hidden', height: animation, opacity: fadeContentOpacity }}>
            <View style={{ flex: 1 }} onLayout={(event) => this.setMinHeight(event)}>
              {
                React.Children.toArray(children).slice(0, numberOfVisibleItems)
              }
            </View>
            {
              initialized &&
              <View>

                {
                  React.Children.toArray(children).slice(numberOfVisibleItems).map((item, index) => (
                    <View key={index} onLayout={(event) => this.onItemLayout(event)}>{item}</View>
                  ))
                }
              </View>
            }
          </Animated.View>
        </View>
        {
          (numberOfVisibleItems < React.Children.count(children)) &&
          <View>
            <TouchableOpacity style={touchStyle} onPress={() => this.toggle()} activeOpacity={1.0}>
              {
                <View style={buttonStyle}>
                  {
                    collapsed ?
                      <Image source={icon2} style={[iconStyle, icon2Style]} />
                      :
                      <Image source={icon} style={iconStyle} />
                  }
                  {buttonText && <Text style={textStyle}>{buttonText}</Text>}
                </View>
              }
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
}

CollapsibleList.propTypes = {
  animationConfig: PropTypes.object,
  animationType: PropTypes.oneOf(['spring', 'timing']),
  buttonContent: PropTypes.element,
  numberOfVisibleItems: PropTypes.number,
  onToggle: PropTypes.func
}

CollapsibleList.defaultProps = {
  animationConfig: {},
  animationType: 'timing',
  buttonContent: (<Text>Collapse Button</Text>),
  numberOfVisibleItems: 1,
  onToggle: null,
  wrapperStyle: {},
  buttonStyle: {}
}