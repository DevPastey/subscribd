import { View, Text } from 'react-native'
import { Link } from 'expo-router';
import React from 'react'

const Onboarding = () => {
  return (
    <View>
      <Text>Onboarding</Text>
      <Link href="/">
        Go back
      </Link>
    </View>
  )
}

export default Onboarding