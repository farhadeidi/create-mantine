---
to: src/components/<%= name %>/<%= name %>.tsx
---
import { Box, BoxProps } from "@mantine/core";

export interface <%= name %>Props extends BoxProps {}
const <%= name %>: React.FC<<%= name %>Props> = ({ ...props }) => {
  return (
    <Box {...props}>
      <>Hello <%= name %></>
    </Box>
  );
};

export default <%= name %>;
