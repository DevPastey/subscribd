import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { useLocalSearchParams } from 'expo-router';

import SignIn from '@/app/(auth)/sign-in';
import SignUp from '@/app/(auth)/sign-up';
import Index from '@/app/(tabs)/index';
import Insights from '@/app/(tabs)/insights';
import Settings from '@/app/(tabs)/settings';
import Subscriptions from '@/app/(tabs)/subscriptions';
import SubscriptionDetails from '@/app/(tabs)/subscriptions/[id]';
import Onboarding from '@/app/onboarding';

jest.mock('expo-router', () => {
  return {
    Link: 'Link',
    useLocalSearchParams: jest.fn(),
  };
});

const mockedUseLocalSearchParams = useLocalSearchParams as jest.Mock;

describe('application routes', () => {
  describe.each([
    ['sign-in', SignIn, 'SignIn'],
    ['sign-up', SignUp, 'SignUp'],
    ['onboarding', Onboarding, 'Onboarding'],
    ['subscriptions', Subscriptions, 'Subscriptions'],
    ['insights', Insights, 'Insights'],
    ['settings', Settings, 'Settings'],
  ])('%s screen', (_name, ScreenComponent, heading) => {
    it('renders its heading and a link back home', () => {
      const { UNSAFE_getByType } = render(<ScreenComponent />);
      const homeLink = UNSAFE_getByType('Link' as React.ElementType);

      expect(screen.getByText(heading)).toBeTruthy();
      expect(homeLink.props.href).toBe('/');
      expect(homeLink.props.children).toBe('Go back');
    });
  });

  describe('home screen', () => {
    it('exposes every changed route with the intended destination', () => {
      const { UNSAFE_getAllByType } = render(<Index />);
      const destinations = UNSAFE_getAllByType('Link' as React.ElementType).map(
        ({ props }) => props.href,
      );

      expect(destinations).toEqual([
        '/onboarding',
        '/sign-in',
        '/sign-up',
        '/subscriptions/spotify',
        { pathname: '/subscriptions/[id]', params: { id: 'claude' } },
      ]);
    });
  });

  describe('subscription details screen', () => {
    it('renders the dynamic subscription identifier', () => {
      mockedUseLocalSearchParams.mockReturnValue({ id: 'spotify' });

      const { UNSAFE_getByType } = render(<SubscriptionDetails />);

      expect(screen.getByText(/Subscription Details: spotify/)).toBeTruthy();
      expect(UNSAFE_getByType('Link' as React.ElementType).props.href).toBe('/');
    });

    it('does not leak an undefined value when the route parameter is absent', () => {
      mockedUseLocalSearchParams.mockReturnValue({});

      render(<SubscriptionDetails />);

      expect(screen.getByText(/Subscription Details:/)).toBeTruthy();
      expect(screen.queryByText(/undefined/)).toBeNull();
    });
  });
});
