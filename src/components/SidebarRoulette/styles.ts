import styled from 'styled-components';

export const Container = styled.aside`
  grid-column: 1;
  grid-row: span 3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ContainerForm = styled.div`
  background-color: #202024;
  padding: 2rem 1.5rem;
  border-radius: 20px;
  box-sizing: border-box;
  position: relative;

  & form label {
    color: #a4a4a4 !important;
  }

  & form > .save-changes {
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
    animation: showScale 0.2s ease;

    &:hover {
      box-shadow: 0px 2px 25px rgba(143, 212, 57, 0.2);
      color: #ffffff;
    }

    &:active {
      transform: scale(0.98);
    }
  }

  @media screen and (max-width: 860px) {
    grid-row: 1;
  }

  @media screen and (max-width: 500px) {
    padding: 1.5rem;
  }
`;

export const Title = styled.div`
  text-align: center;
  display: grid;
  gap: 0.15rem;
  margin-bottom: 1.5rem;

  strong {
    font-size: 1rem;
    color: #ffffff;
  }

  span {
    color: #818181;
    font-size: 0.875rem;
  }

  @media screen and (max-width: 500px) {
    margin-bottom: 1rem;
  }
`;

export const InputList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const Input = styled.div`
  display: grid;
  gap: 0.25rem;
  color: #a4a4a4;
  font-size: 0.875rem;
  margin-bottom: 1rem;

  .r-input-value {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem;
    background-color: #2c2c2f;
    border-radius: 5px;
    padding: 0.5rem;
  }

  .r-input-value label {
    display: block;
    padding-right: 1rem;
  }

  .r-input-value input {
    background-color: transparent;
    width: 100%;
    outline: none;
    color: var(--white);
    font-size: 1rem;

    &:disabled {
      opacity: 0.7;
    }
  }

  @media screen and (max-width: 500px) {
    .r-input-value label {
      padding-right: 0.875rem;
    }
  }
`;

export const ContainerGame = styled.aside`
  grid-column: 1;
  background-color: #202024;
  padding: 1rem 1.5rem;
  border-radius: 20px;
  box-sizing: border-box;
  position: relative;

  @media screen and (max-width: 860px) {
    grid-row: 1;
  }

  & > .edit {
    position: absolute;
    top: 8px;
    right: 12px;
    padding: 0.8rem;
    border-radius: 8px;
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--red);
    width: 30px;
    height: 30px;

    img {
      max-width: 17px;
    }

    &:hover {
      background-color: #ff0d52;
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;
