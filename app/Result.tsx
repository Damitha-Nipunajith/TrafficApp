import { Text, View, StyleSheet, Button, ScrollView } from 'react-native'
import React, { Component, useEffect, useRef, useState } from 'react'
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';


export default function Result() {

  const { region, category, suburb } = useLocalSearchParams();
  const suburbValue = Array.isArray(suburb) ? suburb[0] : suburb;
  const regionValue = Array.isArray(region) ? region[0] : region;
  const categoryValue = Array.isArray(category) ? category[0] : category;

  const router = useRouter()

  const [data, setData] = useState<any>('zerodata')
  const [dataArray, setDataArray] = useState<any>([])
  const [filteredArray, setFilteredArray] = useState([])
  const [loading, setLoading] = useState(true)

  const [isAnyError, setIsAnyError] = useState(false)
  const errorMessage = 'An Error has Occured. Please Try Again'

    const fetchURL = 'https://api.transport.nsw.gov.au/v1/live/hazards/incident/all'
  const token = 'apikey eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJRdU52b2dTTG1idGVTT19RYURSN3FoWk1NZGNlMHJPUzFzSGxLNEdRR1B3IiwiaWF0IjoxNzQxOTU0MDg5fQ.fqNaar1F5UQ7-_QKnpeViY1C1Zu5umxceQ9ZDcrp4Qs'

    //---------------- function for fetching data ----------------------

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
  
    //-------------------------------------------------------------------

      //---------------- useEffect Hook & Filter Array ----------------------

  useEffect(() => {
    setIsAnyError(false)
    fetchdata()
  }, [loading])

  useEffect(() => {
      // if (!suburb) {
      //   setFilteredArray([]); // Reset if suburb is empty
      //   return;
      // }
      try {
        const filteredJson = dataArray?.filter((item: any) => item?.properties?.mainCategory?.toLowerCase()?.includes(categoryValue?.toLowerCase()) && item?.properties?.roads[0]?.suburb?.toLowerCase()?.includes(suburbValue?.toLowerCase()) && item?.properties?.roads[0]?.region?.toLowerCase()?.includes(regionValue?.toLowerCase()))

        setFilteredArray(filteredJson)     
      }
      catch (error) {
        console.log(error)
      } 

    }, [suburb,loading])

  //--------------------------------------------------------


  //---------------- function for display trimmed data ----------------------

  const displayData = () => {

    interface incident {
      id: number
      properties: {
        displayName: String;
        roads: { mainStreet: String, suburb: String }[]
        adviceA: String;
        adviceB: String;
        otherAdvice: String;
      }
    }

    const [isVisible, setIsVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState(1)

    if(filteredArray!=null){

    return (filteredArray?.map((item: incident, key: number) => {
      return (

        <View key={item.id} style={styles.oneRowView}>
          <Text >Incident: {JSON.stringify(item?.properties?.displayName)}</Text>
          <Text >Road: {JSON.stringify(item?.properties?.roads[0]?.mainStreet)}</Text>
          <Text >Suburb: {JSON.stringify(item?.properties?.roads[0]?.suburb)}</Text>
          <View style={styles.buttonRow}>
            <View style={styles.button}> <Button title={'Save'} onPress={() => { }} ></Button></View>
            <View style={styles.button}> <Button title={selectedItem === item.id && isVisible ? 'Hide Info' : 'More info'} onPress={() => { setIsVisible(!isVisible), setSelectedItem(item.id) }} ></Button></View>

          </View>
          {selectedItem === item.id && isVisible && <View>

            <Text>Incident ID: {item.id}</Text>
            <Text >*** {JSON.stringify(item.properties.adviceA)}</Text>
            <Text >** {JSON.stringify(item.properties.adviceB)}</Text>
            {/* <Text >* {JSON.stringify(item.properties.otherAdvice)}</Text> */}

          </View>}
        </View>
      )
    }))

  }
  else{
    return<Text>There is No data to show</Text>
  }
  }

  //--------------------------------------------------------

    //################################### RETURN BODY #####################################################

  return (
    <ScrollView >
      <View style={styles.container}>

        <Text>Result</Text>
        <View>
          <Button title="back" onPress={router.back}></Button>
        </View>

        <Text>{loading ? 'loading...' : null}</Text>

        <Text>{isAnyError ? errorMessage : null}</Text>
        {displayData()}

      </View>
    </ScrollView>
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