import { MantineTheme } from '@mantine/core';

export const defaultTheme: Partial<MantineTheme> = {
  // primaryColor: "orange",
  defaultRadius: 'md',
  components: {
    ActionIcon: {
      defaultProps: {
        variant: 'transparent',
      },
    },
    Card: {
      defaultProps: {
        p: 'lg',
        withBorder: true,
      },
    },
    Container: {
      defaultProps: {
        sx: { flex: 1, display: 'flex' },
      },
    },
  },
};
