import { Icon } from "../../components/Icon";
import { platform } from "../../styles";
import React from "react";
import { View } from "react-native";

type Props = {
  icon: string;
  isSvg: boolean;
  focused: boolean;
  color: string;
};

/**
 * Componente del Icono del Top Tab
 * @param props Props
 * @returns {JSX.Element}
 */
const TabIcon = (props: Partial<Props>): JSX.Element => {
  const { icon, color, isSvg, focused } = props;
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Icon
        name={icon}
        color={color}
        size={platform.fontSizes.ICON + (focused ? 4 : 0)}
        isSvg={isSvg}
      />
    </View>
  );
};

export default TabIcon;
