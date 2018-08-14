import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

export default function Controls({ styles, compStyles, textStyles, LabelComponent, labelComponentProps, label, onPressControl }) {
  return (
    <TouchableOpacity
      onPress={() => onPressControl()}
    >
      {
        !LabelComponent
          ? <Text style={[styles, textStyles]}>
            {label}
          </Text>
          : <LabelComponent {...labelComponentProps} style={[compStyles, labelComponentProps.styles]} />
      }
    </TouchableOpacity>
  );
}

Controls.propTypes = {
  styles: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onPressControl: PropTypes.func.isRequired,
};
