import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useLocalSearchParams } from 'expo-router';

/** Renders details for the subscription ID in the current route. */
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