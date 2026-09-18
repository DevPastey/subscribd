import { View, Text } from 'react-native'
import React from 'react'
import {Link} from "expo-router"
import { SafeAreaView} from "react-native-safe-area-context";

const Settings = () => {
  return (
    <SafeAreaView className="bg-background flex-1 p-5">
      <Text>Settings</Text>
      <Link href="/">
        Go back
      </Link>
    </SafeAreaView>
  )
}

export default Settings