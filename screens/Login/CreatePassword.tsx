import React, { useState } from 'react';
import {
  VStack,
  Box,
  HStack,
  Icon,
  Text,
  Button,
  Image,
  Center,
  ArrowLeftIcon,
  FormControl,
  Heading,
  FormControlHelperText,
  EyeIcon,
  EyeOffIcon,
  ButtonText,
  Input,
  useToast,
  Toast,
  InputField,
  ToastTitle,
  FormControlHelper,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  InputIcon
} from '@gluestack-ui/themed';
import { AlertTriangle } from 'lucide-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Keyboard } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import GuestLayout from '../../layouts/GuestLayout';

import { Link as ExpoRouterLink, router } from 'expo-router';

const createPasswordSchema = z.object({
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
});

type CreatePasswordSchemaType = z.infer<typeof createPasswordSchema>;

export default function CreatePassword() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreatePasswordSchemaType>({
    resolver: zodResolver(createPasswordSchema),
  });

  const toast = useToast();

  const onSubmit = (data: CreatePasswordSchemaType) => {
    if (data.password === data.confirmpassword) {
      toast.show({
        placement: 'bottom right',
        render: ({ id }) => {
          return (
            <Toast nativeID={id} variant="accent" action="success">
              <ToastTitle>Password updated successfully</ToastTitle>
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
            <Toast nativeID={id} variant="accent" action="error">
              <ToastTitle>Passwords do not match</ToastTitle>
            </Toast>
          );
        },
      });
    }

    // Navigate screen to appropriate location    
    router.replace('/test');
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

  const handleConfirmPasswordState = () => {
    setShowConfirmPassword((showConfirmPassword) => {
      return !showConfirmPassword;
    });
  };

  function Header() {
    return (
      <HStack space="md" px="$3" my="$4.5" alignItems="center">
        <ExpoRouterLink href="..">
          <Icon size="6" as={ArrowLeftIcon} color="$textLight50" />
        </ExpoRouterLink>
        <Text color="$textLight50" fontSize="$lg">
          Create Password
        </Text>
      </HStack>
    );
  }

  function ScreenText() {
    return (
      <VStack space="md">
        <Heading
          fontSize="$xl"
          color="$textLight800"
          sx={{
            '@md': { fontSize: '$2xl' },

            '_dark': { color: '$textDark50' },
          }}
        >
          Create new password
        </Heading>
        <Text
          color="$textLight800"
          fontSize="$sm"
          sx={{
            _dark: { color: '$textDark400' },
          }}
        >
          Your new password must be different from previous used passwords and
          must be of at least 8 characters.
        </Text>
      </VStack>
    );
  }

  function WebSideContainer() {
    return (
      <Center
        flex={1}
        bg="$primary500"
        px="$4"
        sx={{
          '@md': { px: '$8' },
        }}
      >
        <Image
          w="$80"
          h="$10"
          alt="Gluestack-ui pro  "
          resizeMode={'contain'}
          source={require('./assets/images/gluestackUiProLogo_web_light.svg')}
        />
      </Center>
    );
  }
  return (
    <GuestLayout>
      <Box
        sx={{
          '@md': { display: 'none' },
        }}
      >
        <Header />
      </Box>
      <Box
        display="none"
        sx={{
          '@md': { display: 'flex' },
        }}
        flex={1}
      >
        <WebSideContainer />
      </Box>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{ flex: 1 }}
        bounces={false}
        enableOnAndroid={true}
      >
        <Box
          bg="$backgroundLight0"
          pt="$8"
          pb="$4"
          px="$4"
          sx={{
            '@md': {
              p: '$8',
            },
            '_dark': { bg: '$backgroundDark800' },
          }}
          flex={1}
        >
          <Box flex={1}>
            <ScreenText />
            <VStack
              mt="$7"
              space="md"
              sx={{
                '@md': { mt: '$8' },
              }}
            >
              <Box sx={{ '@base': { w: '$full' }, '@md': { width: '$80' } }}>
                <FormControl isInvalid={!!errors.password} isRequired={true}>
                  <Controller
                    defaultValue=""
                    name="password"
                    control={control}
                    rules={{
                      validate: async (value) => {
                        try {
                          await createPasswordSchema.parseAsync({
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
                          fontSize={'$sm'}
                          placeholder="Password"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          onSubmitEditing={handleKeyPress}
                          returnKeyType="done"
                          type={showPassword ? 'text' : 'password'}
                        />
                        <InputIcon onPress={handleState} mr={'$2'}>
                          <Icon
                            as={showPassword ? EyeIcon : EyeOffIcon}
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
                  <FormControlHelperText>
                    <Text size="xs">Must be at least 8 characters</Text>
                  </FormControlHelperText>
                  <FormControlHelper></FormControlHelper>
                </FormControl>
              </Box>

              <Box
                sx={{
                  '@base': { w: '$full' },
                  '@md': { width: '$80', mt: '$28' },
                }}
              >
                <FormControl
                  isInvalid={!!errors.confirmpassword}
                  isRequired={true}
                >
                  <Controller
                    defaultValue=""
                    name="confirmpassword"
                    control={control}
                    rules={{
                      validate: async (value) => {
                        try {
                          await createPasswordSchema.parseAsync({
                            confirmpassword: value,
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
                          fontSize={'$sm'}
                          placeholder="Confirm Password"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          onSubmitEditing={handleKeyPress}
                          returnKeyType="done"
                          type={showConfirmPassword ? 'text' : 'password'}
                        />
                        <InputIcon
                          onPress={handleConfirmPasswordState}
                          mr={'$2'}
                        >
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
                      {errors?.confirmpassword?.message}
                    </FormControlErrorText>
                  </FormControlError>
                  <FormControlHelperText>
                    <Text size="xs"> Both Password must match</Text>
                  </FormControlHelperText>
                  <FormControlErrorText>
                    <Text size="xs">{errors.confirmpassword?.message}</Text>
                  </FormControlErrorText>
                </FormControl>
              </Box>
            </VStack>
          </Box>
          <Button
            variant="solid"
            size="lg"
            mt="auto"
            sx={{ '@md': { mt: '$40' } }}
            onPress={handleSubmit(onSubmit)}
          >
            <ButtonText fontSize="$sm">UPDATE PASSWORD</ButtonText>
          </Button>
        </Box>
      </KeyboardAwareScrollView>
    </GuestLayout>
  );
}