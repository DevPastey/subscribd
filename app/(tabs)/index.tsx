import { Link } from "expo-router";
import { Text, View, Image, FlatList, ImageSourcePropType } from "react-native";
import { formatCurrency, formatRenewalPeriod } from "@/lib/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { HOME_BALANCE, HOME_SUBSCRIPTIONS, HOME_USER, UPCOMING_SUBSCRIPTIONS } from "@/constants/data";
import { icons } from "@/constants/icons";
import { clsx } from "clsx";
import { components }from "@/constants/theme";

const tabBar = components.tabBar;

export default function Index() {
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
          paddingHorizontal: 16,
          paddingBottom: tabBar.height + 16, // Pushes elements up clean of the tabbar bounds
        }}
        renderItem={({ item }) => {
          const itemDate = new Date(item.startDate).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
          });
          
          return (
            <View className="all-subscription-card mb-3" style={{ backgroundColor: item.color }}>
              <View className="flex-row gap-2 justify-center items-center">
                <View className="flex-row items-center">
                  <View className="bg-muted rounded-lg p-2">
                    <Image source={item.icon as ImageSourcePropType} className="upcoming-icon" />
                  </View>
                </View>

                <View className="justify-between flex-row flex-1">
                  <View className="gap-1 flex-col">
                    <Text className="upcoming-price max-w-[40vw]" ellipsizeMode="tail" numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text className="upcoming-days-left">{itemDate}</Text>
                  </View>

                  <View className="justify-between items-center">
                    <Text className="upcoming-price">{formatCurrency(item.price)}</Text>
                    <Text className="upcoming-days-left">{formatRenewalPeriod(item.billing)}</Text>
                  </View>
                </View>
              </View>
            </View>
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