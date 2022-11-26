import { Box, Button, createStyles, Menu, NavLink } from '@mantine/core';

import { Link } from 'react-router-dom';

import { NavLinkProps } from '@/configs/links';

import Icon from '../Icon';

const useStyles = createStyles((theme, _params, getRef) => ({
  link: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[0]
        : theme.colors.gray[7],

    [`&.${getRef('isActive')}`]: {
      color: theme.colors[theme.primaryColor][7],
    },
  },

  isActive: {
    ref: getRef('isActive'),
  },
}));

const NavbarLink: React.FC<NavLinkProps> = ({ subLinks, ...props }) => {
  const { label, href, isActive, icon, isVertical, iconName } = props;
  const { classes, cx } = useStyles();

  if (isVertical) {
    return (
      <NavLink
        component={Link}
        to={href}
        label={label}
        active={isActive}
        defaultOpened={subLinks?.some((el) => el.isActive)}
      >
        {subLinks?.map((item) => {
          return (
            <NavLink
              component={Link}
              key={item.href}
              label={item.label}
              to={item.href}
              active={item.isActive}
            />
          );
        })}
      </NavLink>
    );
  }
  if (subLinks && subLinks.length > 0) {
    return (
      <Menu trigger="hover" width={240} openDelay={100} closeDelay={400}>
        <Menu.Target>
          <Box>
            <NavbarLink {...props} />
          </Box>
        </Menu.Target>
        <Menu.Dropdown>
          {subLinks?.map((item) => {
            return (
              <Menu.Item
                key={item.href}
                component={Link}
                to={item.href}
                color={item.isActive ? 'blue' : undefined}
              >
                {item.label}
              </Menu.Item>
            );
          })}
        </Menu.Dropdown>
      </Menu>
    );
  }
  return (
    <Button
      variant="subtle"
      leftIcon={iconName ? <Icon icon={iconName} /> : icon}
      component={Link}
      to={href}
      className={cx(classes.link, { [classes.isActive]: isActive })}
    >
      {label}
    </Button>
  );
};

export default NavbarLink;
