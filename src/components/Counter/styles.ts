'use client';

import styled from 'styled-components';

export const Container = styled.div`
  span {
    display: block;
    margin-bottom: 0.8rem;
    color: var(--white);
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1.5rem;
  align-items: center;
  border: 1px solid var(--pandaBorderGray);
  padding: 0.5rem;
  border-radius: 1rem;
  color: var(--white);

  &.disabled {
    opacity: 0.7;
    pointer-events: none;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    padding: 1rem;
    border-radius: 1rem;
    transition: 0.2s;

    &:hover {
      background-color: var(--green);
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;
