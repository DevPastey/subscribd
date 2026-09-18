import { Text } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

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