'use client';

import styled from 'styled-components';

export const Content = styled.div`
  figure {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 160px;
    }
  }

  h2 {
    margin: 2rem 0 1rem;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 400;
    color: #a4a4a4;

    span {
      color: var(--green);
    }
  }

  button {
    display: block;
    margin-top: 2rem;
    width: 100%;
  }
`;

export const Logout = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 2rem;
  right: 2rem;
  background-color: var(--gray-850);
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: var(--pandaLightGray);
  }

  &:active {
    transform: scale(0.98);
  }
`;
