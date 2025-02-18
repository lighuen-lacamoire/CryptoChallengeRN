import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { ButtonGroupData } from '../../interfaces/buttons';
import { platform } from '../../styles';

type ButtonPickerProps = {
  containerStyle: any;
  header: any;
  data: ButtonGroupData[];
  isRadio: boolean;
  iconized: boolean;
  setData: (data: ButtonGroupData[]) => void;
  inline: boolean;
  disabled: boolean;
  error: any;
};

/**
 * Componente de Seleccion de Opciones tipo boton
 * @param {Object} containerStyle Estilo para el componente
 * @param {Object} header Titulo del componente
 * @param {Array} data Informacion para asignar a cada elemento
 * @param {Boolean} iconized indica si muestra iconos o texto
 * @param {Boolean} isRadio Indica si la seleccion es inclusiva o exclusiva
 * @param {Function} setData Funcion que actualiza la informacion de cada elemento
 * @param {Boolean} inline Indica si debe ajustar en linea los elementos
 * @param {Boolean} disabled Deshabilita o no el componente
 * @param {any} error Error para el componente
 */
const ButtonPicker = (props: ButtonPickerProps) => {
  const {
    containerStyle,
    header,
    data,
    iconized,
    isRadio,
    setData,
    disabled,
    inline,
    error,
  } = props;

  const enableDisableBtn = (index: number) => {
    const mod = data[index];
    let newArr = [...data];
    if (isRadio && mod.active === false) {
      newArr = newArr.map((x) => {
        return { ...x, active: false };
      });
      mod.active = true;
    } else if (!isRadio) {mod.active = !mod.active;}

    newArr[index] = mod;
    setData(newArr);
  };

  const maxInlineButtons = inline ? data.length : 2;

  return (
    <View style={[{ flex: 1 }, containerStyle || {}]}>
      {header ? (
        <Text style={[styles.textHeader, header.style || {}]}>
          {header.label}
        </Text>
      ) : null}
      <View style={[styles.container]}>
        {data.map((x, index) => (
          <View
            key={x.title}
            style={
              iconized ? { width: 50 } : { width: `${100 / maxInlineButtons}%` }
            }>
            <Pressable
              disabled={disabled}
              onPress={() => enableDisableBtn(index)}
              style={[
                inline ? styles.compSegButton : styles.defaultButton,
                x.active ? styles.primaryButton : styles.secondaryButton,
                x.active && disabled ? styles.disabledPrimaryButton : {},
                Platform.OS === 'ios' ? styles.buttonIOS : {},
              ]}>
              {/**
               *
              {iconized ? (
                <Icon
                  style={[
                    styles.defaultTextIcon,
                    x.active ? styles.primaryText : styles.secondaryText,
                  ]}
                  name={x.icon}
                />
              ) : platform.isIOS ? (
                x.label.split('\n').map(t => (
                  <Text
                    style={[
                      styles.defaultText,
                      x.active ? styles.primaryText : styles.secondaryText,
                      inline || x.label.split('\n').length === 1
                        ? {}
                        : { flex: 1 },
                    ]}
                    key={t}>
                    {t}
                  </Text>
                ))
                ) : (

               */}
              <Text
                style={[
                  styles.defaultText,
                  x.active ? styles.primaryText : styles.secondaryText,
                  inline ? {} : { flex: 1 },
                ]}>
                {x.title}
              </Text>
              {/**
               *
              )}
               */}
            </Pressable>
          </View>
        ))}
      </View>
      {error ? <Text style={styles.itemError}>{error}</Text> : null}
    </View>
  );
};

export default ButtonPicker;

/**
 * Estilos
 */
const styles = StyleSheet.create({
  itemError: {
    marginLeft: 4,
    marginTop: 4,
    fontSize: platform.fontSizes.SMALL,
    color: platform.colors.error,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginHorizontal: -3,
  },
  textHeader: {
    fontSize: platform.fontSizes.LARGE,
    color: platform.colors.black,
    marginBottom: 5,
  },
  primaryButton: {
    backgroundColor: platform.colors.primary,
    borderRadius: 24,
  },
  secondaryButton: {
    backgroundColor: platform.colors.primary,
    borderColor: platform.colors.black,
    elevation: 0,
  },
  defaultButton: {
    height: 45,
    margin: 5,
    borderRadius: 24,
    borderWidth: 2,
    flexWrap: Platform.OS === 'ios' ? 'wrap' : 'nowrap',
  },
  compSegButton: {
    height: 45,
    borderRadius: 24,
    marginHorizontal: 2,
    borderWidth: 2,
  },
  buttonIOS: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  defaultText: {
    fontSize: 14,
    textAlign: 'center',
  },
  defaultTextIcon: {
    fontSize: platform.fontSizes.ICON,
    textAlign: 'center',
  },
  primaryText: {
    color: platform.colors.text, // CHECK
  },
  secondaryText: {
    color: platform.colors.text, // CHECK
  },
  disabledPrimaryButton: {
    color: platform.colors.white,
    backgroundColor: '#E9E9E9',
    borderColor: '#E9E9E9',
  },
});
