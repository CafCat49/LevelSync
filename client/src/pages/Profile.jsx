import { useState, useEffect } from 'react';
import { taskService } from '../services/taskService';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  min-height: 100vh;
  background: #0d0f12;
  padding: 20px;
`;

const ProfileCard = styled.div`
  max-width: 800px;
  margin: 20px auto;
  background: #2d3436;
  border: 2px solid #6c5ce7;
  border-radius: 12px;
  padding: 40px;
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #6c5ce7, #00b894);
  border-radius: 50%;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: white;
  font-weight: bold;
`;

const Username = styled.h1`
  color: #6c5ce7;
  margin: 0;
  font-size: 36px;
`;

const Level = styled.h2`
  color: #00b894;
  margin: 10px 0;
  font-size: 24px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 30px 0;
`;

const StatCard = styled.div`
  background: #34495e;
  border: 1px solid #6c5ce7;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
`;

const StatValue = styled.div`
  color: #00b894;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  color: #dfe6e9;
  font-size: 14px;
`;

const ProgressSection = styled.div`
  margin: 30px 0;
`;

const ProgressLabel = styled.div`
  color: #dfe6e9;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 30px;
  background: #34495e;
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid #6c5ce7;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #6c5ce7, #00b894);
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

export default function Profile() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    totalXP: 0,
    level: 1,
    streak: 0
  });

  useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = async () => {
    try {
      const tasks = await taskService.getAllTasks();
      const completed = tasks.filter(t => t.completed).length;
      const totalXP = tasks.filter(t => t.completed).reduce((sum, t) => sum + (t.xpValue || 10), 0);
      const level = Math.floor(totalXP / 100) + 1; // 100 XP per level

      setStats({
        totalTasks: tasks.length,
        completedTasks: completed,
        totalXP: totalXP,
        level: level,
        streak: 0 // You can implement streak logic later
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const xpForNextLevel = stats.level * 100;
  const currentLevelXP = stats.totalXP % 100;
  const progressToNextLevel = (currentLevelXP / 100) * 100;

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileHeader>
          <Avatar>U</Avatar>
          <Username>User</Username>
          <Level>Level {stats.level}</Level>
        </ProfileHeader>

        <ProgressSection>
          <ProgressLabel>
            <span>XP Progress</span>
            <span>{currentLevelXP} / 100</span>
          </ProgressLabel>
          <ProgressBar>
            <ProgressFill progress={progressToNextLevel} />
          </ProgressBar>
        </ProgressSection>

        <StatsGrid>
          <StatCard>
            <StatValue>{stats.totalXP}</StatValue>
            <StatLabel>Total XP</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.completedTasks}</StatValue>
            <StatLabel>Tasks Completed</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.totalTasks}</StatValue>
            <StatLabel>Total Tasks</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.streak}</StatValue>
            <StatLabel>Day Streak</StatLabel>
          </StatCard>
        </StatsGrid>
      </ProfileCard>
    </ProfileContainer>
  );
}