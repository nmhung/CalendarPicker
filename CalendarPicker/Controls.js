import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

export default function Controls({ styles, textStyles, LabelComponent, labelComponentProps, label, onPressControl }) {
  console.log(styles.monthSelectorComp)
  return (
    <TouchableOpacity
      onPress={() => onPressControl()}
    >
      {
        !LabelComponent
          ? <Text style={[styles, textStyles]}>
            {label}
          </Text>
          : <LabelComponent {...labelComponentProps} style={[styles.monthSelectorComp, labelComponentProps.styles]} />
      }
    </TouchableOpacity>
  );
}

Controls.propTypes = {
  styles: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onPressControl: PropTypes.func.isRequired,
};
