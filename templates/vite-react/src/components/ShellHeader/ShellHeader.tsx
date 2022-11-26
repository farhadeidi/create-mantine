import { useState } from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used
import {
  ActionIcon,
  Burger,
  Container,
  Drawer,
  Flex,
  Group,
  Header,
  MediaQuery,
  Stack,
  Title,
  useMantineColorScheme,
} from '@mantine/core';

import { useLocation } from 'react-router-dom';

import { constants } from '@/configs/constants';
import { NavLinkProps } from '@/configs/links';
import { isRouteActive } from '@/shared/helpers';

import Icon from '../Icon';
import NavbarLink from '../NavbarLink';

export interface ShellHeaderProps {
  height: number;
  links: NavLinkProps[];
}
const ShellHeader: React.FC<ShellHeaderProps> = ({ height, links }) => {
  const { pathname } = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Header height={height}>
      <Container
        mih={height}
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Group>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={isDrawerOpen}
              onClick={() => setIsDrawerOpen((o) => !o)}
              size="sm"
              title={isDrawerOpen ? 'Close navigation' : 'Open navigation'}
            />
          </MediaQuery>
          <Title size={24}>{constants.siteName}</Title>
        </Group>
        <Flex sx={{ flex: 1 }} justify="flex-end">
          <Group>
            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
              <Group spacing={4}>
                {links.map((item) => {
                  return (
                    <NavbarLink
                      key={item.href}
                      {...item}
                      subLinks={item.subLinks?.map((el) => ({
                        ...el,
                        isActive: isRouteActive(pathname, el.href),
                      }))}
                      isActive={isRouteActive(pathname, item.href)}
                    />
                  );
                })}
              </Group>
            </MediaQuery>
            <ActionIcon
              ml="md"
              variant="outline"
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {colorScheme === 'dark' ? (
                <Icon icon={solid('sun')} />
              ) : (
                <Icon icon={solid('moon')} />
              )}
            </ActionIcon>
          </Group>
        </Flex>
      </Container>
      <Drawer
        opened={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Navigation"
        padding="xl"
        size="md"
      >
        <Stack spacing={8}>
          {links.map((item) => {
            return (
              <NavbarLink
                key={item.href}
                label={item.label}
                href={item.href}
                isVertical
                subLinks={item.subLinks?.map((el) => ({
                  ...el,
                  isActive: isRouteActive(pathname, el.href),
                }))}
                isActive={isRouteActive(pathname, item.href)}
              />
            );
          })}
        </Stack>
      </Drawer>
    </Header>
  );
};

export default ShellHeader;
