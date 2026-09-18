import { View, Text } from 'react-native'
import {Link} from "expo-router"
import React from 'react'

/** Renders the sign-up placeholder and a link back to the home route. */
const SignUp = () => {
  return (
    <View>
      <Text>SignUp</Text>
      <Link href="/">
        Go back
      </Link>
    </View>
  )
}

export default SignUp