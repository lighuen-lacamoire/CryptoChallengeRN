import { ButtonGroupData } from '../../interfaces/buttons';
import { buttonStyles, platform, containerStyles } from '../../styles';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type ButtonGroupProps = {
  data: ButtonGroupData[];
  isRadio: boolean;
  setData: (data: ButtonGroupData[]) => void;
};

const ButtonGroup = ({ data, isRadio, setData }: ButtonGroupProps) => {
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

  return (
    <View style={styles.container}>
      {data.map((x, index) => {
        return (
          <View key={x.title} style={styles.prueba}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => enableDisableBtn(index)}
              style={[
                buttonStyles.buttonBlankIcon,
                containerStyles.shadowDefault,
                {
                  backgroundColor: x.active
                    ? platform.colors.primary
                    : buttonStyles.buttonBlankIcon.backgroundColor,
                },
              ]}>
              <Text
                style={{
                  color: x.active
                    ? platform.colors.white
                    : platform.colors.text,
                }}>
                {x.title}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default ButtonGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    margin: 10,
  },
  button: {
    alignItems: 'center',
    margin: 5,
    borderWidth: 25,
  },
  buttonDisable: {
    margin: 5,
    borderColor: '#CCCCCC',
  },
  textBtn: {
    color: platform.colors.text,
  },
  textBtnDisable: {
    color: '#CCCCCC',
  },
  prueba: {
    width: '50%',
  },
});
