import React from 'react';

import * as s from './styles';
import { errorMessages } from '@/constants/errorMessages';

const Error = ({ error }: { error: string }) => {
  return (
    <s.Container>
      {errorMessages[error as keyof typeof errorMessages] ?? error}
    </s.Container>
  );
};

export default Error;
