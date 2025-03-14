import { Text, View, StyleSheet, Button ,} from "react-native";
import { useRouter } from "expo-router";

export default function Index() {

  const router = useRouter();

  return (
    <View style={styles.container}>
    <View >
      <Text>Helloooo Wellcome to Live Traffic App. This App will give you information on live Traffic incidents. Click the button to start </Text>
    </View>
    <View style={styles.button}>
      <Button title="start" onPress={() => router.push("/Search")}></Button>
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
