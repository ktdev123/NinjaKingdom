import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useWeb3React } from "@web3-react/core";

import { useGlobalStore } from "@/store";
import { pxToRem } from "@/utils/toRem";

const UserMetaMaskAddressWrapper = styled.div<{
  connectMetaMask: boolean;
}>`
  position: absolute;
  top: 4rem;
  right: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: flex-start;
  width: ${pxToRem(264)};
  border: solid 1px white;
  height: ${pxToRem(48)};
  border-radius: 1rem;
  color: white;
  white-space: nowrap;
  z-index: 100;
  ${(props) =>
    props.connectMetaMask
      ? css`
          font-size: ${pxToRem(13)};
          font-weight: normal;
          font-style: normal;
          background-color: none;
        `
      : css`
          /* font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-seri; */
          font-size: ${pxToRem(18)};
          font-weight: bolder;
          font-style: italic;
          background-color: #7284c6;
        `}
`;

const AddressText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  max-width: 50%;
`;

const ConnectWalletText = styled.div`
  font-family: "Racing-Sans-One";
`;

export const MetamaskButton = () => {
  const { metamaskId } = useGlobalStore();
  const { connector } = useWeb3React();

  return (
    <>
      <UserMetaMaskAddressWrapper
        connectMetaMask={!!metamaskId}
        onClick={async () => {
          // await connector.resetState();
          if (process.env.REACT_APP_DEV_MODE === "true") {
            useGlobalStore.setState({ metamaskId: "metamask" });
            return;
          }
          try {
            await connector.connectEagerly?.();
            // await connector.activate?.();
          } catch (e) {
            console.log(e);
          }
        }}
      >
        {!!metamaskId ? (
          <AddressText>{metamaskId}</AddressText>
        ) : (
          <ConnectWalletText>CONNECT WALLET</ConnectWalletText>
        )}
      </UserMetaMaskAddressWrapper>
    </>
  );
};
