import styled from 'styled-components';

export const LoadingWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 18px;
  style {
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
`;

export const Animation  = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid white;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
`;
