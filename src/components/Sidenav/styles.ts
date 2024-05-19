import styled from 'styled-components';

export const Aside = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  height: 100vh;
  max-width: 330px;
  background-color: var(--gray-black);
  border-right: 2px solid var(--pandaLightGray);
  z-index: 9;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;

  padding: 2rem 0.5rem;

  transform: translate3d(calc(-100% + 70px), 0px, 0px);
  transition: 0.2s;

  &.active {
    transform: translate3d(0px, 0px, 0px);
    padding: 2rem 1.25rem;
  }

  @media screen and (max-width: 660px) {
    & {
      transform: translate3d(-100%, 0px, 0px);
    }
  }
`;

export const ToggleButton = styled.button`
  position: absolute;
  top: 1rem;
  right: -50px;
  padding: 0.7rem;
  border-radius: 8px;
  transition: 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--pandaLightGray);
`;

export const Navhead = styled.header`
  padding-top: 6rem;

  &.active {
    padding-top: 0rem;
  }

  & > a {
    position: absolute;
    top: 4rem;
    right: 1rem;
    width: 40px;
  }

  & > a img {
    width: 40px;
    object-fit: contain;
  }

  &.active a {
    position: relative;
    width: auto;
    top: 0;
    right: 0;
    display: block;
    margin-bottom: 1rem;
  }

  &.active a img {
    width: auto;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 1rem;
    display: none;
    align-items: center;
    gap: 0.5rem;
    border-bottom: 2px solid var(--pandaLightGray);
    padding-bottom: 1rem;
  }

  &.active h2 {
    display: flex;
  }
`;

export const Navigation = styled.nav`
  height: 100%;
  overflow-y: auto;

  &.active {
    padding-right: 10px;
  }

  ul {
    display: grid;
    align-content: start;
    gap: 0.5rem;
    position: relative;
  }

  ul li#logout {
    /* position: absolute; */
    /* bottom: 0; */
    /* width: 100%; */
    align-self: end;
  }
  /* 
  ul li:first-child {
    padding-top: 1rem;
  } */

  ul li a,
  ul li button,
  ul li span {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    border-radius: 8px;
    color: #ffffff;
    opacity: 0.5;
    font-weight: 400;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.8rem 1rem;
    width: 100%;

    img {
      width: 20px;
      height: 20px;
      transition: 0.3s ease;
    }
  }

  &.active ul li a,
  &.active ul li button,
  &.active ul li span {
    gap: 0.8rem;
    text-indent: 0px;
  }

  &.active ul li button {
    display: grid;
    grid-template-columns: 20px 1fr 10px;
    text-align: left;
    width: 100%;
    height: initial;

    img:last-child {
      display: initial;
    }
  }

  &.active ul li button.active img:last-child {
    transform: rotate(180deg);
  }

  &:not(.active) ul li button {
    text-indent: -1000px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    padding: 0;
    transform: translate3d(30px, 0px, 0px);
    white-space: nowrap;

    img:first-child {
      width: 20px;
      grid-column: 1 / -1;
    }
    img:last-child {
      display: none;
    }
  }

  ul li a#telegram {
    background: #1c92d2;
    background: linear-gradient(to right, #1c92d2, #81e5f9);
    opacity: 1;

    &:hover {
      background: #1c92d2;
    }
  }

  ul li,
  ul li#logout {
    width: auto;
    overflow: hidden;
    text-indent: -1000px;
    justify-self: end;
  }

  &.active ul li#logout {
    width: 100%;
  }

  ul li a,
  ul li button,
  ul li span {
    gap: 0;
  }

  &.active ul li {
    width: 100%;
  }

  ul li a:hover,
  ul li button:hover,
  ul li button.active,
  ul li span:hover {
    opacity: 1;
    background-color: #2c2c2f;
  }

  ul li a:active,
  ul li a.active,
  ul li span:active {
    opacity: 1;
    background-color: #8fd439;
  }

  @media screen and (max-width: 660px) {
    ul li#logout {
      bottom: 3.5rem;
    }
  }
`;

export const SubList = styled.ul`
  margin-left: 1rem;
  padding-left: 10px;
  border-left: 2px solid var(--pandaLightGray);
  transition: 0.5s ease;
  max-height: 0;

  &.active {
    margin-top: 0.5rem;
    max-height: 20rem;
  }
`;
