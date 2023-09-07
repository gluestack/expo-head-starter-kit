import { createConfig, config } from '@gluestack-ui/themed';
export const extendedConfig = createConfig({
  ...config.theme,
  tokens: {
    ...config.theme.tokens,
    colors: {
      ...config.theme.tokens.colors,
      primary0: '#E5F1FB',
      primary50: '#f5f3ff',
      primary100: '#ede8fd',
      primary200: '#ddd6fe',
      primary300: '#c4b4fd',
      primary400: '#a68bfa',
      primary500: '#8b5cf5',
      primary600: '#7c3bec',
      primary700: '#6d28d9',
      primary800: '#5b21b6',
      primary900: '#4b1e94',
      primary950: '#000711',
      backgroundDark900: '#000711',
      backgroundLight900: '#4b1e94'
    },
    space:{
      ...config.theme.tokens.space,
      layoutPadding: 212,
      boxSize: 508,
      imgWidth: 372,
      containerWidth: 1016,
      qrBox: 140,
      qrBoxInner: 234,
      122: 122,
      141: 141,
      275: 275,
      544: 544,
      '110/7': '14%',
      '25/2': '12%'
    },
  },
});
