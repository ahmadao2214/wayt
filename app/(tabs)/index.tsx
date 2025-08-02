import { StyleSheet } from "react-native";
import { View } from "@/components//ui/view";
import { Text } from "@/components/ui/text";

export default function TaskScreen() {
  return (
    <View style={styles.container}>
      <Text bold>Tasks</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
