import { Flex } from '@mantine/core';

import { Outlet } from 'react-router-dom';

import ShellHeader from '@/components/ShellHeader';
import { headerLinks } from '@/configs/links';

export interface ShellProps {}
const Shell: React.FC<ShellProps> = () => {
  return (
    <Flex mih="100vh" direction="column">
      <ShellHeader height={64} links={headerLinks} />
      <Outlet />
    </Flex>
  );
};

export default Shell;
