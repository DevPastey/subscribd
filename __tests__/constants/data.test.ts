import { HOME_BALANCE, HOME_SUBSCRIPTIONS, HOME_USER, tabs, UPCOMING_SUBSCRIPTIONS } from '@/constants/data';
import { icons } from '@/constants/icons';

const expectUniqueValues = (values: string[]) => {
  expect(new Set(values).size).toBe(values.length);
};

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
        expect(tab.title.trim()).not.toBe('');
        expect(Object.values(icons)).toContain(tab.icon);
      });
    });

    it('should use unique route names and user-facing titles', () => {
      expectUniqueValues(tabs.map(({ name }) => name));
      expectUniqueValues(tabs.map(({ title }) => title));
    });
  });

  describe('HOME_USER', () => {
    it('should have a name', () => {
      expect(HOME_USER.name.trim()).not.toBe('');
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
        expect(Number.isFinite(sub.price)).toBe(true);
        expect(sub.daysLeft).toBeGreaterThanOrEqual(0);
        expect(Number.isInteger(sub.daysLeft)).toBe(true);
        expect(sub.currency).toBe('USD');
        expect(Object.values(icons)).toContain(sub.icon);
      });
    });

    it('should use unique identifiers', () => {
      expectUniqueValues(UPCOMING_SUBSCRIPTIONS.map(({ id }) => id));
    });
  });

  describe('HOME_SUBSCRIPTIONS', () => {
    it('should not be empty', () => {
      expect(HOME_SUBSCRIPTIONS.length).toBeGreaterThan(0);
    });

    it('should have valid subscription structures', () => {
      HOME_SUBSCRIPTIONS.forEach((sub) => {
        expect(sub.id.trim()).not.toBe('');
        expect(sub.name.trim()).not.toBe('');
        expect(sub.price).toBeGreaterThan(0);
        expect(['active', 'paused', 'cancelled']).toContain(sub.status);
        expect(['Monthly', 'Yearly']).toContain(sub.billing);
        expect(Object.values(icons)).toContain(sub.icon);
        expect(sub.color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });

    it('should use unique identifiers', () => {
      expectUniqueValues(HOME_SUBSCRIPTIONS.map(({ id }) => id));
    });

    it('should define valid billing periods with renewal after start', () => {
      HOME_SUBSCRIPTIONS.forEach((sub) => {
        const start = new Date(sub.startDate);
        const renewal = new Date(sub.renewalDate);

        expect(start.toISOString()).toBe(sub.startDate);
        expect(renewal.toISOString()).toBe(sub.renewalDate);
        expect(renewal.getTime()).toBeGreaterThan(start.getTime());
      });
    });
  });
});
