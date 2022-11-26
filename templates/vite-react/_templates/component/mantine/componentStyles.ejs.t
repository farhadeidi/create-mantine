---
to: src/components/<%= name %>/<%= name %>.styles.ts
---
import { MantineNumberSize, createStyles } from '@mantine/core';

export interface <%= name %>StylesParams {
  radius?: MantineNumberSize;
}

export default createStyles((theme, { radius }: <%= name %>StylesParams) => ({
  root: { borderRadius: theme.fn.radius(radius) },
}));
