import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { useEffect } from 'react';


export default function Filters() {


  // --------------- useState Hooks from Results sheet --------------------------

    const fetchURL = 'https://api.transport.nsw.gov.au/v1/live/hazards/incident/open'
    const token = 'apikey eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJRdU52b2dTTG1idGVTT19RYURSN3FoWk1NZGNlMHJPUzFzSGxLNEdRR1B3IiwiaWF0IjoxNzQxOTU0MDg5fQ.fqNaar1F5UQ7-_QKnpeViY1C1Zu5umxceQ9ZDcrp4Qs'

    const [data, setData] = useState<any>('zerodata')
    const [dataArray, setDataArray] = useState<any>([])
    const [filteredArray,setFilteredArray] = useState([])

    const [loading, setLoading] = useState(true)
    const [isAnyError, setIsAnyError] = useState(false)
    const errorMessage = 'An Error has Occured. Please Try Again'

  // --------------- end useState Hooks from Results sheet --------------------------

  const [region, setRegion] = useState();
  const [type, setType] = useState();
  const [street, setStreet] = useState('');
  const [date, setDate] = useState(new Date());

  const [show, setShow] = useState(false);

  const onChange = (event:any, selectedDate?: Date) => {
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

    useEffect(()=>{


      if (!street) {
        setFilteredArray([]); // Reset if street is empty
        return;
      }

      try{

        const filteredJson = dataArray?.filter((item:any)=>item?.properties?.roads[0]?.mainStreet?.toLowerCase()?.includes(street?.toLowerCase()))

        setFilteredArray(filteredJson)

        console.log(filteredArray)
        console.log(street)
        console.log("filtered data?", filteredJson)

      }
      catch(error){
        console.log(error)
      }
    
      console.log(dataArray[0]?.geometry?.coordinates)

    },[street])
  
    //--------------------------------------------------------


  return (
    <View>

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
<TextInput style={styles.picker} value={street} onChangeText={(text)=>{setStreet(text)}}></TextInput>




{/*------------ Select Date (With in last three months) -----------------*/}

<Text>Select Date</Text>
<TextInput style={styles.picker} value={date.toDateString()} onPress={() => setShow(true)}  onChange={()=>{setDate}}></TextInput>

{show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
          minimumDate={new Date(new Date().getFullYear(), new Date().getMonth()-3, new Date().getDate())}
        />
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  picker:{
    width: 300,
      height: 60,
      backgroundColor: '#Add8e6'
    
  }

})