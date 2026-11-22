import { Colors, type Palette } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

/** Returns the full colour palette for the active colour scheme. */
export function useThemeColors(): Palette {
  return Colors[useColorScheme() === 'dark' ? 'dark' : 'light'];
}
