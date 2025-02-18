import { ScrollContainer } from "../../components/Container";
import { containerStyles, platform } from "../../styles";
import { RefreshControl, View } from "react-native";
import { RootState, useAppDispatch } from "../../redux/store";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setLoading } from "../../redux/actions/status";
import { ButtonIcon } from "../../components/Button";
import { AppError } from "../../interfaces/services";
import { genericMessages } from "../../configuration/messages";
import { ModalMessage } from "../../interfaces/buttons";

/**
 * Pantalla de detalle de la crypto
 */
const SourceListPage = () => {
  /** Dispatch de Redux */
  const dispatch = useAppDispatch();
  /** Navegacion */
  const navigation = useNavigation();

  return (
    <View style={containerStyles.bodyPage}>
      <ScrollContainer 
        containerStyle={{ padding: platform.generic.paddingSpaces }}>
        
      </ScrollContainer>
    </View>
  );
};

export default SourceListPage;
