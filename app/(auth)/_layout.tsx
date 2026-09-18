import { Stack } from "expo-router";

/** Renders the headerless stack shared by the authentication routes. */
export default function AuthLayout() {
  return <Stack  screenOptions={{ headerShown: false }} />;
}