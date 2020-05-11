import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { Utils } from './Utils';
import Controls from './Controls';
import moment from 'moment'

export default function HeaderControls(props) {
  const {
    isBuddhistYear,
    styles,
    currentMonth,
    currentYear,
    onPressNext,
    onPressPrevious,
    months,
    previousTitle,
    nextTitle,
    textStyle,
    monthTitleTextStyle,
    labelRightComponent,
    labelRightProps,
    labelLeftComponent,
    labelLeftProps,
    collapsed,
    selectedStartDate,
    collapsedTitleStyle,
    headerWrapperStyle
  } = props;
  const MONTHS = months ? months : Utils.MONTHS; // English Month Array
  // getMonth() call below will return the month number, we will use it as the
  // index for month array in english
  const previous = previousTitle ? previousTitle : 'Previous';
  const next = nextTitle ? nextTitle : 'Next';
  const month = MONTHS[currentMonth];
  const year = currentYear + (isBuddhistYear ? 543 : 0);

  return (
    <View style={[styles.headerWrapper, headerWrapperStyle]}>
      <Controls
        label={previous}
        LabelComponent={labelLeftComponent}
        labelComponentProps={labelLeftProps}
        onPressControl={onPressPrevious}
        styles={[styles.monthSelector, styles.prev]}
        compStyles={[styles.monthSelectorComp]}
        textStyles={textStyle}
      />
      <View>
        <Text style={[styles.monthLabel, textStyle, monthTitleTextStyle, collapsed ? collapsedTitleStyle : {}]}>
        {
            collapsed
              ? `${moment(selectedStartDate).locale(isBuddhistYear ? 'th' : 'en').format('DD MMM')} ${year}, ${moment(selectedStartDate).locale(isBuddhistYear ? 'th' : 'en').format('ddd')}`
              : `${month} ${year}`
          }
        </Text>
      </View>
      <Controls
        label={next}
        LabelComponent={labelRightComponent}
        labelComponentProps={labelRightProps}
        onPressControl={onPressNext}
        styles={[styles.monthSelector, styles.next]}
        compStyles={[styles.monthSelectorComp, { flexDirection: 'row', justifyContent: 'flex-end' }]}
        textStyles={textStyle}
      />
    </View>
  );
}

HeaderControls.propTypes = {
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  onPressNext: PropTypes.func,
  onPressPrevious: PropTypes.func,
};
