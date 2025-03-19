import { StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from "expo-router";
import Result from "./Result"


export default function Filters() {

  const router = useRouter();

  // --------------- useState Hooks from Results sheet --------------------------

  const fetchURL = 'https://api.transport.nsw.gov.au/v1/live/hazards/incident/open'
  const token = 'apikey eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJRdU52b2dTTG1idGVTT19RYURSN3FoWk1NZGNlMHJPUzFzSGxLNEdRR1B3IiwiaWF0IjoxNzQxOTU0MDg5fQ.fqNaar1F5UQ7-_QKnpeViY1C1Zu5umxceQ9ZDcrp4Qs'

  const [data, setData] = useState<any>('zerodata')
  const [dataArray, setDataArray] = useState<any>([])
  const [filteredArray, setFilteredArray] = useState([])

  const [loading, setLoading] = useState(true)
  const [isAnyError, setIsAnyError] = useState(false)
  const errorMessage = 'An Error has Occured. Please Try Again'

  // --------------- end useState Hooks from Results sheet --------------------------

  const [region, setRegion] = useState();
  const [type, setType] = useState();
  const [street, setStreet] = useState('');
  const [date, setDate] = useState(new Date());

  const [show, setShow] = useState(false);
  const [isVisibleDisplayStreets, setIsVisibleDisplayStreets] = useState(true)

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };


  //------------ function for fetch data ------------------

  const fetchdata = async () => {

    try {
      const response = await fetch(fetchURL, { method: 'GET', headers: { "Authorization": token } })
      const json = response.ok ? (await response.json()) : null

      setData(json)
      setDataArray(json?.features)
      setLoading(false)
      if (!response.ok || response.status === 404 || response.status === 500) {
        setIsAnyError(true)
      }
    }
    catch (error) {
      console.log('Error Message is:', error)
      setIsAnyError(true)
    }
  }

  //--------------------------------------------------------

  //---------------- useEffect Hooks ----------------------

  useEffect(() => {
    setIsAnyError(false)
    fetchdata()
  }, [street])


  useEffect(() => {
    if (!street) {
      setFilteredArray([]); // Reset if street is empty
      return;
    }
    try {

      const filteredJson = dataArray?.filter((item: any) => item?.properties?.roads[0]?.mainStreet?.toLowerCase()?.includes(street?.toLowerCase()))

      setFilteredArray(filteredJson)
    }
    catch (error) {
      console.log(error)
    }


  }, [street, isVisibleDisplayStreets])

  //--------------------------------------------------------

  //-------------- Display Street Function -------------------

  function DisplayStreet() {


    return filteredArray?.map((item: any, key: number) => {
      return (<TouchableOpacity key={item?.id} onPress={() => {
        setStreet(item?.properties?.roads[0]?.mainStreet),
          setIsVisibleDisplayStreets(false)
      }} > <Text key={item?.id}>
          {JSON.stringify(item?.properties?.roads[0]?.mainStreet)}
        </Text></TouchableOpacity>
      )
    })

  }

  //---------------------------------------------------


  return (
    <View style={styles.container}>
      <Text>Filters</Text>

      {/*------------ Select State -----------------*/}
      <Text>Select Region</Text>
      <Picker style={styles.picker}
        selectedValue={region}
        onValueChange={(itemValue, itemIndex) =>
          setRegion(itemValue)
        }>
        <Picker.Item label="Northern NSW" value="NorthernNSW" />
        <Picker.Item label="Western NSW" value="WesternNSW" />
        <Picker.Item label="Southern NSW" value="SouthernNSW" />
        <Picker.Item label="Western Sydney" value="WesternSydney" />
        <Picker.Item label="North Sydney" value="NorthSydney" />
        <Picker.Item label="Metro Sydney" value="MetroSydney" />
        <Picker.Item label="South Sydney" value="SouthSydney" />
      </Picker>

      {/*------------ Select Accident Type -----------------*/}

      <Text>Select Accident Type</Text>
      <Picker style={styles.picker}
        selectedValue={type}
        onValueChange={(itemValue, itemIndex) =>
          setType(itemValue)
        }>
        <Picker.Item label="Accident" value="Accident" />
        <Picker.Item label="Hazard" value="Hazard" />
        <Picker.Item label="Building Fire" value="BuildingFire" />
        <Picker.Item label="Scheduled Roadwork" value="ScheduledRoadwork" />
      </Picker>

      {/*------------ Select Street Name -----------------*/}

      <Text>Select Street Name</Text>
      <TextInput style={styles.picker} value={street} onChangeText={(text) => { setStreet(text) }}></TextInput>

      <View>{isVisibleDisplayStreets} && {DisplayStreet()}</View>


      {/*------------ Select Date (With in last three months) -----------------*/}

      <Text>Select Date</Text>
      <TextInput style={styles.picker} value={date.toDateString()} onPress={() => setShow(true)} onChange={() => { setDate }}></TextInput>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
          minimumDate={new Date(new Date().getFullYear(), new Date().getMonth() - 3, new Date().getDate())}
        />
      )}

      <Text>Search</Text>
      <View style={styles.button}>
        <Button title="Search" onPress={() => {router.push("/Result")} }></Button>
      </View>
      <View style={styles.button}>
        <Button title="Go to Saved" onPress={() => router.push("/Saved")}></Button>
      </View>

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
  button: { padding: 20 },
  picker: {
    width: 300,
    height: 60,
    backgroundColor: '#Add8e6'

  },


});
