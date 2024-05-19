import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 32px;
  width: 100%;
  max-width: 250px;
  left: calc(50% - 250px / 2);
  pointer-events: none;
  z-index: 999;
  opacity: 0;
  background: #2a2c2f;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 16px 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  text-align: left;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  &.active {
    animation: on 0.3s ease forwards;
  }

  &.desactive {
    animation: off 0.2s ease forwards;
  }

  @keyframes on {
    from {
      opacity: 0;
      transform: translate3d(0px, -100%, 0px);
    }
    to {
      opacity: 1;
      transform: translate3d(0px, 0, 0px);
    }
  }

  @keyframes off {
    from {
      opacity: 1;
      transform: translate3d(0px, 0, 0px);
    }
    to {
      opacity: 0;
      transform: translate3d(0px, -100%, 0px);
    }
  }
`;
