import React from 'react';
import {
  Box,
  VStack,
  Button,
  Image,
  Center,
  ButtonText,
} from '@gluestack-ui/themed';

import GuestLayout from '../../layouts/GuestLayout';
import StyledExpoRouterLink from '../../components/StyledExpoRouterLink';

import { styled } from '@gluestack-style/react';

const StyledImage = styled(Image, {
  '@sm': {
    props: {
      style: {
        height: 40,
        width: 320,
      },
    },
  },
  '@md': {
    props: {
      style: {
        height: 141,
        width: 275,
      },
    },
  },
});

// to render login and sign up buttons
function ActionButtons() {
  return (
    <VStack
      space="xs"
      mt="$10"
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
          },
        }}
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        backgroundColor="$backgroundLight0"
      >
        <StyledExpoRouterLink href="/login">
          <ButtonText
            fontWeight="$bold"
            textDecorationLine="none"
            color="$primary500"
          >
            LOGIN
          </ButtonText>
        </StyledExpoRouterLink>
      </Button>

      <Button
        sx={{
          ':hover': {
            bg: '$backgroundLight0',
            _text: {
              color: '$primary500',
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
        <StyledExpoRouterLink href="/signup">
          <ButtonText textDecorationLine="none" color="$textLight50">
            SIGN UP
          </ButtonText>
        </StyledExpoRouterLink>
      </Button>
    </VStack>
  );
}

function HeaderLogo() {
  return (
    <Box alignItems="center" justifyContent="center">
      <StyledImage
        alt="gluestack-ui Pro"
        resizeMode="contain"
        source={require('./assets/images/gluestackUiProLogo_web_light.svg')}
        sx={{
          '@md': {
            display: 'flex',
          },
        }}
        display="none"
      />

      <StyledImage
        sx={{
          '@md': {
            display: 'none',
          },
        }}
        alt="gluestack-ui Pro"
        display="flex"
        source={require('./assets/images/gluestackUiProLogo_mobile.png')}
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
          maxWidth="$508"
          w="$full"
          minHeight="$authcard"
          sx={{
            '@md': {
              // h: '$authcard',
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
