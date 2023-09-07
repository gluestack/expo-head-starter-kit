import React, { useRef, useState } from 'react';
import {
  VStack,
  Box,
  HStack,
  Icon,
  Text,
  Button,
  Image,
  Center,
  FormControl,
  Input,
  Link,
  LinkText,
  FormControlHelperText,
  InputField,
  ButtonText,
  ArrowLeftIcon,
} from '@gluestack-ui/themed';

import GuestLayout from '../../layouts/GuestLayout';

import { Link as ExpoRouterLink, router } from 'expo-router';

function PinInput() {
  const firstInput = useRef<HTMLDivElement>(null);
  const secondInput = useRef<HTMLDivElement>(null);
  const thirdInput = useRef<HTMLDivElement>();
  const fourthInput = useRef<HTMLDivElement>();
  const fifthInput = useRef<HTMLDivElement>();
  const sixthInput = useRef<HTMLDivElement>();

  const refList = [
    firstInput,
    secondInput,
    thirdInput,
    fourthInput,
    fifthInput,
    sixthInput,
  ];

  const [inputFocus, setInputFocus] = useState<number>(-1);

  return (
    <HStack space="xs">
      {Array.from({ length: 6 }, (_, index) => (
        <Input
          key={index}
          variant="outline"
          w="14%"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            ref={refList[index]}
            placeholder=""
            sx={{
              '@md': {
                w: '$1/6',
              },
              '@lg': {
                w: '12%',
              },
              '_light': {
                color: '$textLight800',
                borderBottomColor:
                  inputFocus === index ? '$primary900' : '$borderLight500',
              },
              '_dark': {
                bgColor: '$textDark400',
                borderBottomColor:
                  inputFocus === index ? '$primary500' : '$borderDark100',
              },
            }}
            w="14%"
            // ref={refList[index]}
            textAlign="center"
            maxLength={1}
            borderBottomWidth="$2"
            onChangeText={(text) => {
              if (text.length === 1 && index < 5) {
                refList[index + 1].current?.focus();
                setInputFocus(index + 1);
              } else if (text.length === 0 && index > 0) {
                refList[index - 1].current?.focus();
              }
            }}
            rounded="$xs"
          />
        </Input>
      ))}
    </HStack>
  );
}

function Header() {
  return (
    <HStack space="xs" px="$3" my="$4.5" alignItems="center">
      <ExpoRouterLink href="..">
        <Icon as={ArrowLeftIcon} color="$textLight50" />
      </ExpoRouterLink>
      <Text color="$textLight50" fontSize="$lg">
        {' '}
        OTP Verification
      </Text>
    </HStack>
  );
}

function SideContainerWeb() {
  return (
    <Center
      flex={1}
      sx={{
        '@md': {
          px: '$8',
        },
        '_dark': {
          bg: '$primary500',
        },
        '_light': {
          bg: '$primary500',
        },
      }}
      px="$4"
    >
      <Image
        h="$10"
        w="$80"
        alt="gluestack-ui Pro"
        resizeMode="contain"
        source={require('./assets/images/gluestackUiProLogo_web_light.svg')}
      />
    </Center>
  );
}

function MainText() {
  return (
    <VStack space="xs">
      <Text
        sx={{
          '@md': {
            fontSize: '$2xl',
            pb: '$4',
          },
          '_light': {
            color: '$textLight800',
          },
          '_dark': {
            color: '$textDark50',
          },
        }}
        fontSize="$xl"
        fontWeight="bold"
      >
        Enter OTP
      </Text>
      <HStack space="xs" alignItems="center">
        <Text
          sx={{
            '@md': {
              pb: '$12',
            },
            '_light': {
              color: '$textLight800',
            },
            '_dark': {
              color: '$textDark400',
            },
          }}
          fontSize="$sm"
        >
          We have sent the OTP code to
          <Text
            fontWeight="bold"
            sx={{
              _light: {
                color: '$textLight800',
              },
              _dark: {
                color: '$textDark400',
              },
            }}
            fontSize="$sm"
          >
            {''} 87******47
          </Text>
        </Text>
      </HStack>
    </VStack>
  );
}

function AccountLink() {
  return (
    <HStack
      sx={{
        '@md': {
          mt: '$40',
        },
      }}
      mt="auto"
      space="xs"
      alignItems="center"
      justifyContent="center"
    >
      <Text
        sx={{
          _light: {
            color: '$textLight800',
          },
          _dark: {
            color: '$textDark400',
          },
        }}
        fontSize="$sm"
        fontWeight="normal"
      >
        Already have an account?
      </Text>

      <ExpoRouterLink href="/login">
        <LinkText sx={{
            'color': '$primary500',
            'textDecorationLine': 'none',
            ':hover': { color: '$primary600' },
            'fontWeight': '$bold',
          }} fontSize="$sm">Sign In</LinkText>
      </ExpoRouterLink>
    </HStack>
  );
}

function ResendLink() {
  return (
    <HStack py="$8">
      <Text
        sx={{
          _light: {
            color: '$textLight800',
          },
          _dark: {
            color: '$textDark400',
          },
        }}
        fontSize="$sm"
      >
        Didn't receive the OTP?{' '}
      </Text>

      <Link
        href=""
        sx={{
          _text: {
            'color': '$primary500',
            'textDecorationLine': 'none',
            ':hover': { color: '$primary600' },
            'fontWeight': '$bold',
          },
        }}
      >
        <LinkText
          sx={{
            'color': '$primary500',
            'textDecorationLine': 'none',
            ':hover': { color: '$primary600' },
            'fontWeight': '$bold',
          }}
          fontSize="$sm"
        >
          RESEND OTP
        </LinkText>
      </Link>
    </HStack>
  );
}

function onsubmit() {
  // implement validation logic here
  router.replace('/create-password');
}

export default function OtpVerification() {
  return (
    <GuestLayout>
      <Box
        sx={{
          '@md': {
            display: 'none',
          },
        }}
        display="flex"
      >
        <Header />
      </Box>

      <Box
        sx={{
          '@md': {
            display: 'flex',
          },
        }}
        display="none"
        flex={1}
      >
        <SideContainerWeb />
      </Box>

      <Box
        sx={{
          '@md': {
            py: '$8',
            px: '$8',
          },
          '_light': {
            bg: '$backgroundLight0',
          },
          '_dark': {
            bg: '$backgroundDark800',
          },
        }}
        py="$8"
        px="$4"
        flex={1}
      >
        <Box>
          <MainText />
          <VStack space="md" mt="$6">
            <FormControl>
              <PinInput />
              <FormControlHelperText mt="$8">
                <ResendLink />
              </FormControlHelperText>
            </FormControl>

            <Button
              size="lg"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              onPress={() => onsubmit()}
            >
              <ButtonText fontSize="$sm">PROCEED </ButtonText>
            </Button>
          </VStack>
        </Box>
        <AccountLink />
      </Box>
    </GuestLayout>
  );
}