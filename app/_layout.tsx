import "@/global.css";
import { Stack } from "expo-router";

/** Renders the headerless root stack for the tab and authentication routes. */
export default function RootLayout() {
  return (
    <Stack  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
    </Stack>
  );
}
