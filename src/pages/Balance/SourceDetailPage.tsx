import { ScrollContainer } from "../../components/Container";
import { containerStyles, navigationStyles, platform } from "../../styles";
import { RefreshControl, Text, View } from "react-native";
import { RootState, useAppDispatch } from "../../redux/store";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { setLoading } from "../../redux/actions/status";
import { ButtonIcon } from "../../components/Button";
import { AppError } from "../../interfaces/services";
import { genericMessages } from "../../configuration/messages";
import { ModalMessage } from "../../interfaces/buttons";
import { Icon } from "../../components/Icon";
import { NavigationParamList } from "../../interfaces/navigations";
import { Pages } from "../../configuration/constants";

/**
 * Pantalla de detalle de la crypto
 */
const SourceDetailPage = () => {
  /** Dispatch de Redux */
  const dispatch = useAppDispatch();
  /** Navegacion */
  const navigation = useNavigation();

  /** Parametros de navegacion */
  const { params } =
    useRoute<RouteProp<NavigationParamList, Pages.SOURCEDETAILPAGE>>();

  return (
    <View style={containerStyles.bodyPage}>
      <ScrollContainer
        containerStyle={{ padding: platform.generic.paddingSpaces }}>

        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <Icon name={`crypto-${params?.selected?.slug}`} defaultName="crypto-default" size={140} isSvg />

          <Text style={{
            marginTop: 20,
            fontSize: 20,
            fontWeight: 600
          }}>{`1 USD = ${params?.selected?.quoteShow}`}</Text>
        </View>
      </ScrollContainer>
    </View>
  );
};

export default SourceDetailPage;
