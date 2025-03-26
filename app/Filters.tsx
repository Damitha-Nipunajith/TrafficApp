import { StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker';

import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from "expo-router";




export default function Filters() {

  const router = useRouter();

  const [data, setData] = useState<any>('zerodata')
  const [dataArray, setDataArray] = useState<any>([])
  const [filteredArray, setFilteredArray] = useState([])

  const [region, setRegion] = useState('');
  const [category, setCategory] = useState('');
  const [suburb, setSuburb] = useState('');
  const [date, setDate] = useState(new Date());

  const [show, setShow] = useState(false);
  const [isVisibleDisplayStreets, setIsVisibleDisplayStreets] = useState(true)

  const [loading, setLoading] = useState(true)
  const [isAnyError, setIsAnyError] = useState(false)
  const errorMessage = 'An Error has Occured. Please Try Again'

  const[refresh,setRefresh] = useState(false)


  const fetchURL = 'https://api.transport.nsw.gov.au/v1/live/hazards/incident/open'
  const token = 'apikey eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJRdU52b2dTTG1idGVTT19RYURSN3FoWk1NZGNlMHJPUzFzSGxLNEdRR1B3IiwiaWF0IjoxNzQxOTU0MDg5fQ.fqNaar1F5UQ7-_QKnpeViY1C1Zu5umxceQ9ZDcrp4Qs'

  //------------ function for fetch data ------------------

  const fetchdata = async () => {

    try {
      const response = await fetch(fetchURL, { method: 'GET', headers: { "Authorization": token } })
      
      const json = response.ok ? (await response.json()) : null

      setData(json)
      setDataArray(json?.features||[])
      setLoading(false)
      if (!response.ok || response.status === 404 || response.status === 500) {
        setIsAnyError(true)
      }
    }
    catch (error) {
      console.log('Error Message from fetching data is:', error)
      setIsAnyError(true)
    }
  }

  //--------------------------------------------------------

  // --------------- function for Updating the Date --------------------------

  const changeDate = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  //--------------------------------------------------------------------------



  //------------------ useEffect Hooks ----------------------

  useEffect(() => {
    setCategory('')
    setSuburb('')
    setRegion('')

    setIsAnyError(false)
    fetchdata()
  }, [,refresh])

  //---------------------------------------------------------

  //---------------- function to filter data for suberb search and update filtered Arra using useEffect Hook -----------------

  useEffect(() => {
    if (!suburb) {
      setFilteredArray([]); // Reset if street is empty
      return;
    }
    try {
      const filteredJson = dataArray?.filter((item: any) => item?.properties?.roads[0]?.suburb?.toLowerCase()?.includes(suburb?.toLowerCase()))
      setFilteredArray(filteredJson)
    }
    catch (error) {
      console.log(error)
    }
  }, [suburb, isVisibleDisplayStreets])

  //----------------------------------------------------------------------------------------------------------------------------

  //--------------Function for Display Suberb  -------------------

  function DisplaySuburb() {

    return filteredArray.slice(0,5)?.map((item: any, key: number) => {
      return (
      <TouchableOpacity key={item?.id} onPress={() => {
        setSuburb(item?.properties?.roads[0]?.suburb),
          setIsVisibleDisplayStreets(false)
      }} > 
      <Text key={item?.id}>
          {item?.properties?.roads[0]?.suburb|| "No Suburb Available"}
      </Text></TouchableOpacity>
      )
    })
  }

  //-----------------------------------------------------------------

  //################################### RETURN BODY #####################################################


  return (
    <View style={styles.container}>
      <Text>Filters</Text>

      {/*------------Picker to Select Region -----------------*/}
      <Text>Region</Text>
      <Picker style={styles.picker}
        selectedValue={region||''}
        onValueChange={(itemValue, itemIndex) =>
          setRegion(itemValue)
        }>
        <Picker.Item label="Select A Region" value="" color="gray" />
        <Picker.Item label="Sydney" value="Sydney" />
        <Picker.Item label="Central NSW" value="Central NSW" />
        <Picker.Item label="South Coast" value="South Coast" />
        <Picker.Item label="Snowy Mountains" value="Snowy Mountains" />
        <Picker.Item label="Hunter" value="Hunter" />
        <Picker.Item label="The Murray" value="The Murray" />
        <Picker.Item label="Riverina" value="Riverina" />
        <Picker.Item label="Blue Mountains" value="Blue Mountains" />
        <Picker.Item label="Far West NSW" value="Far West NSW" />
        <Picker.Item label="North Coast NSW" value="North Coast NSW" />
        <Picker.Item label="Central Coast" value="Central Coast" />
        <Picker.Item label="Southern Highlands" value="Southern Highlands" />
      </Picker>

      {/*------------Picker to Select Accident Type -----------------*/}

      <Text>Incident Type</Text>
      <Picker  style={styles.picker}
        selectedValue={category||''}
        onValueChange={(itemValue, itemIndex) =>
          setCategory(itemValue)
        }>
        <Picker.Item label="Select An Incident Type" value="" color="gray" />
        <Picker.Item label="BREAKDOWN" value="BREAKDOWN" />
        <Picker.Item label="CRASH" value="CRASH" />
        <Picker.Item label="HAZARD" value="HAZARD" />
        <Picker.Item label="CHANGED TRAFFIC CONDITIONS" value="CHANGED TRAFFIC CONDITIONS" />
        <Picker.Item label="TRAFFIC LIGHTS BLACKED OUT" value="TRAFFIC LIGHTS BLACKED OUT" />
      </Picker>

      {/*------------Picker Select Suberb Name -----------------*/}

      <Text>Suburb</Text>
      <TextInput   placeholder='Search for a Suburb' style={styles.picker} value={suburb} onChangeText={(text) => { setSuburb(text), setIsVisibleDisplayStreets(true) } }></TextInput>

      <View>{isVisibleDisplayStreets && <DisplaySuburb/>}</View>




{/*------------------- BUTTONS for SEARCH and SAVED --------------------------*/}


      
      <View style={styles.button}>
        <Button title="Search" onPress={() => { router.push(`/Result?region=${region}&category=${category}&suburb=${suburb}`) }}></Button>
      </View>

            <View style={styles.button}>
            <Button title="Refresh" onPress={() => { setRefresh(!refresh) }}></Button>
            </View>

      <View style={styles.button}>
        <Button title="Go to Saved" onPress={() => router.push("/Saved")}></Button>
      </View>
    </View>
  )
}

 //########################################### END OF RETURN BODY #####################################################


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
  picker: {
    width: 300,
    height: 60,
    backgroundColor: '#Add8e6'

  },
  textInput:{
color:"gray"
  }


});
