import { Text, View, StyleSheet,Button } from 'react-native'
import React, { Component } from 'react'
import { useRouter } from "expo-router";


export default function Search ()  {

  const router = useRouter();

    return (
      <View style={styles.container}>
        <Text>Search</Text>
        <View style={styles.button}>
      <Button title="Search" onPress={() => router.push("/Result")}></Button>
        </View>
        <View style={styles.button}>
      <Button title="Go to Saved" onPress={() => router.push("/Saved")}></Button>
        </View>
      </View>
    )
  
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