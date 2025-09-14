import styled from 'styled-components';

export const ElementsSection = styled.div`
  position: relative;
`;

export const ConnectionLine = styled.div`
  position: absolute;
  left: 24px;
  top: 0;
  width: 2px;
  background: rgba(255, 255, 255, 0.3);
  height: 100%;
  z-index: 1;
`;

export const ElementItem = styled.div<{ $level: number }>`
  position: relative;
`;

export const ElementCard = styled.div`
  padding: 10px 30px 0px;
  color: white;
`;

export const ElementHeader = styled.div`
  display: flex;
  align-items: center;
`;

// Element title with expand icon
export const ElementTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  
  .expand-icon {
    cursor: pointer;
    transition: transform 0.2s ease;
  }
`;

export const ElementActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ChildrenContainer = styled.div<{ $isExpanded: boolean }>`
  max-height: ${({ $isExpanded }) => $isExpanded ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  margin-top: ${({ $isExpanded }) => $isExpanded ? '12px' : '0'};
`;

export const MaxDepthIndicator = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
  margin-left: 8px;
`;

export const NoNestingText = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  font-style: italic;
`;

