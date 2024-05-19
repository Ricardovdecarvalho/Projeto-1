'use client';

import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  margin-bottom: 1rem;

  &.disabled {
    strong {
      pointer-events: none;
      opacity: 0.7;
    }
  }

  span {
    color: #a4a4a4;
    display: block;
    margin-bottom: 0.5rem;
  }

  strong {
    margin: 0 !important;
    border-radius: 8px !important;
    background-color: #2c2c2f;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  strong > img {
    user-select: none;
    transition: 0.2s;
  }

  strong.active > img {
    transform: rotate(180deg);
  }

  ul {
    background-color: #2c2c2f;
    border: 2px solid #37373a;
    border-radius: 12px;
    width: 100%;
    max-height: 250px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
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
  }

  ul li,
  strong {
    padding: 0.5rem 1rem;
    color: #a4a4a4;
    border-radius: 10px;
    cursor: pointer;
    margin: 4px;
    transition: 0.2s;

    overflow-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-word;
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
  }

  ul li:hover,
  strong:hover,
  strong:focus,
  strong.active {
    background-color: #37373a;
    color: #ffffff;
  }

  ul li:active {
    background-color: #8fd439;
  }
`;
