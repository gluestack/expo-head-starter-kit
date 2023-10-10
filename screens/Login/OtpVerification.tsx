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
  LinkText,
  FormControlHelperText,
  InputField,
  ButtonText,
  ArrowLeftIcon,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Toast,
  ToastTitle,
  useToast,
  Heading,
} from '@gluestack-ui/themed';

import GuestLayout from '../../layouts/GuestLayout';
import { z } from 'zod';
import { AlertTriangle } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Keyboard } from 'react-native';
import StyledExpoRouterLink from '../../components/StyledExpoRouterLink';
import { router } from 'expo-router';

import { styled } from '@gluestack-style/react';

const StyledImage = styled(Image, {
  props: {
    style: {
      height: 40,
      width: 320,
    },
  },
});
interface PinInputProps {
  refList: React.RefObject<HTMLInputElement>[];
  setInputFocus: React.Dispatch<React.SetStateAction<number>>;
  focusedIndex: number;
  setOtpInput: (otpInput: Array<string>) => void;
  otpInput: any;
}

function PinInput({
  refList,
  setInputFocus,
  focusedIndex,
  setOtpInput,
  otpInput,
}: PinInputProps) {
  return (
    <HStack space="xs">
      {Array.from({ length: 6 }, (_, index) => (
        <Input key={index} variant="outline" w="$100/7" size="md">
          <InputField
            //@ts-ignore
            ref={refList[index]}
            placeholder=""
            borderBottomColor={
              focusedIndex === index ? '$primary900' : '$borderLight500'
            }
            bg="$backgroundLight0"
            sx={{
              '@md': {
                w: '$1/6',
              },
              '@lg': {
                w: '$25/2',
              },
              '_dark': {
                bgColor: '$backgroundDark400',
                borderBottomColor:
                  focusedIndex === index ? '$primary500' : '$borderDark100',
              },
            }}
            w="$100/7"
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

              const updateOtpAtIndex = (index: number, value: string) => {
                const newOtpInput = [...otpInput];
                newOtpInput[index] = value;
                setOtpInput(newOtpInput);
              };
              updateOtpAtIndex(index, text);
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
      <StyledExpoRouterLink href="/">
        <Icon
          as={ArrowLeftIcon}
          color="$textLight50"
          sx={{ _dark: { color: '$textDark50' } }}
        />
      </StyledExpoRouterLink>
      <Text
        color="$textLight50"
        fontSize="$lg"
        sx={{ _dark: { color: '$textDark50' } }}
      >
        OTP Verification
      </Text>
    </HStack>
  );
}
function SideContainerWeb() {
  return (
    <Center
      flex={1}
      bg="$primary500"
      sx={{
        _dark: {
          bg: '$primary500',
        },
      }}
    >
      <StyledImage
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
      <Heading
        fontSize="$xl"
        sx={{
          '@md': { fontSize: '$2xl', pb: '$4' },
        }}
      >
        Enter OTP
      </Heading>
      <HStack space="xs" alignItems="center">
        <Text
          color="$textLight800"
          sx={{
            '@md': {
              pb: '$12',
            },
            '_dark': {
              color: '$textDark400',
            },
          }}
          fontSize="$sm"
        >
          We have sent the OTP code to
          <Text
            fontWeight="$bold"
            color="$textLight800"
            sx={{
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
        color="$textLight800"
        sx={{
          _dark: {
            color: '$textDark400',
          },
        }}
        fontSize="$sm"
      >
        Already have an account?
      </Text>
      <StyledExpoRouterLink href="/login">
        <LinkText fontSize="$sm">Sign In</LinkText>
      </StyledExpoRouterLink>
    </HStack>
  );
}
function ResendLink() {
  return (
    <HStack py="$8">
      <Text
        color="$textLight800"
        sx={{
          _dark: {
            color: '$textDark400',
          },
        }}
        fontSize="$sm"
      >
        Didn't receive the OTP?
      </Text>
      <StyledExpoRouterLink href="/verify-otp">
        <LinkText fontSize="$sm">RESEND OTP</LinkText>
      </StyledExpoRouterLink>
    </HStack>
  );
}

const OTPSchema = z.object({
  OTP: z.string().min(6, 'OTP must be at least 6 characters in length'),
});

type OTPSchemaType = z.infer<typeof OTPSchema>;

export default function OtpVerification() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<OTPSchemaType>({
    resolver: zodResolver(OTPSchema),
  });

  const [otpInput, setOtpInput] = useState(['', '', '', '', '', '']);
  const firstInput = useRef<HTMLInputElement>(null);
  const secondInput = useRef<HTMLInputElement>(null);
  const thirdInput = useRef<HTMLInputElement>(null);
  const fourthInput = useRef<HTMLInputElement>(null);
  const fifthInput = useRef<HTMLInputElement>(null);
  const sixthInput = useRef<HTMLInputElement>(null);

  const refList = [
    firstInput,
    secondInput,
    thirdInput,
    fourthInput,
    fifthInput,
    sixthInput,
  ];

  const [inputFocus, setInputFocus] = useState<number>(-1);
  const [validationError, setValidationError] = useState<string | null>(null); // State to hold validation error message

  const toast = useToast();

  // const onSubmit = (_data: OTPSchemaType) => {
  //   toast.show({
  //     placement: 'bottom right',
  //     render: ({ id }) => {
  //       const pinValues = refList.map((ref) => ref?.current?.value);
  //       const pin = pinValues.join('');
  //       const Count = otpInput.filter((value) => value !== '').length;

  //       if (Count < 6) {
  //         setValidationError('OTP must be at least 6 characters in length');
  //         return;
  //       }
  //       setValidationError(null);

  //       return (
  //         <Toast nativeID={id} variant="accent" action="success">
  //           <ToastTitle>OTP sent successfully</ToastTitle>
  //         </Toast>
  //       );
  //     },
  //   });
  //   reset();
  //   // Implement your own onSubmit and navigation logic here.
  //   router.replace('/create-password');
  // };

  // const handleKeyPress = () => {
  //   Keyboard.dismiss();
  //   handleSubmit(onSubmit)();
  // };

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
        bg="$backgroundLight0"
        sx={{
          '@md': {
            p: '$8',
          },
          '_dark': {
            bg: '$backgroundDark800',
          },
        }}
        py="$8"
        px="$4"
        flex={1}
        maxWidth="$508"
      >
        <MainText />
        <VStack space="md" mt="$6">
          <FormControl>
            <PinInput
              refList={refList}
              setInputFocus={setInputFocus}
              focusedIndex={inputFocus}
              otpInput={otpInput}
              setOtpInput={setOtpInput}
            />
            {validationError && (
              <Text fontSize="$sm" color="$error700">
                {validationError}
              </Text>
            )}
            <FormControlHelperText mt="$8">
              <ResendLink />
            </FormControlHelperText>

            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} size="md" />
              <FormControlErrorText>
                {errors?.OTP?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <Button
            size="lg"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            onPress={() => router.replace('/create-password')}
          >
            <ButtonText fontSize="$sm">PROCEED </ButtonText>
          </Button>
        </VStack>

        <AccountLink />
      </Box>
    </GuestLayout>
  );
}
