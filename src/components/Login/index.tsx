'use client';

import { useEffect, FormEventHandler, FormEvent } from 'react';
import Image from 'next/image';
import Logo from '../../../public/images/logo.png';
import Input from '@/components/Input';
import useForm from '@/hooks/useForm';
import { useUser } from '@/contexts/UserContext';
import Error from '@/helpers/Error';
import Loading from '@/helpers/Loading';
import { useRouter } from 'next/navigation';

import * as s from './styles';
import { checkUserAuthenticated } from '@/helpers/checkUserAuthenticated';
import Link from 'next/link';

const Login = () => {
  const email = useForm('email');
  const password = useForm();
  const { userLogin, loading, error } = useUser();
  const { push } = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (email.validate() && password.validate()) {
      userLogin(email.value, password.value);
    } else return;
  };

  useEffect(() => {
    const token = checkUserAuthenticated();
    if (token) push('/dashboard');
  }, []);

  return (
    <s.Container>
      <title>Tecnologia Milionária | Login</title>
      <s.Content>
        <div className="login-container">
          <h1>
            <Image src={Logo} alt="Panda Bet" />
          </h1>

          <form onSubmit={handleSubmit}>
            <Input id="email" type="text" label="E-mail" {...email} />
            <Input id="password" type="password" label="Senha" {...password} />
            {error && <Error error={error} />}
            <s.Button>{loading ? <Loading /> : 'Entrar'}</s.Button>
          </form>
          <p className="no-have">
            <Link href="/cursos/botroleta">Acesse os cursos</Link>
          </p>
        </div>
      </s.Content>
    </s.Container>
  );
};

export default Login;
