import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

export default function Controls({ styles, textStyles, labelComponent, label, onPressControl }) {
  return (
    <TouchableOpacity
      onPress={() => onPressControl()}
    >
      {
        !labelComponent
          ? <Text style={[styles, textStyles]}>
            {label}
          </Text>
          : labelComponent
      }
    </TouchableOpacity>
  );
}

Controls.propTypes = {
  styles: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onPressControl: PropTypes.func.isRequired,
};
