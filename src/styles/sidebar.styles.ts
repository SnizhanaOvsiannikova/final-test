import styled, { keyframes }from 'styled-components';
import { MdWavingHand } from 'react-icons/md';

export const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  flex-direction: column;
  align-self: stretch;
  overflow-y: auto;
  border-radius: 8px 0 0 8px;
  padding: 10px;
`;

export const SidebarHeader = styled.div`
  padding: 20px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #4A5568;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #48BB78;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  & > img {
    width: 100%;
    height: 100%;
  }
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Username = styled.div`
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
`;

// one time animation
const wave = keyframes`
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
`;

export const WavingHand = styled(MdWavingHand)`
  animation: ${wave} 2.5s;
  animation-iteration-count: 1
  transform-origin: 70% 70%;
  display: inline-block;
  color: #ffcc00;
  font-size: 18px;
  margin: 0 5px;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding: 5px;
  
  &:focus {
    outline: none;
  }
`;

export const SidebarContent = styled.div`
  flex: 1;
  padding: 20px 0;
  overflow-y: auto;
`;

export const TitleContainer = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #4A5568;
  h2 span {
    font-size: 10px;
    opacity: 0.7;
    display: block;
  }
`;

