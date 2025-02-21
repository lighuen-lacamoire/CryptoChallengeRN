import { ScrollContainer } from "../../components/Container";
import { containerStyles, platform, textstyles } from "../../styles";
import { RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setLoading } from "../../redux/actions/status";
import { ButtonCard, ButtonIcon } from "../../components/Button";
import { AppError } from "../../interfaces/services";
import { genericMessages } from "../../configuration/messages";
import { ModalMessage } from "../../interfaces/buttons";
import { Icon } from "../../components/Icon";
import { Pages } from "../../configuration/constants";

/**
 * Pantalla de bienvenida/inicio del usuario
 */
const HomePage = () => {
  /** Dispatch de Redux */
  const dispatch = useAppDispatch();
  /** Navegacion */
  const navigation = useNavigation();
  const { favourites } = useAppSelector((state) => state.balance);

  return (
    <View style={containerStyles.bodyPage}>
      <ScrollContainer
        containerStyle={{ padding: platform.generic.paddingSpaces }}>
        <Text style={{ ...textstyles.headerDates, color: '#333' }}>Sus crypto monedas favoritas!!</Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1 }}>
          {favourites.map(item => {
            return (
              <ButtonCard
                key={`${item.id}${item.slug}`}
                content={item.symbol}
                subtitle={item.name}
                icon={{
                  size: 50,
                  name: `crypto-${item.slug}`,
                  isSvg: true,
                  defaultName: "crypto-default"
                }}
                onPress={() => navigation.navigate(Pages.BALANCEROUTER, {
                  screen: Pages.SOURCELISTPAGE
                })}
              />);
          })}
        </View>
      </ScrollContainer>
    </View>
  );
};

export default HomePage;
