---
to: src/pages/<%= name %>.page.tsx
---
import { Center } from '@mantine/core';
import Page from '@/components/Page';

const <%= name %>Page = () => {
  return (
    <Page title='<%= name %>'>
      <Center sx={{ flex: 1 }}>Hello from <%= name %></Center>
    </Page>
  );
};

export default <%= name %>Page;
