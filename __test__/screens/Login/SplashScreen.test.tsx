jest.useFakeTimers();
import React from 'react';
import renderer from 'react-test-renderer';
import { StyledProvider, config } from '@gluestack-ui/themed';
import SplashScreen from '../../../screens/Login/SplashScreen';

jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const KeyboardAwareScrollView = ({ children }: any) => children;
  return { KeyboardAwareScrollView };
});

it('Splash Screen', () => {
  const tree = renderer
    .create(
      <StyledProvider config={config.theme}>
        <SplashScreen />
      </StyledProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});