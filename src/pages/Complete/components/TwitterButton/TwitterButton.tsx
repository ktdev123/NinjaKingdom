import styled from "@emotion/styled";

import twitterLogo from "./assets/twitter_logo.png";

const TwitterButtonATag = styled.a`
  text-decoration-line: none;
  color: white;
`;

const TwitterButtonWrapper = styled.div`
  background-color: rgb(29, 155, 240);
  padding: 0.3rem 2rem;
  display: flex;
  align-items: center;
  height: 2.4rem;
  border-radius: 2rem;
  width: fit-content;
`;

const TwitterButtonLogo = styled.img`
  height: 100%;
`;

const TwitterButtonTextfollow = styled.div`
  font-size: 1.2rem;
  margin: 0 0.1rem 0 1.4rem;
`;

const TwitterButtonAccName = styled.div`
  margin: 0 0.1rem;
`;

export const TwitterButton = () => {
  return (
    <TwitterButtonATag
      href="https://twitter.com/ninjakingdomjp"
      target="_blank"
      rel="noreferrer noopener"
      className="twitter-follow-button"
      data-show-count="false"
    >
      <TwitterButtonWrapper>
        <TwitterButtonLogo src={twitterLogo} />
        <TwitterButtonTextfollow>FOLLOW</TwitterButtonTextfollow>
        <TwitterButtonAccName>@ninjakingdomjp</TwitterButtonAccName>
      </TwitterButtonWrapper>
    </TwitterButtonATag>
  );
};
