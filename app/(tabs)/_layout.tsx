import { tabs } from "@/constants/data";
import "@/global.css";
import { clsx } from "clsx";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { View } from "react-native";
import {colors, components} from "@/constants/theme";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import type { TabIcon as TabIconProps } from "@/constants/types";

const tabBar = components.tabBar;


export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const TabIcon = ({focused, icon}: TabIconProps) => {
    return (
      <View className="tab-icon">
        <View className={clsx('tabs-pill', focused && 'tabs-active')}>
          <Image
            source={icon}
            className="tabs-glyph"
          />
        </View>
      </View>
    );
  }
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: Math.max(insets.bottom, tabBar.horizontalInset),
          height: tabBar.height,
          marginHorizontal: tabBar.horizontalInset,
          borderRadius: tabBar.radius,
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          elevation: 0,
        },

        tabBarItemStyle: {
          paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6
        },

        tabBarIconStyle: {
          width: tabBar.iconFrame,
          height: tabBar.iconFrame,
          alignItems: "center",
        }
      }}

    >

      {tabs.map((tab) => (
        <Tabs.Screen 
          key={tab.name} 
          name={tab.name} 
          options={{ 
            title: tab.title,
            tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={tab.icon} />
            ),
          }}  
        />
      ))}

      <Tabs.Screen name="subscriptions/[id]"  options={{href: null}}/>

    </Tabs>
  );
}
