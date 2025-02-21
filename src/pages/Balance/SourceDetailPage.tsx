import { ScrollContainer } from "../../components/Container";
import { containerStyles, platform } from "../../styles";
import { RefreshControl, Text, View } from "react-native";
import { RootState, useAppDispatch } from "../../redux/store";
import React, { useCallback, useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { setLoading } from "../../redux/actions/status";
import { ButtonIcon } from "../../components/Button";
import { AppError } from "../../interfaces/services";
import { Icon } from "../../components/Icon";
import { NavigationParamList } from "../../interfaces/navigations";
import { Pages } from "../../configuration/constants";
import { quotesByIdRequest } from "../../services/cryptoApi";
import { CryptoCurrencyDto } from "../../interfaces/backend";
import { BarChart, barDataItem, LineChart, lineDataItem, PieChart, popnPyramidDataItem, PopulationPyramid, RadarChart } from "react-native-gifted-charts";
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

  const [selected, setSelected] = useState<CryptoCurrencyDto>();
  const [graphicData, setGraphicData] = useState<lineDataItem[]>();

  let volumeColor = 'green';
  let volumeArrow = 'arrow-up';
  if ((selected?.quote.USD.volume_change_24h || 0) < 0) {
    volumeColor = "red";
    volumeArrow = 'arrow-down';
  }

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    requestById().finally(() => setRefreshing(false));
  }, []);

  const requestById = async () => {
    dispatch(setLoading(Pages.SOURCEDETAILPAGE, true));
    quotesByIdRequest(params?.selected?.id).then((response) => {
      const currency = response.data[`${params?.selected?.id}`];
      const { quote: { USD } } = currency;
      setSelected(currency);
      const data: lineDataItem[] = [
        { dataPointText: '1 día', value: USD.percent_change_24h },
        { dataPointText: '1 semana', value: USD.percent_change_7d / 7 },
        { dataPointText: '1 mes', value: USD.percent_change_30d / 30 },
        { dataPointText: '2 meses', value: USD.percent_change_60d / 60 },
      ];
      setGraphicData(data);
    }).catch((err: AppError) => {
      console.log(err);
    }).finally(() => {
      dispatch(setLoading(Pages.SOURCEDETAILPAGE, false));
    });
  }

  useEffect(() => {
    requestById();
  }, [params?.selected]);

  return (
    <View style={containerStyles.bodyPage}>
      <ScrollContainer
        containerStyle={{ padding: platform.generic.paddingSpaces }}
        refreshControl={
          <RefreshControl
            colors={[platform.colors.primary]} // Android
            tintColor={platform.colors.primary} // IOS
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        {selected?.slug ?
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <Icon name={`crypto-${selected?.slug}`} defaultName="crypto-default" size={140} isSvg />

            <Text style={{
              marginTop: 20,
              fontSize: 24,
              fontWeight: 600
            }}>{`1 USD = ${params?.selected?.quoteShow}`}
            </Text>
            <View style={{ flexDirection: "row", alignItems: 'center' }}><Icon size={24} name={volumeArrow} color={volumeColor} /><Text style={{ color: volumeColor, fontSize: 20 }}>{selected?.quote.USD.volume_change_24h}</Text></View>
            {graphicData && graphicData?.length > 0 ? <LineChart data={graphicData} /> : null}
          </View>
          : <View />}
      </ScrollContainer>
    </View>
  );
};

export default SourceDetailPage;
