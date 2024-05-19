'use client';

import NextIcon from 'public/icons/Next.svg';
import PrevIcon from 'public/icons/Prev.svg';
import styled from 'styled-components';

export const Container = styled.div``;

export const List = styled.div`
  position: relative;

  @media screen and (max-width: 1100px) {
    -webkit-mask-image: linear-gradient(
      90deg,
      #000 calc(100% - 30px),
      transparent
    );
  }

  .swiper {
    width: auto;
  }
`;

export const ListContent = styled.div`
  -webkit-mask-image: linear-gradient(
    -90deg,
    #000 calc(100% - 30px),
    transparent
  );

  &.first {
    -webkit-mask-image: none;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  strong {
    display: block;
    font-size: 20px;
    font-weight: 600;
  }
`;

export const SwiperHandles = styled.div`
  display: flex;
  gap: 14px;

  button {
    width: 45px;
    height: 45px;
    background-color: var(--gray-black);
    border-radius: 50%;
    transition: 0.2s ease;

    &:hover {
      background-color: var(--pandaLightGray);
    }

    &:active {
      background-color: var(--gray-850);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

export const PrevButton = styled.button`
  background: url(${PrevIcon.src}) no-repeat center center;
`;

export const NextButton = styled.button`
  background: url(${NextIcon.src}) no-repeat center center;
`;
