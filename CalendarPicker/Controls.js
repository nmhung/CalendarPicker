import React from 'react';
import {
  TouchableOpacity,
  Text,
  View
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
          :
          <View style={compStyles}>
            <LabelComponent {...labelComponentProps} style={[labelComponentProps.style]} />
          </View>
      }
    </TouchableOpacity>
  );
}

Controls.propTypes = {
  styles: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onPressControl: PropTypes.func.isRequired,
};
