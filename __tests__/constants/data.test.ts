import { tabs, HOME_USER, HOME_BALANCE, UPCOMING_SUBSCRIPTIONS, HOME_SUBSCRIPTIONS } from '@/constants/data';

describe('Data Constants', () => {
  describe('tabs', () => {
    it('should have 4 tabs defined', () => {
      expect(tabs).toHaveLength(4);
    });

    it('should contain expected tab names', () => {
      const tabNames = tabs.map((t) => t.name);
      expect(tabNames).toEqual(['index', 'subscriptions', 'insights', 'settings']);
    });

    it('should define title and icon for each tab', () => {
      tabs.forEach((tab) => {
        expect(tab.title).toBeDefined();
        expect(typeof tab.title).toBe('string');
        expect(tab.icon).toBeDefined();
      });
    });
  });

  describe('HOME_USER', () => {
    it('should have a name', () => {
      expect(HOME_USER.name).toBeTruthy();
    });
  });

  describe('HOME_BALANCE', () => {
    it('should have a positive balance amount', () => {
      expect(HOME_BALANCE.amount).toBeGreaterThan(0);
    });

    it('should have a valid ISO date for nextRenewalDate', () => {
      const date = new Date(HOME_BALANCE.nextRenewalDate);
      expect(date.toISOString()).toBe(HOME_BALANCE.nextRenewalDate);
    });
  });

  describe('UPCOMING_SUBSCRIPTIONS', () => {
    it('should not be empty', () => {
      expect(UPCOMING_SUBSCRIPTIONS.length).toBeGreaterThan(0);
    });

    it('should have valid price and daysLeft for each item', () => {
      UPCOMING_SUBSCRIPTIONS.forEach((sub) => {
        expect(sub.price).toBeGreaterThan(0);
        expect(sub.daysLeft).toBeGreaterThanOrEqual(0);
        expect(sub.currency).toBe('USD');
      });
    });
  });

  describe('HOME_SUBSCRIPTIONS', () => {
    it('should not be empty', () => {
      expect(HOME_SUBSCRIPTIONS.length).toBeGreaterThan(0);
    });

    it('should have valid subscription structures', () => {
      HOME_SUBSCRIPTIONS.forEach((sub) => {
        expect(sub.id).toBeTruthy();
        expect(sub.name).toBeTruthy();
        expect(sub.price).toBeGreaterThan(0);
        expect(['active', 'paused', 'cancelled']).toContain(sub.status);
        expect(['Monthly', 'Yearly']).toContain(sub.billing);
      });
    });
  });
});
