import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Image,
  HStack,
  VStack,
  Text,
  Link,
  Divider,
  Icon,
  Center,
  FormControl,
  Box,
  LinkText,
  Input,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  InputIcon,
  FormControlHelper,
  Toast,
  ToastTitle,
  useToast,
  ButtonIcon,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  CheckIcon,
  ButtonText,
  Heading,
  ArrowLeftIcon,
  InputField,
} from '@gluestack-ui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller, useForm } from 'react-hook-form';
import { AlertTriangle, EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Keyboard } from 'react-native';

import { FacebookIcon, GoogleIcon } from './assets/Icons/Social';

import GuestLayout from '../../layouts/GuestLayout';

import { Link as ExpoRouterLink, router } from 'expo-router';

const signUpSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z
    .string()
    .min(6, 'Must be at least 8 characters in length')
    .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
    .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
    .regex(new RegExp('.*\\d.*'), 'One number')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      'One special character'
    ),
  confirmpassword: z
    .string()
    .min(6, 'Must be at least 8 characters in length')
    .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
    .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
    .regex(new RegExp('.*\\d.*'), 'One number')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      'One special character'
    ),
  rememberme: z.boolean().optional(),
});

type SignUpSchemaType = z.infer<typeof signUpSchema>;

function SideContainerWeb() {
  return (
    <Center
      flex={1}
      sx={{
        _light: {
          bg: '$primary500',
        },
        _dark: {
          bg: '$primary500',
        },
      }}
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

function MobileHeader() {
  return (
    <VStack px="$3" mt="$4.5" mb="$5" space="md">
      <HStack space="xs" alignItems="center">
        <ExpoRouterLink href="..">
          <Icon as={ArrowLeftIcon} color="$textLight50" />
        </ExpoRouterLink>

        <Text color="$textLight50" fontSize="$lg">
          Sign Up
        </Text>
      </HStack>
      <VStack space="xs" ml="$1" my="$4">
        <Heading fontSize="$3xl" color="$textLight50">
          Welcome
        </Heading>
        <Text
          fontSize="$md"
          fontWeight="normal"
          sx={{
            _light: {
              color: '$primary300',
            },
            _dark: {
              color: '$textDark400',
            },
          }}
        >
          Sign up to continue
        </Text>
      </VStack>
    </VStack>
  );
}

const SignUpForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [pwMatched, setPwMatched] = useState(false);
  const toast = useToast();

  const onSubmit = (_data: SignUpSchemaType) => {
    if (_data.password === _data.confirmpassword) {
      setPwMatched(true);
      toast.show({
        placement: 'bottom right',
        render: ({ id }) => {
          return (
            <Toast nativeID={id} variant="accent" action="success">
              <ToastTitle>Signed up successfully</ToastTitle>
            </Toast>
          );
        },
      });
      reset();
    } else {
      toast.show({
        placement: 'bottom right',
        render: ({ id }) => {
          return (
            <Toast nativeID={id} action="error">
              <ToastTitle>Passwords do not match</ToastTitle>
            </Toast>
          );
        },
      });
    }
    // Implement your own onSubmit and navigation logic here.
    // Navigate to appropriate location
    router.replace('/login');
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  const handleConfirmPwState = () => {
    setShowConfirmPassword((showState) => {
      return !showState;
    });
  };

  return (
    <>
      <VStack justifyContent="space-between">
        <FormControl
          isInvalid={(!!errors.email || isEmailFocused) && !!errors.email}
          isRequired={true}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await signUpSchema.parseAsync({ email: value });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Email"
                  fontSize="$sm"
                  type="text"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="$sm" as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.email?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={!!errors.password} isRequired={true} my="$6">
          <Controller
            name="password"
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await signUpSchema.parseAsync({
                    password: value,
                  });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  fontSize="$sm"
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  type={showPassword ? 'text' : 'password'}
                />
                <InputIcon pr="$3" onPress={handleState}>
                  <Icon as={showPassword ? EyeIcon : EyeOffIcon} color="gray" />
                </InputIcon>
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="$sm" as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.password?.message}
            </FormControlErrorText>
          </FormControlError>

          <FormControlHelper></FormControlHelper>
        </FormControl>

        <FormControl isInvalid={!!errors.password} isRequired={true}>
          <Controller
            name="confirmpassword"
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await signUpSchema.parseAsync({
                    password: value,
                  });

                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Confirm Password"
                  fontSize="$sm"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  type={showConfirmPassword ? 'text' : 'password'}
                />
                <InputIcon pr="$3" onPress={handleConfirmPwState}>
                  <Icon
                    as={showConfirmPassword ? EyeIcon : EyeOffIcon}
                    color="gray"
                  />
                </InputIcon>
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="$sm" as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.password?.message}
            </FormControlErrorText>
          </FormControlError>
          {!errors?.password?.message && !pwMatched ? (
            <FormControlError>
              <FormControlErrorIcon size="$sm" as={AlertTriangle} />
              <FormControlErrorText>
                <Text>Passwords must be same</Text>
              </FormControlErrorText>
            </FormControlError>
          ) : null}

          <FormControlHelper></FormControlHelper>
        </FormControl>
      </VStack>
      <Controller
        name="rememberme"
        defaultValue={false}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            size="sm"
            value="Remember me"
            isChecked={value}
            onChange={onChange}
            alignSelf="flex-start"
            mt="$5"
          >
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel
              sx={{
                _dark: { color: '$warmGray400' },
                _text: {
                  // lineHeight: 24,
                  fontSize: '$sm',
                },
              }}
            >
              I accept the
              <Link mb={-1} isExternal href="https://gluestack.io/terms-of-service">
                <LinkText
                  // lineHeight={'$2xs'}
                  fontSize="$sm"
                  textDecorationLine="none"
                  color="$primary500"
                >
                  {' Terms of Use '}
                </LinkText>
              </Link>
              &
              <Link mb={-1} isExternal href="https://gluestack.io/privacy-policy">
                <LinkText
                  color="$primary500"
                  textDecorationLine="none"
                  // lineHeight={12.5}
                  fontSize="$sm"
                >
                  {' Privacy Policy '}
                </LinkText>
              </Link>
            </CheckboxLabel>
          </Checkbox>
        )}
      />
      <Button mt="$6" onPress={handleSubmit(onSubmit)} px="$2">
        <ButtonText fontSize="$sm" fontWeight="$medium">
          SIGN UP
        </ButtonText>
      </Button>
    </>
  );
};

