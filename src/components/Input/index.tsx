'use client';

import React from 'react';

import * as s from './styles';

import WarningIcon from '/public/icons/advice/Warning.svg';
import Image from 'next/image';

type InputProps = React.ComponentProps<'input'> & {
  id: string;
  label: string;
  value?: string | number;
  placeholder?: string;
  maxLength?: number;
  type?:
    | 'text'
    | 'password'
    | 'email'
    | 'range'
    | 'number'
    | 'checkbox'
    | 'textarea';
  rows?: number;
  onChange?: ({
    target
  }: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  error?: string | null;
  max?: number;
  min?: number;
  disabled?: boolean;
  tooltip?: string;
  checked?: boolean;
  required?: boolean;
};

const Input = ({
  id,
  label,
  value,
  maxLength,
  onChange,
  error,
  placeholder,
  onBlur,
  type,
  rows,
  max,
  min,
  disabled,
  tooltip,
  checked,
  required
}: InputProps) => {
  return (
    <s.Container>
      {type === 'checkbox' ? (
        <s.Handle className={disabled ? 'disabled' : ''}>
          <label
            htmlFor={id}
            className={tooltip ? 'tooltip bottom' : ''}
            aria-label={tooltip ? tooltip : ''}
          >
            {label}
            {tooltip && (
              <figure>
                <Image src={WarningIcon} alt={tooltip} />
              </figure>
            )}
          </label>
          <input
            type={type}
            id={id}
            checked={checked}
            onChange={onChange}
            name="check-input"
            disabled={disabled}
            required={required}
          />
          <label htmlFor={id} className="toggle-switch"></label>
        </s.Handle>
      ) : (
        <>
          <label
            htmlFor={id}
            className={tooltip ? 'tooltip bottom' : ''}
            aria-label={tooltip ? tooltip : ''}
          >
            {label}
            {tooltip && (
              <figure>
                <Image src={WarningIcon} alt={tooltip} />
              </figure>
            )}
          </label>
          <div
            className={type === 'range' ? 'PB-range-slider-div' : 'input'}
            id={disabled ? 'disabled' : ''}
          >
            {type === 'textarea' ? (
              <textarea
                id={id}
                value={value as string}
                rows={rows || 4}
                placeholder={placeholder}
                maxLength={maxLength}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
              />
            ) : (
              <input
                id={id}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                maxLength={maxLength}
                max={max}
                min={min}
                disabled={disabled}
                type={type ? type : 'text'}
                placeholder={placeholder}
                className={type === 'range' ? 'PB-range-slider' : ''}
                required={required}
              />
            )}
            {type === 'range' && (
              <p className="PB-range-slidervalue">{value}</p>
            )}
          </div>
          {error && <s.Error>{error}</s.Error>}
        </>
      )}
    </s.Container>
  );
};

export default Input;
