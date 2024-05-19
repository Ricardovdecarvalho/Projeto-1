'use client';

import React from 'react';

import AddIcon from 'public/icons/AddButton.svg';
import RemoveIcon from 'public/icons/RemoveButton.svg';
import Image from 'next/image';

import * as s from './styles';

type CounterProps = {
  label: string;
  value: number;
  setValue: (newValue: number) => void;
  min: number;
  max: number;
  disabled?: boolean;
};

const Counter = ({
  label,
  value,
  setValue,
  min,
  max,
  disabled
}: CounterProps) => {
  return (
    <s.Container>
      <span>{label}</span>
      <s.Content className={disabled ? 'disabled' : ''}>
        <button onClick={() => (value < max ? setValue(value + 1) : null)}>
          <Image src={AddIcon} alt="Incrementar" />
        </button>
        {value}
        <button onClick={() => (value > min ? setValue(value - 1) : null)}>
          <Image src={RemoveIcon} alt="Decrementar" />
        </button>
      </s.Content>
    </s.Container>
  );
};

export default Counter;
