import styled from 'styled-components';

import SearchIcon from 'public/icons/Search.svg';

export const Container = styled.div`
  input {
    padding: 0.7rem 0.7rem 0.7rem 3rem;
    font-size: 1rem;
    border-radius: 8px;
    width: 100%;
    background: transparent url(${SearchIcon.src}) no-repeat 1rem center;
    background-size: 20px;
    outline: none;
    border: 2px solid rgba(255, 255, 255, 0.4);
    transition: 0.2s;
    color: var(--white);
    opacity: 0.6;

    &:hover,
    &:focus {
      opacity: 1;
    }
  }
`;
