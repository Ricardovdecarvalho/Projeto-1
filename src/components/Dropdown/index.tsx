'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import useClickOutside from '@/hooks/useClickOutside';
import ArrowDownIcon from 'public/icons/ArrowDown.svg';

import * as s from './styles';

type DropdownProps = {
  label: string;
  current: string;
  disabled?: boolean;
  options: string[] | number[];
  onChange: (option: string | number, index: number) => void;
};

const Dropdown = ({
  label,
  current,
  options,
  onChange,
  disabled
}: DropdownProps) => {
  const [active, setActive] = useState(false);
  const toggle = () => setActive(!active);

  const ref = useRef<HTMLUListElement | null>(null);
  useClickOutside(ref, () => setActive(false));

  return (
    <s.Container className={disabled ? 'disabled' : ''}>
      <span>{label}</span>
      <strong className={`${active ? 'active' : ''} dropdown`} onClick={toggle}>
        {current}
        <Image src={ArrowDownIcon} alt="Selecione" />
      </strong>
      <ul ref={ref} className={active ? 'active' : ''}>
        {options?.map(
          (option, index) =>
            option !== current && (
              <li
                key={index}
                onClick={() => {
                  onChange(option, index);
                  toggle();
                }}
              >
                {option}
              </li>
            )
        )}
      </ul>
    </s.Container>
  );
};

export default Dropdown;
