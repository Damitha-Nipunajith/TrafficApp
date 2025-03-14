import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function PicDate () {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event:any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View >
      <Text>Selected Date: {date.toDateString()}</Text>
      <Button title="Pick a Date" onPress={() => setShow(true)} />

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
