import React from 'react';
import renderer from 'react-test-renderer';
import { StyledProvider, config } from '@gluestack-ui/themed';
import SplashScreen from '../../../screens/Login/SplashScreen';

it('login navigation test', async () => {
  let navigateTo = 'login';

  // Mock the navigation action
  const mockNavigation = (routeName: string) => {
    navigateTo = routeName;
  };

  const tree = renderer
    .create(
      <StyledProvider config={config.theme}>
        <SplashScreen navigation={{ navigate: mockNavigation }} />
      </StyledProvider>
    )
    .toJSON();

  await renderer.act(async () => {});

  expect(navigateTo).toBe('login');
  expect(tree).toMatchSnapshot();
});
