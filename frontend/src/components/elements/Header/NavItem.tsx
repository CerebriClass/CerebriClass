import { HStack, Text, VStack } from '@/components/common';
import { Button } from '@/components/common/Button';
import { Link } from '@/utils/types/Link';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';

type NavItemProps = {
  link: Link;
};

export const NavItem = ({ link }: NavItemProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isFocused = location.pathname === link.to;
  const Icon = link.icon;

  return (
    <Layout isFocused={isFocused}>
      <Button
        key={link.label}
        onClick={() => navigate(link.to)}
        element={
          <HStack spacing="1rem">
            <Icon width="16px" fill={!isFocused ? 'black' : 'white'} />
            <Text
              fontWeight={theme.fonts.weight.medium}
              color={!isFocused ? 'black' : 'white'}
            >
              {link.label}
            </Text>
          </HStack>
        }
      />
    </Layout>
  );
};

type LayoutProps = {
  isFocused: boolean;
};

const Layout = styled(VStack)<LayoutProps>`
  height: 100%;
  padding: 0 2rem;
  background-color: ${({ isFocused, theme }) =>
    isFocused ? theme.colors.primary.dark : 'transparent'};
  border-bottom: ${({ isFocused, theme }) =>
    isFocused ? `4px solid ${theme.colors.secondary.default}` : 'none'};
`;
