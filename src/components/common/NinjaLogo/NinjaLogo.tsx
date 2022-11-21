import styled from "@emotion/styled";

const Logo = styled.img`
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  width: 4rem;
  animation: rotation 16s linear infinite;
  position: absolute;
  top: 4rem;
  left: 6rem;
  opacity: 1;
  z-index: 100;
`;

export const NinjaLogo = () => {
  return <Logo src="./assets/images/NinjaKingdom-Logo.png" />;
};
