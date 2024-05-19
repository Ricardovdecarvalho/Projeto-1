'use client';

import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
`;

export const HistoryList = styled.div`
  display: grid;
  align-content: start;
  gap: 0.8rem;

  padding-right: 1.25rem;
  height: 350px;
  overflow-y: auto;

  p {
    color: var(--white);
  }

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #393b3e;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: var(--gray);
    border: 3px solid var(--gray);
  }
`;

export const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  background-color: var(--gray-black);
  padding: 1rem 0;
  gap: 1rem;

  & + & {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .rollete {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    color: var(--white);
    margin-bottom: 1rem;
  }

  .strategy-name {
    display: block;
    margin: 1rem 0;

    strong {
      font-size: 1rem;
      color: var(--gray);
      font-weight: 400;
    }

    span {
      color: var(--white);
    }
  }

  .informations {
    display: flex;
    gap: 1rem;

    & > div {
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.2rem;

      span {
        color: var(--gray);
      }
      strong {
        color: var(--white);
      }
    }
  }

  .tooltip #warning {
    margin-left: 0.2rem;
    padding: 0.1rem;
    border-radius: 2222px;
    background-color: var(--gray-850);
  }

  .result {
    span {
      display: block;
      margin-bottom: 0.8rem;
      font-size: 1rem;
      font-weight: 700;
      color: var(--white);
      text-align: center;
    }

    strong {
      width: 80px;
      text-align: center;
      display: block;
      padding: 0.7rem 1rem;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--white);
      border-radius: 12px;
    }

    &#loss {
      strong {
        background-color: var(--red);
      }
      span {
        color: var(--red);
      }
    }

    &#win {
      strong {
        background-color: var(--green);
      }
      span {
        color: var(--green);
      }
    }
  }

  @media screen and (max-width: 1035px) {
    .rollete {
      margin-bottom: 1.5rem;
    }

    .informations {
      display: grid;
      gap: 0.8rem;
    }

    .result {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        margin: 0;
      }
    }
  }
`;
