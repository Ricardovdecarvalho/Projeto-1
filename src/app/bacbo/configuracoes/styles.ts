'use client';

import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  div > {
    h1 {
      color: var(--white);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.6rem;
      margin-bottom: 2rem;

      img {
        max-width: 28px;
      }
    }
  }

  input,
  textarea {
    background-color: var(--gray-black) !important;
  }

  @media screen and (max-width: 660px) {
    grid-template-columns: 1fr;

    div {
      h1 {
        margin-bottom: 1rem;
      }
      button {
        width: 100%;
      }
    }
  }
`;

export const StrategyList = styled.ul`
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    font-size: 1rem;
    color: var(--white);
    transition: 0.2s;

    background-color: var(--gray-black);

    &:hover,
    &:focus {
      color: var(--green);
      background-color: var(--gray-850);
    }

    &:active,
    &.active {
      color: var(--white);
      background-color: var(--green);
    }

    &:disabled {
      opacity: 0.7;
      pointer-events: none;
    }
  }
`;

export const LibraryList = styled.div`
  display: grid;
  align-content: start;
  gap: 1.4rem;
  height: calc(100vh - 200px);
  padding: 1rem 1.25rem 2rem 0;
  overflow-y: auto;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    position: relative;

    &.active {
      border-color: var(--green);
    }

    span {
      color: var(--white);
      overflow-wrap: break-word;
      word-wrap: break-word;
      -ms-word-break: break-all;
      word-break: break-word;
      -ms-hyphens: auto;
      -moz-hyphens: auto;
      -webkit-hyphens: auto;
      hyphens: auto;
    }

    & > #handles {
      display: flex;
      align-items: center;
      gap: 1rem;

      .imported {
        text-transform: uppercase;
        padding: 0.5rem;
        border-radius: 5px;
        font-size: 0.775rem;
        background-color: var(--pandaLightGray);
        position: absolute;
        top: -16px;
        left: 16px;
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 5px;
        transition: 0.2s;

        img {
          max-width: 20px;
        }

        &:hover {
          background-color: var(--pandaLightGray);
        }

        &:active {
          transform: scale(0.95);
        }
      }
    }
  }

  p {
    color: #dddddd;
  }
`;

export const Handles = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  button {
    width: 100%;
  }
`;
