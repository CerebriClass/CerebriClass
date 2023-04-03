import { LogoSvg } from '@/assets';
import { HStack, Spacer } from '@/components/common';
import { Button } from '@/components/common/Button';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useHeader } from './hooks/useHeader';

export const Header = () => {
  const { links } = useHeader();
  const navigate = useNavigate();

  return (
    <Layout>
      <HStack h="100%">
        <Button onClick={() => navigate('/')} element={<LogoSvg />} />
        <Spacer />
        <NavList>
          {links.map((link) => (
            <Button
              key={link.label}
              onClick={() => navigate(link.to)}
              element={<span>{link.label}</span>}
            />
          ))}
        </NavList>
      </HStack>
    </Layout>
  );
};

const Layout = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 5rem;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.colors.primary.light};
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
`;
