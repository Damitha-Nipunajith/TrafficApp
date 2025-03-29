import { Text, View, StyleSheet, Button, } from "react-native";
import { useRouter } from "expo-router";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";

export default function Index() {

  const router = useRouter();

  return (
    <GestureHandlerRootView >
    <View style={styles.container}>
      <View >
        <Text style={styles.subheading} >Wellcome to Live Traffic App. This App will give you information on live Traffic incidents. Click the button to start </Text>
      </View>
      <View >
        
        <TouchableOpacity style={styles.bigButton} onPress={() => router.push("/Filters")}>
          <Text style={styles.bigButtonText}>START</Text>
        </TouchableOpacity>
       
        </View>

    </View>
    </GestureHandlerRootView>
  );


}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },
  button: { padding: 20 },
  bigButton: {
    backgroundColor: 'red', // 🔴 Red background
    paddingVertical: 15,    // 📏 Vertical padding
    paddingHorizontal: 30,  // 📏 Horizontal padding
    borderRadius: 70,       // 🔵 Fully rounded edges
    alignItems: 'center',   // 📌 Center text
    justifyContent: 'center',

  },
  bigButtonText: {
    color: 'white',         // ⚪ White text
    fontSize: 18,           // 🔠 Big text
    fontWeight: 'bold',     // 🔠 Bold font
  },
  heading: {
    fontSize: 28,         // 📏 Large text for headings
    fontWeight: 'bold',   // 🔠 Bold text
    color: '#333',        // 🎨 Dark gray
    marginBottom: 10,     // 📏 Space below
  },
  subheading: {
    fontSize: 20,         // 📏 Medium text for subheadings
    fontWeight: '600',    // 🔠 Semi-bold
    color: '#555',        // 🎨 Slightly lighter gray
    marginBottom: 40,
    textAlign: 'center'
  },
  body: {
    fontSize: 16,         // 📏 Standard text size
    color: '#666',        // 🎨 Soft gray for readability
    lineHeight: 24,       // 📏 Good spacing for readability
    textAlign: 'center',  // 📌 Centered text
  },

});
