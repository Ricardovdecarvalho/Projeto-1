import React, { useState } from 'react';

interface Types {
  email: {
    regex: RegExp;
    message: string;
  };
  number: {
    regex: RegExp;
    message: string;
  };
  strategyName: {
    regex: RegExp;
    message: string;
  };
  description: {
    regex: RegExp;
    message: string;
  };
}

const types: Types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um email válido'
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize números apenas.'
  },
  strategyName: {
    regex: /^.{1,20}$/,
    message: 'O nome deve ter no máximo 16 caracteres.'
  },
  description: {
    regex: /^[.,:\w\s]{1,250}$/,
    message: 'Não utilize caracteres especiais.'
  }
};

const useForm = (type?: keyof Types | false, initialValue?: string) => {
  const [value, setValue] = useState<string>(initialValue ? initialValue : '');
  const [error, setError] = useState<string | null>(null);

  function validate(value: string) {
    if (type === false) return true;
    if (value.length === 0) {
      setError('Preencha um valor.');
      return false;
    } else if (type && types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  function insertValue(value: string) {
    setValue(value);
  }

  function clear() {
    setValue('');
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
    clear,
    insertValue
  };
};

export default useForm;
