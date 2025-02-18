import { RootState } from '../../redux/store';
import { platform } from '../../styles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoaderKit from 'react-native-loader-kit';
import { useSelector } from 'react-redux';

/**
 * Componente de carga
 */
const LoadingIndicator = () => {
  const { loading } = useSelector((state: RootState) => state.status);
  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: platform.colors.white,
              alignItems: 'center',
              justifyContent: 'center',
              width: 120,
              height: 120,
              borderRadius: 16,
              borderColor: platform.colors.primary,
              borderWidth: 4,
            }}>
            <LoaderKit
              style={{ width: 70, height: 70 }}
              name={'Pacman'} // Optional: see list of animations below
              //size={70} // Required on iOS
              color={platform.colors.primary} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
            />
          </View>
        </View>
      ) : (
        <View />
      )}
    </>
  );
};

export default LoadingIndicator;

/**
 * Estilos
 */
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    //backgroundColor: platform.colors.primary,
  },
});
