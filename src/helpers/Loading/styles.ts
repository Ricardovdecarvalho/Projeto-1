'use client';

import styled from 'styled-components';

export const Container = styled.aside`
  display: inline-block;
  position: relative;
  width: 70px;
  height: 20px;

  span {
    position: absolute;
    top: 5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  span:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  span:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  span:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  span:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;
