import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "../Icon";
import { ImageProps } from "../../interfaces/buttons";
import { platform } from "../../styles";

type SectorText = {
  title?: string;
  subtitle?: string | JSX.Element;
}

type Props = {
  left: SectorText;
  right: SectorText;
  onPress: () => void;
  image: Partial<ImageProps>;
}

const ListItemIcon = ({
  left,
  right,
  onPress,
  image,
}: Props) => {
  const arrowIcon = "arrow-down";
  const arrowColor = "red";
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      style={styles.container}
      onPress={() => onPress()}
    >
      <Icon name={image?.name} size={36} isSvg={image?.isSvg} defaultName={image.defaultName} />
      <View style={styles.containerLabels}>
        <View>
          <Text
            style={styles.title}
          >{left.title}</Text>
          <Text
            style={{ fontSize: 12 }}

          >{left.subtitle}</Text>
        </View>
        <View>
          <Text
            style={styles.title}
          >{right.title}</Text>
          <View style={styles.rightSubtitleContainer}>
            {typeof right.subtitle !== 'string' ? right.subtitle :
              <Text
                style={{ fontSize: 12 }}
              >{right.subtitle}</Text>}
          </View>
        </View>
      </View>
      <Icon name="chevron-right" size={22} color="#8f8f8f" />
    </TouchableOpacity>
  );
};

export default ListItemIcon;

const styles = StyleSheet.create({
  container: {
    padding: platform.generic.paddingSpaces,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ebebeb",
    marginVertical: 4,
    backgroundColor: "#fff",
  },
  containerLabels: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  rightSubtitleContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  chevron: {
    alignSelf: "center",
    marginRight: 16,
  },
  title: {
    fontWeight: 700,
    marginBottom: 5,
    fontSize: 14,
  },
});
