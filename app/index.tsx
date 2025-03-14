import { Text, View, StyleSheet, Button } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
    <View >
      <Text>Helloooo Wellcome to Live Traffic App. This App will give you information on live Traffic incidents. Click the button to start </Text>
    </View>
    <View style={styles.button}>
      <Button title="start"></Button>
    </View>
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    padding:20,
    flex:1,
    flexDirection:"column",
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },
  button:{padding:20}

});
