import { Text, View, StyleSheet,Button } from 'react-native'
import React, { Component } from 'react'
import { useRouter } from "expo-router";
import Filters from './Filters';


export default function Search ()  {

  const router = useRouter();

    return (
      <View style={styles.container}>
        <Text>Filters</Text>
        <Filters/>









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