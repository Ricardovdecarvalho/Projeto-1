import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  margin-bottom: 1rem;

  label {
    display: block;
    font-size: 1rem;
    text-align: left;
    color: var(--white);

    &.tooltip {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      figure {
        padding: 0.2rem;
        border-radius: 222px;
        background-color: var(--gray-850);
      }
    }
  }

  .input {
    input,
    textarea {
      margin-top: 0.8rem;
      display: block;
      width: 100%;
      background-color: var(--pandaBlack);
      padding: 0.8rem 1rem;
      border-radius: 4px;
      color: var(--white);
      font-size: 1rem;
      outline: none;
      resize: none;

      transition: 0.2s;
    }

    textarea {
      border: none;
    }

    input:disabled,
    textarea:disabled {
      opacity: 0.7;
      &:hover,
      &:focus {
        box-shadow: none;
      }
    }

    input:hover,
    textarea:hover,
    input:focus,
    textarea:focus {
      box-shadow: 0px 0px 0px 1px var(--green);
    }
  }

  .PB-range-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 5px;
    background: #d5dbe1;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    cursor: pointer;
  }

  .PB-range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #8fd439;
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }

  .PB-range-slider::-webkit-slider-thumb:hover {
    box-shadow: 0px 0px 0px 8px rgba(143, 212, 57, 0.5);
    transition: 0.3s ease-in-out;
  }

  .PB-range-slider::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #8fd439;
    cursor: pointer;
  }

  .PB-range-slider-div {
    margin-top: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 6px;
    border: 2px solid #2c2c2f;
    box-shadow: 0px 1px 2px 0px #1f1e241f;
  }

  .PB-range-slidervalue {
    color: var(--white);
    font-weight: 600;
  }

  .PB-range-slider-div#disabled {
    opacity: 0.7 !important;
  }
`;

export const Error = styled.p`
  color: #df3636;
  margin-top: 0.5rem;
  text-align: left;
  font-size: 0.875rem;
`;

export const Handle = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;

  &.disabled .toggle-switch {
    pointer-events: none;
    opacity: 0.7;
  }

  input[name='check-input'] {
    display: none;
  }

  label {
    cursor: pointer;
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.4rem;

    span {
      padding: 0.1rem;
      border-radius: 22220px;
      background-color: var(--gray-850);
    }
  }

  .toggle-switch {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 50px;
    height: 30px;
    background-color: #818181;
    border-radius: 20px;
    cursor: pointer;
    transition-duration: 0.2s;
  }

  .toggle-switch::after {
    content: '';
    position: absolute;
    height: 11px;
    width: 11px;
    left: 5px;
    background-color: transparent;
    border-radius: 50%;
    transition-duration: 0.2s;
    box-shadow: 5px 2px 7px rgba(8, 8, 8, 0.26);
    border: 5px solid white;
  }

  input[name='check-input']:checked + .toggle-switch::after {
    transform: translateX(100%);
    transition-duration: 0.2s;
    background-color: white;
  }

  input[name='check-input']:checked + .toggle-switch {
    background-color: #8fd439;
    transition-duration: 0.2s;
  }
`;
