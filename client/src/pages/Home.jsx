import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f1419 0%, #1a1d23 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const HeroSection = styled.div`
  max-width: 800px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 72px;
  background: linear-gradient(135deg, #6c5ce7, #00b894);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  text-shadow: 0 0 30px rgba(108, 92, 231, 0.5);
`;

const Subtitle = styled.h2`
  color: #dfe6e9;
  font-size: 24px;
  margin-bottom: 30px;
  font-weight: 300;
`;

const Description = styled.p`
  color: #b2bec3;
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 40px;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, #6c5ce7, #00b894);
  color: white;
  padding: 15px 40px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(108, 92, 231, 0.4);
  }
`;

export default function Home() {
  return (
    <HomeContainer>
      <HeroSection>
        <Title>Level Sync</Title>
        <Subtitle>Your Personal Task Tracker</Subtitle>
        <Description>
          Stay organized, build habits, and level up your daily routine. 
          Level Sync helps you manage tasks while tracking your progress 
          with a gamified experience.
        </Description>
        <CTAButton to="/dashboard">Get Started</CTAButton>
      </HeroSection>
    </HomeContainer>
  );
}