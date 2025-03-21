import { Text, View,StyleSheet, Button } from 'react-native'
import React, { Component, useEffect } from 'react'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default function Saved () {

    const [isVisible, setIsVisible] = useState(false)
    const [selectedItemID, setSelectedItemID] = useState(1)

  const[retrievedString,setRetrievedString]=useState<any>()
  const[retrievedData,setRetrievedData]=useState<any>()

  interface savedIncident{
    "Id":number,
    "incident":String,
    "road":String,
    "suburb":String,
    "adviceA":String,
    "adviceB":String
  };

  const router=useRouter()

  useEffect(()=>{
    getData()   
  },[])

useEffect(()=>{
  if(retrievedString){
    const tempJSON = JSON.parse(retrievedString)
    setRetrievedData(tempJSON)
  }
},[retrievedString])

useEffect(()=>{
  if(retrievedData){
    console.log('retrieved JSON: ',retrievedData)
    loadData()
  }

  },[retrievedData])


  //---------------function to import saved Array  ------------------

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('my-key2');
      if (value !== null) {
        // value previously stored
        console.log('retrieved string: ',value)
        setRetrievedString(value)    
      }
    } catch (e) {
      // error reading value
    }
  };

 //-----------------------------------------------------------------

  //---------------function to display saved items ------------------

 const loadData =()=>{

      if(retrievedData!=null){
  
      return (retrievedData?.map((item: savedIncident, key: number) => {
        return (
  
          <View key={item.Id} style={styles.oneRowView}>
            <Text >Incident: {JSON.stringify(item?.incident)}</Text>
            <Text >Road: {JSON.stringify(item?.road)}</Text>
            <Text >Suburb: {JSON.stringify(item?.suburb)}</Text>
            <View style={styles.buttonRow}>
              <View style={styles.button}> 
                <Button title={'Delete'} onPress={() => {}} ></Button></View>
              <View style={styles.button}> 
                <Button title={selectedItemID === item.Id && isVisible ? 'Hide Info' : 'More info'} onPress={() => { setIsVisible(!isVisible), setSelectedItemID(item.Id) }} ></Button></View>
  
            </View>
            {selectedItemID === item.Id && isVisible && <View>
  
              <Text>Incident ID: {item.Id}</Text>
              <Text >Advice A {JSON.stringify(item?.adviceA)}</Text>
              <Text >Advice B {JSON.stringify(item?.adviceA)}</Text>

            </View>}
          </View>
        )
      }))
    }
    else{
      return<Text>There is No data to show</Text>
 }
 }
 
 //-----------------------------------------------------------------


    return (
      <View style={styles.container}>
        <Text>Saved</Text>
        {loadData()}
        <Text>{retrievedString}</Text>
      </View>
    )
  
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
  button: { margin: 5 },
  oneRowView: {
    padding: 20,
    margin: 20,
    backgroundColor: 'pink'
  },
  buttonRow: {
    width: 200,
    flexDirection: 'row',
  }

});


