import { Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView} from "react-native-safe-area-context";

/** Renders the home screen with links to the app's primary flows. */
export default function Index() {
  return (
    <SafeAreaView
      className="bg-background flex-1 p-5"
     
    >
      <Text className="text-success">Edit app/index.tsx to edit this screen.</Text>
      <TouchableOpacity>
        <Link href="/onboarding">
          <Text className="text-blue-500">Click Me to go to onboarding link</Text>
        </Link>

        <Link href="/sign-in">
          <Text className="text-blue-500">Click Me to go to sign-in link</Text>
        </Link>

        <Link href="/sign-up">
          <Text className="text-blue-500">Click Me to go to sign-up link</Text>
        </Link>

        <Link href="/subscriptions/spotify">
          <Text className="text-blue-500">Spotify Subscription</Text>
        </Link>

        <Link href={{
          pathname: "/subscriptions/[id]",
          params: { id: "claude" }
        }}>
          <Text className="text-blue-500">Go to Claude Max Subscriptions</Text>
        </Link>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
