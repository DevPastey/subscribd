import { View, Text } from 'react-native';
import { Link } from 'expo-router';

/** Renders the sign-in placeholder and a link back to the home route. */
const SignIn = () => {
  return (
    <View>
      <Text>SignIn</Text>
      <Link href="/">
        Go back
      </Link>
    </View>
  )
}

export default SignIn