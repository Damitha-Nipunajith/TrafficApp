import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';


export default function Filters() {

  const [region, setRegion] = useState();
  const [type, setType] = useState();
  const [street, setStreet] = useState();
  const [date, setDate] = useState(new Date());

  const [show, setShow] = useState(false);
  const onChange = (event:any, selectedDate?: Date) => {
      setShow(false);
      if (selectedDate) {
        setDate(selectedDate);
      }
    };

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
<TextInput style={styles.picker} value={street} onChange={()=>{setStreet}}></TextInput>

{/*------------ Select Date -----------------*/}

<Text>Select Date</Text>
<TextInput style={styles.picker} value={date.toDateString()} onPress={() => setShow(true)}  onChange={()=>{setDate}}></TextInput>

{show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
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