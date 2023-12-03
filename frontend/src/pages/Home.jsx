import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import styled from "styled-components";
import { SocialIcon } from "react-social-icons";

function Home() {
  const { user } = useContext(UserContext);

  return (
    <LandingPageContainer>
      {!!user && <h1>Welcome {user.name}</h1>}
      <ThankYouMessage>Thank you for registering!</ThankYouMessage>
      <DevelopmentMessage>
        We are in early development. Stay tuned for updates!
      </DevelopmentMessage>
      <SocialLinksContainer>
        <SocialIcon
          style={{
            height: "50px",
            width: "50px",
            overflow: "visible",
          }}
          url="www.instagram.com/tufaylasaf"
        />
        <SocialIcon
          style={{
            height: "50px",
            width: "50px",
            overflow: "visible",
          }}
          url="www.github.com/tufaylasaf"
        />
        <SocialIcon
          style={{
            height: "50px",
            width: "50px",
            overflow: "visible",
          }}
          url="linkedin.com/in/tufayl-asaf-891074200/"
        />
        {/* Add more social links as needed */}
      </SocialLinksContainer>
    </LandingPageContainer>
  );
}

// Styled components for styling
const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh;
  width: 75vw;
  background-color: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

const ThankYouMessage = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
  color: #333; /* Set your preferred text color */
`;

const DevelopmentMessage = styled.p`
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 30px;
  color: #555; /* Set your preferred text color */
`;

const SocialLinksContainer = styled.div`
  display: flex;
  height: fit-content;
  gap: 20px;
`;

export default Home;
