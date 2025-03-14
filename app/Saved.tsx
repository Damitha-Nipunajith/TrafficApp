import { Text, View,StyleSheet, Button } from 'react-native'
import React, { Component } from 'react'
import { useRouter } from 'expo-router'

export default function Saved () {

  const router=useRouter()
 
    return (
      <View style={styles.container}>
        <Text>Saved</Text>
        <View>
          <Button title="back" onPress={router.back}></Button>
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