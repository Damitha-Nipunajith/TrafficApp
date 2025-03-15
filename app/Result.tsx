import { Text, View, StyleSheet,Button } from 'react-native'
import React, { Component, useEffect, useRef, useState } from 'react'
import { useRouter } from 'expo-router';

export default function Result () {

  const router=useRouter()

  const fetchURL = 'https://api.transport.nsw.gov.au/v1/live/hazards/incident/all'
  const token = 'apikey eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJRdU52b2dTTG1idGVTT19RYURSN3FoWk1NZGNlMHJPUzFzSGxLNEdRR1B3IiwiaWF0IjoxNzQxOTU0MDg5fQ.fqNaar1F5UQ7-_QKnpeViY1C1Zu5umxceQ9ZDcrp4Qs'

  const [data,setData]=useState<any>('zerodata')

  const outPut = JSON.stringify(data?.lastPublished)

  const fetchdata = async ()=> {

    try{
      const response = await fetch(fetchURL,{method:'GET', headers:{"Authorization":token}})
      const json = response.ok?(await response.json()):null
      setData(json)
      console.log("this is from inside fetch function",data?.type)
    }
    catch(error){
      console.log('Error Message is:' ,error)
    } 
  }

  useEffect(()=>{
    fetchdata()
    console.log("this is from inside useEffect function",data?.lastPublished)
    
  },[])
  
    return (
      <View style={styles.container}>
        <Text>Result</Text>
                <View>
                  <Button title="back" onPress={router.back}></Button>             
                </View>
                <Text>{outPut}</Text>
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