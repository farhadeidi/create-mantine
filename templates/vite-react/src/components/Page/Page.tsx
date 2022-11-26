import { Box, Container } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';

import { constants } from '@/configs/constants';

export interface PageProps {
  children?: React.ReactNode;
  title: string;
  noContainer?: boolean;
}

const Page: React.FC<PageProps> = ({ children, title, noContainer }) => {
  useDocumentTitle(`${title} - ${constants.siteName}`);
  return (
    <Box sx={{ flex: 1, display: 'flex' }}>
      <Container unstyled={noContainer} sx={{ flex: 1, display: 'flex' }}>
        {children}
      </Container>
    </Box>
  );
};

export default Page;
