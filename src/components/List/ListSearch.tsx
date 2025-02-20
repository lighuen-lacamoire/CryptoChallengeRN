import React, { RefObject } from 'react';
import {
  StyleProp,
  View,
  ViewStyle,
  Text,
  TextInput,
  KeyboardType,
  TouchableOpacity,
  TextInputProps,
  TextStyle,
  StyleSheet,
} from 'react-native';
import { textstyles, platform } from '../../styles';
import { Icon } from '../Icon';

type Props = {
  containerStyle: StyleProp<ViewStyle>;
  style: StyleProp<ViewStyle> | StyleProp<TextStyle>;

  name: string;
  value: string;
  onValueChange: any;
  refInput: RefObject<TextInput>;
  textInputProps: TextInputProps;
  maxLength: number;
  placeholder: string;
  keyboardType: string;
};

/**
 * Componente de ItemInput
 */
const ListSearch = (props: Partial<Props>): JSX.Element => {
  const {
    containerStyle,
    value,
    onValueChange,
    refInput,
    textInputProps,
    maxLength,
    placeholder,
    keyboardType,
    style,
  } = props;

  return (
    <View
      style={[
        styles.itemBody,
        containerStyle || {},
      ]}>
      <Icon
        size={30}
        name="search"
      />
      <TextInput
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        ref={refInput}
        style={[
          textstyles.textInputForm,
          styles.itemInput,
          { paddingRight: 12 },
          style || {},
        ]}
        onChangeText={(text) =>
          onValueChange(text)
        }
        {...textInputProps}
      />
    </View>

  );
};

export default ListSearch;

/**
 * Estilos del Boton
 */
const styles = StyleSheet.create({
  itemBody: {
    backgroundColor: platform.colors.white,
    flexDirection: 'row',
    height: 55,
    marginHorizontal: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: platform.colors.borderContainer,
    alignSelf: 'flex-start',
  },
  itemInput: {
    flex: 1,
    color: platform.colors.text,
  },
});
