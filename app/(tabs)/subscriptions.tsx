import { Text } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

/** Renders the subscriptions placeholder and a link back to the home route. */
const Subscriptions = () => {
  return (
    <SafeAreaView className="bg-background flex-1 p-5">
      <Text>Subscriptions</Text>
      <Link href="/">
        Go back
      </Link>
    </SafeAreaView>
  )
}

export default Subscriptions