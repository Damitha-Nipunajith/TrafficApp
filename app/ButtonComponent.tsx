import { View, Text,Button } from 'react-native'
import React from 'react'

const ButtonComponent = ({title,onPress}:{title:string,onPress:any})=>{
  return <Button title={title} onPress={onPress}/>
}

export default ButtonComponent