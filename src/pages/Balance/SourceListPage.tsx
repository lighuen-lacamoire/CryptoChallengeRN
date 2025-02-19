import { ScrollContainer } from "../../components/Container";
import { containerStyles, platform } from "../../styles";
import { FlatList, RefreshControl, View } from "react-native";
import { RootState, useAppDispatch } from "../../redux/store";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setLoading } from "../../redux/actions/status";
import { ButtonIcon } from "../../components/Button";
import { AppError } from "../../interfaces/services";
import { genericMessages } from "../../configuration/messages";
import { ModalMessage } from "../../interfaces/buttons";
import { listingRequest } from "../../services/cryptoApi";
import { Pages } from "../../configuration/constants";
import { CryptoCurrencyDto } from "../../interfaces/backend";
import { ListItemIcon } from "../../components/List";
import { priceConvertion } from "../../tools/functions";

/**
 * Pantalla de listado de cryptos
 */
const SourceListPage = () => {
  /** Dispatch de Redux */
  const dispatch = useAppDispatch();
  /** Navegacion */
  const navigation = useNavigation();

  const [list, setList] = useState<CryptoCurrencyDto[]>([]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    requestListing().finally(() => setRefreshing(false));
  }, []);

  /**
     * Genera el key para cada item de la flatlist
     * @param {Object} item Item del array
     * @param {number} index index del item en el array
     */
  const keyExtractor = (item: CryptoCurrencyDto, index: number) =>
    `${index}${item.id}${item.slug}`;

  /**
   * Renderiza cada Item del array
   * @param {Object} item item del array
   */
  const renderItem = ({ item }: { item: CryptoCurrencyDto }) => (

    <ListItemIcon
      key={`${item.id}${item.slug}`}
      left={{
        title: item.symbol,
        subtitle: item.name
      }}
      right={{
        title: priceConvertion(item.quote.USD.price),
        subtitle: "1 USD"
      }}
      onPress={() =>
        navigation.navigate(Pages.SOURCEDETAILPAGE, {
          selected: item,
        })
      }
      image={{
        isSvg: true,
        name: `crypto-${item.slug}`,
        defaultName: 'crypto-default'
      }}
    />
  );

  const requestListing = async () => {
    dispatch(setLoading(Pages.HOMEPAGE, true));
    listingRequest()
      .then((response) => {
        setList(response.data);
      })
      .catch((error: AppError) => {
        setList([]);
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoading(Pages.HOMEPAGE, false));
      });
  };

  useEffect(() => {
    requestListing();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[platform.colors.primary]} // Android
            tintColor={platform.colors.primary} // IOS
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        style={containerStyles.listItemFlat}
        data={list}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SourceListPage;
