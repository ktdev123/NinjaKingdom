import styled from "@emotion/styled";

import { pxToRem } from "@/utils/toRem";

const LoginButtonWrapper = styled.div<{ isConnected: boolean }>`
  filter: ${(props) => (props.isConnected ? "grayscale(0)" : "grayscale(.7)")};
  background-color: #7284c6;
  :hover {
    filter: grayscale(0);
  }
  transition: filter 0.15s ease-in-out;
  padding: 0.3rem 2.3rem;
  display: flex;
  align-items: center;
  height: 2.8rem;
  border-radius: 2rem;
  white-space: nowrap;
  min-width: ${pxToRem(320)};
`;

const LoginButtonLogo = styled.img`
  height: 100%;
`;

const LoginButtonText = styled.div`
  font-size: 1rem;
  margin: 0 0.1rem 0 1.4rem;
  text-align: center;
  width: 100%;
  line-height: 0;
`;

type LoginButtonProps = {
  logoSrc: string;
  app: "TWITTER" | "DISCORD";
  isConnected: boolean;
  handleLogin: () => void;
};

export const LoginButton = ({
  logoSrc,
  app,
  isConnected,
  handleLogin,
}: LoginButtonProps) => {
  return (
    <LoginButtonWrapper onClick={handleLogin} isConnected={isConnected}>
      <LoginButtonLogo src={logoSrc} />
      <LoginButtonText>
        {isConnected ? "CONNECTED" : `CONNECT ${app}`}
      </LoginButtonText>
    </LoginButtonWrapper>
  );
};
