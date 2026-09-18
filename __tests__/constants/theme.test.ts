import { colors, spacing, components, theme } from '@/constants/theme';

describe('Theme Constants', () => {
  describe('colors', () => {
    it('should define essential color tokens', () => {
      expect(colors.background).toBe('#fff9e3');
      expect(colors.foreground).toBe('#081126');
      expect(colors.primary).toBe('#081126');
      expect(colors.accent).toBe('#ea7a53');
      expect(colors.card).toBe('#fff8e7');
      expect(colors.muted).toBe('#f6eecf');
      expect(colors.destructive).toBe('#dc2626');
      expect(colors.success).toBe('#16a34a');
      expect(colors.subscription).toBe('#8fd1bd');
    });
  });

  describe('spacing', () => {
    it('should define consistent 4px-based spacing scale', () => {
      expect(spacing[0]).toBe(0);
      expect(spacing[1]).toBe(4);
      expect(spacing[2]).toBe(8);
      expect(spacing[4]).toBe(16);
      expect(spacing[8]).toBe(32);
      expect(spacing[16]).toBe(64);
    });

    it('should remain strictly increasing and aligned to the 4px grid', () => {
      const values = Object.values(spacing);

      values.forEach((value, index) => {
        expect(value % 4).toBe(0);
        if (index > 0) {
          expect(value).toBeGreaterThan(values[index - 1]);
        }
      });
    });
  });

  describe('components', () => {
    it('should define tabBar layout metrics', () => {
      expect(components.tabBar.height).toBe(spacing[18]);
      expect(components.tabBar.horizontalInset).toBe(spacing[5]);
      expect(components.tabBar.radius).toBe(spacing[8]);
      expect(components.tabBar.iconFrame).toBe(spacing[12]);
      expect(components.tabBar.itemPaddingVertical).toBe(spacing[2]);
    });
  });

  describe('theme bundle', () => {
    it('should aggregate colors, spacing, and components', () => {
      expect(theme.colors).toEqual(colors);
      expect(theme.spacing).toEqual(spacing);
      expect(theme.components).toEqual(components);
    });
  });
});
