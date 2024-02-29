import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { SocialIcon } from "react-social-icons";
import axios from "axios";

function Home() {
  const [recentUsers, setRecentUsers] = useState({ data: [] });

  const calculateDateDifference = (registerDate) => {
    const currentDate = new Date();
    const registerDateObj = new Date(registerDate);
    const timeDifference = currentDate - registerDateObj;

    // Calculate days, hours, minutes, seconds
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesDifference = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    // Choose the appropriate unit based on the magnitude of the time difference
    if (daysDifference > 0) {
      return ` ${daysDifference} day${daysDifference === 1 ? "" : "s"} ago`;
    } else if (hoursDifference > 0) {
      return ` ${hoursDifference} hour${hoursDifference === 1 ? "" : "s"} ago`;
    } else if (minutesDifference > 0) {
      return ` ${minutesDifference} minute${
        minutesDifference === 1 ? "" : "s"
      } ago`;
    } else {
      return " Just now";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/recentUsers");
        setRecentUsers(data);
      } catch (error) {
        console.error("Error fetching recent users:", error);
      }
    };

    // Set up an interval to fetch updates every 1 second (adjust as needed)
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <LandingPageContainer>
      <MainContainer>
        <ThankYouMessage>Thank you for registering!</ThankYouMessage>
        <DevelopmentMessage>
          We are in early development.
          <br />
          Stay tuned for updates!
        </DevelopmentMessage>
        <SocialLinksContainer>
          <SocialIcon
            className="socialIcon"
            style={{
              height: "35px",
              width: "35px",
              margin: "0px",
            }}
            url="https://www.instagram.com/tufaylasaf"
          />
          <SocialIcon
            className="socialIcon"
            style={{
              height: "35px",
              width: "35px",
              margin: "0px",
            }}
            url="https://www.github.com/tufaylasaf"
          />
          <SocialIcon
            className="socialIcon"
            style={{
              height: "35px",
              width: "35px",
              margin: "0px",
            }}
            url="https://linkedin.com/in/tufayl-asaf-891074200/"
          />
        </SocialLinksContainer>
      </MainContainer>
      <UserList>
        {recentUsers.data.map((user, index) => (
          <AnimatedListItem key={user._id} delay={index * 0.6}>
            <GradientBorderContainer>
              <GradientBorder id="box">
                <User>{user.name} </User>registered
                <RegisterDate>
                  {calculateDateDifference(user.registerDate)}
                </RegisterDate>
                <GradientBorderAfter />
              </GradientBorder>
            </GradientBorderContainer>
          </AnimatedListItem>
        ))}
      </UserList>
    </LandingPageContainer>
  );
}

// Styled components for styling
const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-height: 300px;
  width: 50vw;
  background-color: #1d1f20;
  border-radius: 12px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  gap: 20px;
`;

const ThankYouMessage = styled.h1`
  font-size: 2em;
  margin: 0px;
  color: white; /* Set your preferred text color */
`;

const DevelopmentMessage = styled.p`
  font-size: 1.1em;
  text-align: center;
  margin: 0px;
  color: #aaa; /* Set your preferred text color */
`;

const SocialLinksContainer = styled.div`
  display: flex;
  height: fit-content;
  gap: 20px;
`;

const UserList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-height: 15%;
  margin: 20px 10px;
`;

const User = styled.text``;

const RegisterDate = styled.text`
  font-style: italic;
`;

const GradientBorderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  color: white;
`;

const GradientBorder = styled.div`
  --borderWidth: 2px;
  background: #1d1f20;
  position: relative;
  border-radius: var(--borderWidth);
  padding: 12px;
  width: 25%;
`;

const GradientBorderAfter = styled.div`
  content: "";
  position: absolute;
  top: calc(-1 * var(--borderWidth));
  left: calc(-1 * var(--borderWidth));
  height: calc(100% + var(--borderWidth) * 2);
  width: calc(100% + var(--borderWidth) * 2);
  background: linear-gradient(
    60deg,
    #f79533,
    #f37055,
    #ef4e7b,
    #a166ab,
    #5073b8,
    #1098ad,
    #07b39b,
    #6fba82
  );
  border-radius: calc(2 * var(--borderWidth));
  z-index: -1;
  animation: animatedgradient 3s ease alternate infinite;
  background-size: 300% 300%;
`;

const AnimatedListItem = styled.div`
  width: 100%;
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
  animation-delay: ${(props) => props.delay}s;
`;

export default Home;
