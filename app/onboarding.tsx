import { View, Text } from 'react-native'
import { Link } from 'expo-router';
import React from 'react'

/** Renders the onboarding placeholder and a link back to the home route. */
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