import { Link } from "expo-router";
import { Text, View, Image, FlatList, ImageSourcePropType } from "react-native";
import { useState } from "react";
import { formatCurrency, formatRenewalPeriod } from "@/lib/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { HOME_BALANCE, HOME_SUBSCRIPTIONS, HOME_USER, UPCOMING_SUBSCRIPTIONS } from "@/constants/data";
import { icons } from "@/constants/icons";
import { clsx } from "clsx";
import { components }from "@/constants/theme";
import SubscriptionCard from "@/components/subscription-card";

const tabBar = components.tabBar;

/** Renders the home screen with links to the app's primary flows. */
export default function Index() {
  const [expandedCardId, setExpandedCardId] = useState<string | number | null>(null);
  const balanceDate = new Date(HOME_BALANCE.nextRenewalDate).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });

  // 1. Everything above the main list goes into the header to scroll together naturally
  const ListHeader = () => (
    <>
      {/* Balance Card */}
      <View className="home-balance-card" style={{ maxHeight: 120 }}>
        <Text className="home-balance-label">Balance</Text>
        <View className="home-balance-amount">
          <Text className="home-balance-amount">{formatCurrency(HOME_BALANCE.amount)}</Text>
          <Text className="home-balance-date">{balanceDate}</Text>
        </View>
      </View>

      {/* Upcoming Subscriptions Section (Horizontal Track) */}
      <View>
        <View className="justify-between flex-row py-4">
          <Text className="upcoming-title">Upcoming</Text>
          <View className="button">
            <Text>View all</Text>
          </View>
        </View>

        <FlatList
          data={UPCOMING_SUBSCRIPTIONS}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="upcoming-card">
              <View className="upcoming-row">
                <View className="bg-muted rounded-lg p-2">
                  <Image source={item.icon as ImageSourcePropType} className="upcoming-icon" />
                </View>
                <View>
                  <Text className="upcoming-price">{formatCurrency(item.price)}</Text>
                  <Text className="upcoming-days-left">{item.daysLeft} days left</Text>
                </View>
              </View>
              <Text className="upcoming-name">{item.name}</Text>
            </View>
          )}
        />
      </View>

      {/* Header for All Subscriptions Section */}
      <View className="justify-between flex-row py-4 mt-2">
        <Text className="upcoming-title">All Subscriptions</Text>
        <View className="button">
          <Text>View all</Text>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView className="bg-background flex-1" edges={['top', 'left', 'right']}>
      
      {/* Home Header */}
      <View className="home-header px-4">
        <View className="home-user">
          <Image source={images.avatar} className="home-avatar" />
          <Text className="home-user-name">{HOME_USER.name}</Text>
        </View>
        <View className="home-add-icon-container">
          <Image source={icons.add} className="home-add-icon" />
        </View>
      </View>
      
      {/* MASTER VERTICAL FLATLIST */}
      <FlatList
        data={HOME_SUBSCRIPTIONS}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'column',
          paddingHorizontal: 16,
          paddingBottom: tabBar.height + 24, // Pushes elements up clean of the tabbar bounds
        }}
        ItemSeparatorComponent={() => (<View className="h-4"></View>)}
        ListEmptyComponent={() => (<Text className="home-empty-state"> No subscriptions yet.</Text>)}
        extraData={expandedCardId}
        renderItem={({ item }) => {
          
          return (
            <SubscriptionCard {...item} expanded={expandedCardId === item.id} onPress={() => {setExpandedCardId((currentId) => (currentId === item.id ? null : item.id))}} />
          );
        }}
      />
    </SafeAreaView>
  );
}



// const ListFooter = () => (
//   <>
//   </>
// );