function SignUpFormComponent() {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{ width: '100%', height: '100%' }}
      bounces={false}
      enableOnAndroid={true}
    >
      <Box
        sx={{
          '@md': {
            display: 'none',
          },
        }}
        display="flex"
      >
        <MobileHeader />
      </Box>

      <Box
        flex={1}
        sx={{
          '@md': {
            px: '$8',
            borderTopLeftRadius: '$none',
            borderTopRightRadius: '$none',
            borderBottomRightRadius: '$none',
          },
          '_light': {
            bg: '$backgroundLight0',
          },
          '_dark': {
            bg: '$backgroundDark800',
          },
        }}
        px="$4"
        py="$8"
        justifyContent="space-between"
        borderTopLeftRadius="$2xl"
        borderTopRightRadius="$2xl"
        borderBottomRightRadius="$none"
      >
        <Text
          sx={{
            '@md': {
              display: 'flex',
            },
            '_light': {
              color: '$textLight800',
            },
            '_dark': {
              color: '$textDark50',
            },
          }}
          display="none"
          fontSize="$2xl"
          fontWeight="bold"
          mb="$8"
        >
          Sign up to continue
        </Text>

        <SignUpForm />

        <HStack
          space="xs"
          sx={{
            '@md': {
              mt: '$4',
            },
          }}
          mt="$6"
          alignItems="center"
          justifyContent="center"
        >
          <Divider
            w="$2/6"
            sx={{
              _light: {
                bg: '$backgroundLight200',
              },
              _dark: {
                bg: '$backgroundDark700',
              },
            }}
          />
          <Text
            fontWeight="medium"
            sx={{
              _light: {
                color: '$textlight400',
              },
              _dark: {
                color: '$textdark300',
              },
            }}
          >
            or
          </Text>
          <Divider
            w="$2/6"
            sx={{
              _light: {
                bg: '$backgroundLight200',
              },
              _dark: {
                bg: '$backgroundDark700',
              },
            }}
          />
        </HStack>
        <HStack
          space="sm"
          sx={{
            '@md': {
              mt: '$4',
            },
          }}
          mt="$6"
          mb="$9"
          alignItems="center"
          justifyContent="center"
        >
          <Link href="">
            <Button action="secondary" variant="link" onPress={() => {}}>
              <ButtonIcon as={FacebookIcon} />
            </Button>
          </Link>
          <Link href="">
            <Button action="secondary" variant="link" onPress={() => {}}>
              <ButtonIcon as={GoogleIcon} />
            </Button>
          </Link>
        </HStack>

        <HStack
          space="xs"
          alignItems="center"
          justifyContent="center"
          mt="auto"
        >
          <Text
            fontSize="$sm"
            color="$coolGray500"
            fontWeight="normal"
            sx={{
              _dark: {
                color: '$textDark400',
              },
            }}
          >
            Already have an account?
          </Text>

          <ExpoRouterLink href="/login">
            <LinkText
              sx={{
                'color': '$primary500',
                'textDecorationLine': 'none',
                ':hover': { color: '$primary600' },
                'fontWeight': '$bold',
              }}
              fontSize="$sm"
            >
              Sign In
            </LinkText>
          </ExpoRouterLink>
        </HStack>
      </Box>
    </KeyboardAwareScrollView>
  );
}

export default function SignUp() {
  return (
    <GuestLayout>
      <Box
        sx={{
          '@md': {
            display: 'flex',
          },
        }}
        flex={1}
        display="none"
      >
        <SideContainerWeb />
      </Box>
      <Box flex={1}>
        <SignUpFormComponent />
      </Box>
    </GuestLayout>
  );
}