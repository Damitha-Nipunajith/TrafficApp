import { Text, View,StyleSheet, Button, ScrollView } from 'react-native'
import React, { Component, useEffect } from 'react'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default function Saved () {

    const [isVisible, setIsVisible] = useState(false)
    const [selectedItemID, setSelectedItemID] = useState(1)

  const[retrievedString,setRetrievedString]=useState<any>()
  const[retrievedData,setRetrievedData]=useState<any>()
  const[filteredArray,setFilteredArray]=useState<any>([])
  const[filteredArrayString,setFilteredArrayString]=useState<any>([])
  const[deleteItemID,setDeleteItemID]=useState<any>()

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
    deleteItem()
  },[deleteItemID])

  useEffect(()=>{
    getData()   
  },[filteredArray])

  useEffect(()=>{
    loadData()   
  },[retrievedData])

useEffect(()=>{
  if(retrievedString){
    const tempJSON = JSON.parse(retrievedString)
    setRetrievedData(tempJSON)
  }
},[retrievedString])

useEffect(()=>{
  if(retrievedData){
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


   //---------------function to delete selected items ------------------

   const deleteItem = ()=>{
    if (retrievedData && deleteItemID){

    const tempArray = retrievedData.filter((oneItem:any)=>oneItem.Id!==deleteItemID)
    setFilteredArray(tempArray)

   }
    }



  //-----------------------------------------------------------------

  //---------------function to delete and save new saved Array  ------------------

  useEffect(()=>{

    if(filteredArray.length>0){
      const tempString = JSON.stringify(filteredArray)
      storeData(tempString)
    }

  },[filteredArray])

    //-----------------------------------------------------------------
  
  //---------------function to Export saved Array  ------------------

  const storeData = async (value:string) => {
    try {
      await AsyncStorage.setItem('my-key2', value);
    } catch (e) {
      // saving error
    }
  };

   //-----------------------------------------------------------------

  //---------------function to display saved items ------------------

 const loadData =()=>{

      if(retrievedData!=null){
  
      return (retrievedData?.map((item: savedIncident, key: number) => {
        return (

  
          deleteItemID!==item.Id && <View key={item.Id} style={styles.oneRowView}>
            <Text >Incident: {item?.incident}</Text>
            <Text >Road: {item?.road}</Text>
            <Text >Suburb: {item?.suburb}</Text>
            <View style={styles.buttonRow}>
              <View style={styles.button}> 
                <Button title={'Delete'} onPress={() => { setSelectedItemID(item.Id) ,setDeleteItemID(item.Id)}} ></Button></View>
              <View style={styles.button}> 
                <Button title={selectedItemID === item.Id && isVisible ? 'Hide Info' : 'More info'} onPress={() => { setIsVisible(!isVisible), setSelectedItemID(item.Id) }} ></Button></View>
  
            </View>
            { selectedItemID === item.Id && isVisible && <View>  
              <Text>Incident ID: {item.Id}</Text>
              <Text >Advice A {item?.adviceA}</Text>
              <Text >Advice B {item?.adviceA}</Text>
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
        <View>
          <Button title="back" onPress={router.back}></Button>
        </View>
        
        <ScrollView>
        {loadData()}
        </ScrollView>

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


