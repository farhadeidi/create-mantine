---
to: src/components/<%= name %>/<%= name %>.tsx
---
import { Box, DefaultProps, MantineNumberSize, Selectors } from '@mantine/core';
import useStyles, { <%= name %>StylesParams } from './<%= name %>.styles';

export type <%= name %>StylesNames = Selectors<typeof useStyles>;
export interface <%= name %>Props extends DefaultProps<<%= name %>StylesNames, <%= name %>StylesParams> {
  radius?: MantineNumberSize;
}

const <%= name %> = ({
  classNames,
  styles,
  unstyled,
  radius,
  className,
  ...others
}: <%= name %>Props) => {
  const { classes, cx } = useStyles(
    { radius },
    { name: '<%= name %>', classNames, styles, unstyled },
  );

  return <Box className={cx(classes.root, className)} {...others}></Box>;
};

export default <%= name %>;
