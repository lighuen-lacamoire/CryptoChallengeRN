import { containerStyles, platform } from "../../styles";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { setLoading } from "../../redux/actions/status";
import { ButtonSegment } from "../../components/Button";
import { AppError } from "../../interfaces/services";
import { listingRequest } from "../../services/cryptoApi";
import { Pages } from "../../configuration/constants";
import { CryptoCurrencyDto, CurrencyBasicDto } from "../../interfaces/backend";
import { ListItemIcon, ListSearch } from "../../components/List";
import { priceConvertion } from "../../tools/functions";
import { RefObjectType, TimeOut } from "../../interfaces/configurations";
import { Icon } from "../../components/Icon";

/**
 * Pantalla de listado de cryptos
 */
const SourceListPage = () => {
  /** Dispatch de Redux */
  const dispatch = useAppDispatch();
  /** Navegacion */
  const navigation = useNavigation();

  const { favourites } = useAppSelector(state => state.balance);

  const [rows, setRows] = useState<CryptoCurrencyDto[]>();
  /** Lista de redux filtrada */
  const [filteredList, setFilteredList] = useState<CryptoCurrencyDto[]>([]);
  const [filteredFavs, setFilteredFavs] = useState<CurrencyBasicDto[]>([]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    requestList().finally(() => setRefreshing(false));
  }, []);

  const [tabIndex, setTabIndex] = useState(0);
  const [keyword, setKeyWord] = useState<string>();
  const timeoutRef: RefObjectType<TimeOut | null> = useRef(null);
  /**
   * Creamos una referencia para acceder al valor actual
   */
  const keywordRef: RefObjectType<string> = useRef<string | undefined>(keyword);
  /*
   * el Callback
   */
  keywordRef.current = keyword;

  const clearTimer = () => {
    if (timeoutRef.current !== null && timeoutRef.current !== undefined) {
      clearTimeout(timeoutRef.current);
    }
  };



  /**
     * Genera el key para cada item de la flatlist
     * @param {Object} item Item del array
     * @param {number} index index del item en el array
     */
  const keyExtractor = (item: CurrencyBasicDto, index: number) =>
    `${index}${item.id}${item.slug}`;

  /**
   * Renderiza cada Item del array
   * @param {Object} item item del array
   */
  const renderItem = ({ item }: { item: CurrencyBasicDto | CryptoCurrencyDto }) => {
    const itemFull = item as CryptoCurrencyDto;
    const quoteShow = itemFull.quote ? `${priceConvertion(itemFull.quote.USD.price)} ${item.symbol}` : item.quoteShow;

    let volumeColor = 'green';
    let volumeArrow = 'arrow-up';
    if (itemFull?.quote.USD.volume_change_24h < 0) {
      volumeColor = "red";
      volumeArrow = 'arrow-down';
    }

    return (
      <ListItemIcon
        key={`${item.id}${item.slug}`}
        left={{
          title: item.symbol,
          subtitle: item.name
        }}
        right={{
          title: quoteShow,
          subtitle: itemFull.quote ? <View style={{ flexDirection: "row", alignItems: 'center' }}><Icon size={16} name={volumeArrow} color={volumeColor} /><Text style={{ color: volumeColor }}>{itemFull.quote.USD.volume_change_24h}</Text></View> : "= 1 USD"
        }}
        onPress={() =>
          navigation.navigate(Pages.SOURCEDETAILPAGE, {
            selected: { ...item, quoteShow },
          })
        }
        image={{
          isSvg: true,
          name: `crypto-${item.slug}`,
          defaultName: 'crypto-default'
        }}
      />
    );
  };

  const requestList = async () => {
    dispatch(setLoading(Pages.HOMEPAGE, true));
    listingRequest()
      .then((response) => {
        if (response) {
          const { data = [] } = response;
          setRows(data);
          setFilteredList(data);
          //filterList(keywordRef.current);
        } else {
          setRows([]);
          setFilteredList([]);
        }
      })
      .catch((error: AppError) => {
        setRows([]);
      })
      .finally(() => {
        dispatch(setLoading(Pages.HOMEPAGE, false));
      });
  };

  /**
   * Filtra la lista por el valor indicado
   * @param value valor para filtrar
   */
  const filterList = (value?: string) => {
    const listNew = [...(rows || [])];
    const listCurFavs = [...(favourites || [])]
    let listFiltered: CryptoCurrencyDto[];
    let listFilteredFavs: CurrencyBasicDto[];
    if (value && value.length > 0 && value !== "") {
      listFiltered = filterCurrencies(listNew, value) as CryptoCurrencyDto[];
      setFilteredList(listFiltered);
      listFilteredFavs = filterCurrencies(listCurFavs, value);
      setFilteredFavs(listFilteredFavs);
    } else {
      setFilteredList(listNew);
      setFilteredFavs(listCurFavs);
    }
  };

  const filterCurrencies = (list: CurrencyBasicDto[] | CryptoCurrencyDto[], value: string) => {
    return list.filter(
      (item) =>
        item.name
          ?.toLocaleLowerCase()
          .replace(/[\u0300-\u036f]/g, "")
          .includes(value.toLowerCase()) ||
        item.symbol
          ?.toLocaleLowerCase()
          .replace(/[\u0300-\u036f]/g, "")
          .includes(value.toLowerCase()),

    );
  }

  /*
   * Barra de Busqueda: configuracion del timer en cuanto teclea
   */
  useEffect(() => {
    clearTimer();
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      if (rows) {
        filterList(keywordRef.current);
      }
    }, 500);
    return () => clearTimer();
  }, [keyword, setKeyWord]);

  useEffect(() => {
    (async () => {
      if (!rows) {
        await requestList();
      }
    })();
  }, [setRows]);

  useEffect(() => {
    filterList(keywordRef.current);
  }, [favourites]);

  return (
    <View style={{ flex: 1 }}>
      <ButtonSegment tabs={['Todos', 'Favoritos']}
        onChange={setTabIndex}
        containerStyle={{
          marginVertical: 10,
          alignSelf: 'center'
        }}
        currentIndex={tabIndex} />
      <ListSearch
        placeholder={"Busca por nombre o simbolo"}
        onValueChange={(value: string) => setKeyWord(value)} />
      {tabIndex === 0 ?
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
          data={filteredList}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        /> :
        <FlatList
          style={containerStyles.listItemFlat}
          data={filteredFavs}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />}
    </View>
  );
};

export default SourceListPage;
