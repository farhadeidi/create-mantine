import React from 'react';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { Box, BoxProps } from '@mantine/core';

const Icon: React.FC<FontAwesomeIconProps & { boxProps?: BoxProps }> = ({
  boxProps,
  ...props
}) => {
  return (
    <Box {...boxProps}>
      <FontAwesomeIcon fixedWidth {...props} />
    </Box>
  );
};

export default Icon;
