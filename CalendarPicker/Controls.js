import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

export default function Controls({ styles, textStyles, LabelComponent, labelComponentProps, label, onPressControl }) {
  return (
    <TouchableOpacity
      onPress={() => onPressControl()}
    >
      {
        !labelComponent
          ? <Text style={[styles, textStyles]}>
            {label}
          </Text>
          : <LabelComponent {...labelComponentProps} style={[styles, labelComponentProps.styles]} />
      }
    </TouchableOpacity>
  );
}

Controls.propTypes = {
  styles: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onPressControl: PropTypes.func.isRequired,
};
