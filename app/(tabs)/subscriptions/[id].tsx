import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView} from "react-native-safe-area-context";
import { Link, useLocalSearchParams } from 'expo-router';

const SubscriptionDetails = () => {

    const {id} = useLocalSearchParams<{id: string}>();
  return (
    <SafeAreaView className="bg-background flex-1 p-5">
      <Text> Subscription Details: {id}</Text>
      <Link href="/"> 
        Go back
      </Link>
    </SafeAreaView>
  )
}


export default SubscriptionDetails