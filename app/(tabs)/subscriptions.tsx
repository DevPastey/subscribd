import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants/icons';

const Subscriptions = () => {
  return (
    <SafeAreaView className="bg-background flex-1 p-5">
      <View>
        <View>
          <Image source={icons.add}/>
        </View>

        <Text>Subscriptions</Text>

        <View></View>
      </View>

      
      <Link href="/">
        Return to Home
      </Link>
    </SafeAreaView>
  )
}

export default Subscriptions