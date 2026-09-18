import { View, Text } from 'react-native'
import React from 'react'
import {Link} from "expo-router"
import { SafeAreaView} from "react-native-safe-area-context";


const Insights = () => {
  return (
    <SafeAreaView className="bg-background flex-1 p-5">
      <Text>Insights</Text>
      <Link href="/">
        Go back
      </Link>
    </SafeAreaView>
  )
}

export default Insights