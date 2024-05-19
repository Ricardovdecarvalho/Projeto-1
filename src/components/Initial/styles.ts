'use client';

import styled from 'styled-components';

export const Container = styled.div`
  .content {
    h1 {
      color: var(--white);
      font-size: 2rem;
    }
  }

  #initial-banner {
    border-radius: 32px;
  }

  .initial-items {
    margin: 2rem 0;
    display: grid;
    grid-template-columns: repeat(4, minmax(150px, 1fr));
    gap: 1rem;

    @media screen and (max-width: 860px) {
      gap: 0.8rem;
      grid-template-columns: repeat(2, minmax(150px, 1fr));
    }

    li {
      display: grid;
      justify-content: center;
      gap: 0.5rem;
      border-radius: 1rem;
      height: 160px;

      padding: 1rem;
      background-color: #202024;

      &#recharge,
      &#status {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 0.8rem;

        text-align: center;

        background-color: var(--green);

        span {
          color: var(--white);

          &#status-message {
            text-transform: uppercase;
            font-weight: 700;
            font-size: 0.875rem;
            color: var(--white);
          }
        }
      }

      &#status.inactive {
        background-color: var(--red);
      }

      &#battery {
        display: grid;
        justify-items: center;
        text-align: center;

        img {
          max-width: 40px;
        }

        strong {
          color: var(--red);
          font-size: 0.875rem;
        }

        button {
          width: 100%;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }
      }

      &#lifetime {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        strong {
          font-size: 1.5rem;
          color: var(--green);
        }
      }

      &#remaing {
        text-align: center;
      }

      &#balance {
        padding: 1rem 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;

        #assertiveness {
          color: var(--white);
        }

        strong {
          font-size: 1.175rem;
          color: var(--green);
        }
      }

      &#win-loss {
        display: grid;
        grid-template-columns: 1fr 1fr;

        & > div {
          display: grid;
          align-content: center;
          text-align: center;
          gap: 0.25rem;

          strong {
            font-size: 1.5rem;
            &#wins {
              color: var(--green);
            }
            &#losses {
              color: var(--red);
            }
          }

          span {
            font-size: 0.875rem;
            font-weight: 700;
            text-transform: uppercase;
          }
        }
      }

      img {
        width: 50px;
      }

      span {
        color: var(--gray);

        &#time {
          text-transform: uppercase;
          font-weight: 700;
          font-size: 0.875rem;
        }
      }

      strong {
        font-size: 4rem;
        color: var(--white);
      }
    }
  }

  @media screen and (max-width: 660px) {
    gap: 1rem;
  }
`;

export const Recharge = styled.div`
  padding: 2rem;
  border-radius: 32px;
  background-color: #202024;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  grid-template-columns: 1fr 1fr;

  div {
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
  }

  div img {
    width: 50px;
    display: block;
    margin-bottom: 0.2rem;
  }

  div span {
    color: #a4a4a4;
  }

  #recharge strong {
    color: #ff6869;
    font-size: 1.375rem;
    &#experience {
      color: var(--green);
    }
  }

  #recharge button {
    display: block;
    margin-top: 0.5rem;
    border-radius: 32px;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    background-color: #8fd439;
    color: #2c2c2f;
    transition: 0.2s;
  }

  #recharge button:hover {
    box-shadow: 0px 4px 25px rgba(143, 212, 57, 0.15);
    color: #ffffff;
  }

  #license {
    .remaing {
      strong {
        margin: 1rem 0;
        font-size: 2rem;
        color: var(--white);
        padding: 1rem 2rem;
        border: 1px solid var(--green);
        border-radius: 5px;
      }
    }
  }

  #release {
    padding: 2rem 1rem;
    border-radius: 20px;
    text-align: center;
    color: #818181;
  }

  #release img {
    max-width: 50px;
  }

  #release strong {
    margin-top: 0.5rem;
    display: block;
    font-size: 0.875rem;
    text-transform: uppercase;
  }

  #release h2 {
    font-size: 1.3rem;
    font-weight: 700;
  }

  #release p {
    max-width: 30ch;
    font-size: 0.775rem;
  }

  @media screen and (max-width: 760px) {
    grid-template-columns: 1fr;

    #release {
      display: none;
    }
  }

  @media screen and (max-width: 660px) {
    #recharge button {
      padding: 0.8rem 1.5rem;
      font-size: 0.875rem;
    }
  }
`;

export const NavList = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    text-align: center;
  }

  ul li {
    height: 400px;
    max-width: 300px;
    background-color: #202024;
    padding: 2rem 1.25rem;
    border-radius: 20px;
    display: grid;
    align-items: center;
    justify-items: center;
  }

  ul li#classes {
    background: linear-gradient(var(--green) 10%, #0b131a 50%);
  }

  ul li#classes a {
    text-align: center;
    background-color: var(--green);
    border-color: var(--green);
    color: var(--pandaBlack);
  }

  ul li#classes img {
    border-radius: 0;
  }

  ul li#classes a:hover {
    color: #ffffff;
  }

  ul li#classes span {
    display: block;
    background-color: #659b23;
    color: #ffffff;
    font-weight: 700;
    padding: 0.3rem 1.2rem;
    font-size: 0.875rem;
    border-radius: 40px;
    margin-bottom: 1rem;
  }

  ul li#coming-soon {
    strong {
      font-size: 1.5rem;
    }

    img {
      opacity: 0.3;
      width: 80px;
    }
  }

  ul li > img {
    width: 100px;
    border-radius: 50%;
  }

  ul li > strong {
    display: block;
    color: #ffffff;
    margin: 0.8rem 0 1rem;
    font-size: 1.175rem;
  }

  ul li > p {
    line-height: 1.5;
    color: #818181;
    font-size: 1rem;
    text-align: center;
  }

  ul li > a {
    display: block;
    margin-top: 1.5rem;
    width: 100%;
    padding: 0.8rem 0;
    border-radius: 32px;
    transition: 0.2s;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;

    color: #ffffff;
    border: 2px solid #ffffff;
  }

  ul li > a:hover,
  ul li > a:focus {
    background-color: #ffffff;
    border: 2px solid #ffffff;
    color: #202024;
  }

  @media screen and (max-width: 660px) {
    h2 {
      font-size: 1.25rem;
    }

    ul {
      margin-top: 0.875rem;
    }
  }

  @media screen and (max-width: 530px) {
    ul {
      /* grid-template-columns: 1fr; */

      li {
        a {
          width: 100%;
          padding: 0.8rem;
          font-size: 1rem;
        }
      }
    }
  }
`;

type RemaingPercentProps = {
  percent: number;
};

export const RemaingPercent = styled.div<RemaingPercentProps>`
  margin-top: 1rem;
  width: 100%;
  height: 30px;
  background: linear-gradient(
    to right,
    var(--green) ${(props) => props.percent}%,
    transparent ${(props) => props.percent}%
  );
  border-radius: 1rem;
  border: 1px solid var(--white);
`;
