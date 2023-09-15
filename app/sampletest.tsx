import GuestLayout from '../layouts/GuestLayout';
import { Center, Box, Text } from '@gluestack-ui/themed';

import { Link } from 'expo-router';

export default function Home() {
  return (
    <GuestLayout>
      <Center w="100%" flex={1}>
        <Box
          maxWidth={500}
          w="100%"
          sx={{
            '@md': {
              height: 544,
              px: '$8',
              bg: '$primary500',
            },
          }}
          px={'$4'}
          justifyContent="center"
        >
          <Text>Hello from test page</Text>
          <Link href="..">Go back to home</Link>
        </Box>
      </Center>
    </GuestLayout>
  );
}
