# Create custom react apps

### How to use

```sh
yarn create mantine app-name
```

## Installed Packages

- Vite - React - Typescript
- React router
- MantineUI
- React Query with default fetcher
- FontAwesome (Used with babel macros to get only what you need)
- Redux Toolkit
- Axios
- Cookie and localStorage helper
- Eslint and Prettier

## Fetch Queries with React-Query in many ways

### Usage with custom hook

```ts
// useUsersQuery.ts

import { useQuery } from "@tanstack/react-query";

export type UsersQuery = {
  id: number;
  name: string;
  username: string;
  email: string;
}[];

const useUsersQuery = () => {
  return useQuery<UsersQuery>({
    queryKey: ["https://jsonplaceholder.typicode.com/users"],
  });
};

export default useUsersQuery;
```

### OR use directly in a page

```ts
import { Avatar, Group, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import Page from "@/components/Page";

export type UserProps = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const UsersPage = () => {
  const { data } = useQuery<UserProps[]>({
    queryKey: ["https://jsonplaceholder.typicode.com/users"],
  });

  return (
    <Page title="About">
      <Stack>
        {data?.map((item) => {
          return (
            <Group key={item.id}>
              <Avatar color="red">
                <Text size="xs">{item.name.slice(0, 2)}</Text>
              </Avatar>
              <Text>{item.name}</Text>
            </Group>
          );
        })}
      </Stack>
    </Page>
  );
};

export default UsersPage;
```

---

## How to use icons

```ts
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Icon from "@/components/Icon";

const App = () => {
  return <Icon icon={solid("home")} />;
};

export default App;
```
