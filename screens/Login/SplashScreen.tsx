import React from 'react';
import {
  Box,
  VStack,
  Button,
  Image,
  Center,
  ButtonText,
  Link,
  Text
} from '@gluestack-ui/themed';
import { Link as ExpoRouterLink } from 'expo-router';

import GuestLayout from '../../layouts/GuestLayout';
import StyledExpoRouterLink from '../../components/StyledExpoRouterLink';

// to render login and sign up buttons
function ActionButtons() {
  return (
    <VStack
      space={'xs'}
      mt={'$10'}
      sx={{
        '@md': {
          mt: '$12',
        },
      }}
    >
      
      <Button
        sx={{
          ':hover': {
            bg: '$backgroundLight100',
            _text: {
              color: '$primary500',
              textDecorationLine: 'none',
              fontWeight: '$bold',
            },
          },
        }}
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        backgroundColor="$backgroundLight0"
      >
        <ExpoRouterLink href="/login">
          <ButtonText
            sx={{
              textDecorationLine: 'none',
              fontWeight: '$bold',
            }}
            textDecorationLine="none"
            color="$primary500"
          >
            LOGIN
          </ButtonText>
        </ExpoRouterLink>
      </Button>

      <Button
        sx={{
          ':hover': {
            bg: '$white',
            _text: {
              color: '$primary500',
              textDecorationLine: 'none',
              fontWeight: '$bold',
            },
          },
        }}
        my="$4"
        size="md"
        variant="outline"
        borderColor="$borderLight0"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
      >
        <ExpoRouterLink href="/signup">
          <ButtonText textDecorationLine="none" color="$textLight50">
            SIGN UP
          </ButtonText>
        </ExpoRouterLink>
      </Button>
    </VStack>
  );
}

function HeaderLogo() {
  return (
    <Box alignItems="center" justifyContent="center">
      <Image
        h="$10"
        w="$80"
        alt="gluestack-ui Pro"
        resizeMode={'contain'}
        source={require('./assets/images/gluestackUiProLogo_web_light.svg')}
        sx={{
          '@md': {
            display: 'flex',
          },
        }}
        display="none"
      />

      <Image
        sx={{
          '@md': {
            display: 'none',
          },
        }}
        alt="gluestack-ui Pro"
        display="flex"
        source={require('./assets/images/gluestackUiProLogo_mobile.png')}
        height="$141"
        width="$275"
      />
    </Box>
  );
}

export default function SplashScreen() {
  return (
    // Wrapper component includes the <GluestackUIProvider></GluestackUIProvider>
    // place GluestackUIProvider in your app root accordingly
    // remove Wrapper tag from here in your codebase
    <GuestLayout>
      <Center w="$full" flex={1}>
        <Box
          maxWidth="$boxSize"
          w="$full"
          sx={{
            '@md': {
              h: '$544',
              px: '$8',
              bg: '$primary500',
            },
          }}
          px="$4"
          justifyContent="center"
        >
          <HeaderLogo />
          <ActionButtons />
       </Box>
      </Center>
    </GuestLayout>
  );
}