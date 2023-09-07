import React from 'react';
import { Box, StatusBar, ScrollView, VStack } from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
type GuestLayoutProps = {
  children: React.ReactNode;
};

export default function GuestLayout(props: GuestLayoutProps) {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Box
        sx={{
          _light: { bg: '$primary900' },
          _dark: { bg: '$backgroundDark900' },
        }}
      />
      <ScrollView
        flex={1}
        contentContainerStyle={{
          alignItems: 'center',
          flexGrow: 1,
          justifyContent: 'center',
        }}
        sx={{
          '@base': { _light: { bg: '$primary500' } },
          '@md': { _light: { bg: '$primary900' }, p: '$8' },
          '_dark': { bg: '$backgroundDark900' },
        }}
        bounces={false}
      >
        <VStack
          w="$full"
          flex={1}
          overflow="hidden"
          sx={{
            '@md': {
              maxWidth: 1016,
              flexDirection: 'row',
              rounded: '$xl',
              flex: undefined,
            },
          }}
        >
          {props.children}
        </VStack>
      </ScrollView>
    </>
  );
}
