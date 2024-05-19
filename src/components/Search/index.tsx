import React from 'react';

import * as s from './styles';

type SearchProps = React.ComponentProps<'input'> & {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const Search = ({ value, setValue, ...props }: SearchProps) => {
  return (
    <s.Container>
      <input
        type="text"
        placeholder="Pesquisar..."
        value={value}
        onChange={({ target }) => setValue(target.value)}
        {...props}
      />
    </s.Container>
  );
};

export default Search;
