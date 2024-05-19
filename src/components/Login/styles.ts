'use client';

import Background from '/public/images/background.jpg';

import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr;
  height: 100vh;

  &::after {
    content: '';
    background: url(${Background.src}) no-repeat center center;
    background-size: cover;
  }

  @media screen and (max-width: 1030px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1.5fr 3fr;

    &::after {
      grid-row: 1;
    }
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(auto, 400px) 1fr;
  align-items: center;

  background-color: #202024;
  padding: 1.5rem;
  border-right: 2px solid #2c2c2f;

  .login-container {
    grid-column: 2;
  }

  @media screen and (max-width: 800px) {
    grid-row: 2;
    padding-top: 2rem;
    align-items: start;
  }

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .no-have {
    font-size: 0.945rem;
    text-align: center;
    margin: 1.25rem 0 0.5rem;
    color: var(--white);

    a {
      text-decoration: none;
      color: var(--green);

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const Button = styled.button`
  margin-top: 1rem;
  background-color: var(--green);
  border-radius: 5px;
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  font-weight: 700;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--pandaBlack);

  &:hover {
    color: var(--white);
  }

  &:active {
    transform: scale(0.98);
  }
`;
