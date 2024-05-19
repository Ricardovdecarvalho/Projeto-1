import styled from 'styled-components';

export const Container = styled.aside`
  grid-column: 1;
  grid-row: span 3;
  background-color: #202024;
  padding: 2rem 1.5rem;
  border-radius: 20px;
  box-sizing: border-box;
  position: relative;

  & > .edit {
    position: absolute;
    top: 0.8rem;
    left: 0.8rem;
    padding: 0.8rem;
    border-radius: 12px;
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 20px;
    }

    &:hover {
      background-color: var(--gray-850);
    }
    &:active {
      transform: scale(0.95);
    }
  }

  & > .save-changes {
    margin-top: 1rem;
    width: 100%;
    font-size: 1rem;
    padding: 0.8rem 1rem;
    cursor: pointer;
    font-weight: 700;
    text-transform: uppercase;
    border-radius: 12px;
    transition: 0.2s ease;
    background-color: #8fd439;
    color: #2c2c2f;

    &:hover {
      box-shadow: 0px 2px 25px rgba(143, 212, 57, 0.2);
      color: #ffffff;
    }

    &:active {
      transform: scale(0.98);
    }
  }

  label,
  span,
  .editing span {
    color: #a4a4a4;
  }

  @media screen and (max-width: 860px) {
    grid-row: 1;
  }

  @media screen and (max-width: 500px) {
    padding: 1.5rem;
  }
`;

export const SimulatorPeriod = styled.div`
  margin-top: 1rem;

  strong {
    color: #a4a4a4;
    font-weight: 400;
    display: block;
    margin-bottom: 0.6rem;
  }

  .period-list {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    width: 100%;
  }

  @media screen and (max-width: 630px) {
    .period-list {
      width: 77vw;
    }
  }

  ul {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: flex-start;
    gap: 0.6rem;

    padding: 0.6rem 0 1.5rem;
  }

  ul li input {
    display: none;
  }

  ul li label {
    color: #818181;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    border: 2px solid #818181;
    transition: 0.2s;
    cursor: pointer;
    font-weight: 700;
  }

  ul li label:hover {
    color: #ffffff;
    border: 2px solid #ffffff;
  }

  ul li input:checked + label {
    background-color: var(--green);
    border: 2px solid var(--green);
    color: var(--white);
  }
`;

export const Title = styled.div`
  text-align: center;
  display: grid;
  gap: 0.15rem;
  margin-bottom: 1.5rem;

  strong {
    font-size: 1.25rem;
    color: #ffffff;
  }

  span {
    color: #818181;
    font-size: 0.875rem;
  }

  @media screen and (max-width: 500px) {
    margin-bottom: 1rem;

    strong {
      font-size: 1.2rem;
    }
  }
`;

export const InputList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;
