import { StyleSheet } from "react-native";
import { View } from "@/components//ui/view";
import { Text } from "@/components/ui/text";

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Text bold>Calendar</Text>
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
