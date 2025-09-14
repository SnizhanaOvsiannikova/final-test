
import styled from 'styled-components';

interface TitleProps {
	color?: string;
}

export const root = `
  max-width: 1280px;
`;

export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: radial-gradient(circle, #1b1266,  #122266, transparent);
  padding: 10px;
`;

export const Title = styled.h2<TitleProps>`
  color: ${props => props.color || '#000'};
  font-size: 17px;
  margin: 0 0 16px 0;
`;

