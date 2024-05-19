import { useGlobal } from '@/contexts/GlobalContext';
import Image from 'next/image';

import SuccessIcon from '../../../public/icons/advice/Success.svg';
import ErrorIcon from '../../../public/icons/advice/Error.svg';
import WarningIcon from '../../../public/icons/advice/Warning.svg';

import * as s from './styles';

const Advice = () => {
  const { advice, adviceBody } = useGlobal();

  if (!adviceBody) return null;
  else
    return (
      <s.Container className={advice ? 'active' : 'desactive'}>
        {adviceBody.feedback === 'success' ? (
          <Image src={SuccessIcon} alt="Sucesso" />
        ) : null}
        {adviceBody.feedback === 'error' ? (
          <Image src={ErrorIcon} alt="Erro" />
        ) : null}
        {adviceBody.feedback === 'warning' ? (
          <Image src={WarningIcon} alt="Aviso" />
        ) : null}
        {adviceBody.message}
      </s.Container>
    );
};

export default Advice;
