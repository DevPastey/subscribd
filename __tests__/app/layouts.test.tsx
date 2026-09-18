import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { Stack, Tabs } from 'expo-router';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AuthLayout from '@/app/(auth)/_layout';
import TabLayout from '@/app/(tabs)/_layout';
import RootLayout from '@/app/_layout';
import { tabs } from '@/constants/data';
import { colors, components } from '@/constants/theme';

jest.mock('@/global.css', () => ({}));

jest.mock('expo-router', () => {
  const React = require('react');
  const { View } = require('react-native');

  const MockStack = ({ children, ...props }: { children?: React.ReactNode }) => (
    <View {...props}>{children}</View>
  );
  MockStack.Screen = (props: object) => <View {...props} />;

  const MockTabs = ({ children, ...props }: { children?: React.ReactNode }) => (
    <View {...props}>{children}</View>
  );
  MockTabs.Screen = (props: object) => <View {...props} />;

  return { Stack: MockStack, Tabs: MockTabs };
});

jest.mock('expo-image', () => {
  const React = require('react');
  const { View } = require('react-native');

  return { Image: (props: object) => <View {...props} /> };
});

const mockedUseSafeAreaInsets = useSafeAreaInsets as jest.Mock;

describe('navigation layouts', () => {
  beforeEach(() => {
    mockedUseSafeAreaInsets.mockReturnValue({ top: 0, right: 0, bottom: 0, left: 0 });
  });

  it('registers the tab and auth groups without native headers', () => {
    const { UNSAFE_getByType, UNSAFE_getAllByType } = render(<RootLayout />);
    const stack = UNSAFE_getByType(Stack);
    const screens = UNSAFE_getAllByType(Stack.Screen);

    expect(stack.props.screenOptions).toEqual({ headerShown: false });
    expect(screens.map(({ props }) => props.name)).toEqual(['(tabs)', '(auth)']);
  });

  it('hides native headers throughout the auth group', () => {
    const { UNSAFE_getByType } = render(<AuthLayout />);

    expect(UNSAFE_getByType(Stack).props.screenOptions).toEqual({ headerShown: false });
  });

  it('registers all visible tabs and hides the detail route from the tab bar', () => {
    const { UNSAFE_getAllByType } = render(<TabLayout />);
    const screens = UNSAFE_getAllByType(Tabs.Screen);
    const visibleScreens = screens.slice(0, tabs.length);
    const detailsScreen = screens.at(-1);

    expect(visibleScreens.map(({ props }) => props.name)).toEqual(tabs.map(({ name }) => name));
    expect(visibleScreens.map(({ props }) => props.options.title)).toEqual(
      tabs.map(({ title }) => title),
    );
    expect(detailsScreen?.props.name).toBe('subscriptions/[id]');
    expect(detailsScreen?.props.options).toEqual({ href: null });
  });

  it('uses the horizontal inset as the minimum bottom safe-area spacing', () => {
    const { UNSAFE_getByType } = render(<TabLayout />);
    const options = UNSAFE_getByType(Tabs).props.screenOptions;

    expect(options.tabBarStyle).toMatchObject({
      bottom: components.tabBar.horizontalInset,
      height: components.tabBar.height,
      marginHorizontal: components.tabBar.horizontalInset,
      borderRadius: components.tabBar.radius,
      backgroundColor: colors.primary,
    });
  });

  it('honors a device bottom inset when it exceeds the configured minimum', () => {
    mockedUseSafeAreaInsets.mockReturnValue({ top: 0, right: 0, bottom: 48, left: 0 });

    const { UNSAFE_getByType } = render(<TabLayout />);

    expect(UNSAFE_getByType(Tabs).props.screenOptions.tabBarStyle.bottom).toBe(48);
  });

  it('applies active styling and the configured source to focused tab icons', () => {
    const { UNSAFE_getAllByType } = render(<TabLayout />);
    const homeScreen = UNSAFE_getAllByType(Tabs.Screen)[0];
    const renderTabIcon = homeScreen.props.options.tabBarIcon;
    const { UNSAFE_getAllByType: getAllIconViews, UNSAFE_getByType: getImage } = render(
      renderTabIcon({ focused: true }),
    );

    expect(getAllIconViews(View).some(({ props }) => props.className === 'tabs-pill tabs-active')).toBe(
      true,
    );
    expect(getImage(Image).props.source).toBe(tabs[0].icon);
  });

  it('omits active styling from an unfocused tab icon', () => {
    const { UNSAFE_getAllByType } = render(<TabLayout />);
    const renderTabIcon = UNSAFE_getAllByType(Tabs.Screen)[0].props.options.tabBarIcon;
    const { UNSAFE_getAllByType: getAllIconViews } = render(renderTabIcon({ focused: false }));

    expect(getAllIconViews(View).some(({ props }) => props.className === 'tabs-pill')).toBe(true);
    expect(getAllIconViews(View).some(({ props }) => props.className === 'tabs-pill tabs-active')).toBe(
      false,
    );
  });
});
