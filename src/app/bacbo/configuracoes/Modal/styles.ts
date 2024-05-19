'use client';

import styled from 'styled-components';

export const Content = styled.div`
  h1 {
    margin-bottom: 1rem;
    text-align: center;
  }
`;

export const Body = styled.div`
  display: grid;
  gap: 1rem;

  div {
    header {
      display: grid;
      gap: 0.25rem;
      margin-bottom: 1rem;

      strong {
        font-size: 1.25rem;
        font-weight: 600;
      }

      p {
        font-size: 0.875rem;
        color: var(--pandaTextGray);
        font-weight: 400;
      }
    }

    & > p {
      margin-bottom: 1rem;
    }

    nav {
      background-color: rgba(0, 0, 0, 0.25);
      padding: 8px;
      border-radius: 8px;
      margin-bottom: 1rem;
      overflow-x: hidden;
      max-width: 350px;
      min-width: 10px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      -ms-overflow-style: -ms-autohiding-scrollbar;

      @media screen and (max-width: 430px) {
        max-width: calc(100vw - 90px);
      }

      ul {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(20px, 1fr));
        grid-auto-flow: column;
        align-items: center;
        justify-content: start;
        flex-wrap: nowrap;
        gap: 0.5rem;
        user-select: none;

        li {
          flex: 0 0 20px;
          width: 20px;
          height: 20px;
          border-radius: 4px;
          text-align: center;
          text-transform: uppercase;
          font-size: 0.875rem;
          line-height: 20px;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.7);
          overflow: hidden;
          transition: 0.2s ease;

          &#t {
            background-color: #f9e897;
          }
          &#b {
            background-color: #a94438;
          }
          &#p {
            background-color: #3468c0;
          }
        }

        button {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(255, 255, 255, 0.1);
          transition: 0.2s ease;
          width: 25px;
          height: 25px;
          border-radius: 4px;
          user-select: none;
        }

        button:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
    }

    article {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      button {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        overflow: hidden;
        transition: 0.2s ease;

        text-align: center;
        text-transform: uppercase;
        font-size: 0.875rem;
        line-height: 20px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.7);

        user-select: none;

        &:hover,
        &:focus {
          box-shadow:
            0 0 0 2px #202024,
            0 0 0 4px white;
        }

        &:active {
          transform: scale(0.95);
        }

        &#t {
          background-color: #f9e897;
        }
        &#b {
          background-color: #a94438;
        }
        &#p {
          background-color: #3468c0;
        }
      }
    }
  }
`;

export const Handles = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    width: 100%;
  }
`;
