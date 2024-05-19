import * as s from './styles';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import PandaBetIcon from 'public/icons/PandaBet.svg';
import LogoutIcon from 'public/icons/sidebar/Logout.svg';
import Input from '../Input';
import useForm from '@/hooks/useForm';
import { PANDA_LOGIN, USER_INFO_POST } from '@/server/api';
import Error from '@/helpers/Error';
import Loading from '@/helpers/Loading';
import { useUser } from '@/contexts/UserContext';
import { checkUserAuthenticated } from '@/helpers/checkUserAuthenticated';
import detectDeviceType from '@/helpers/detectDeviceType';

const LoginPanda = () => {
  const { data, login, userLogout, refreshAccessToken } = useUser();
  const email = useForm('email');
  const password = useForm();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [ip, setIp] = useState('');

  useEffect(() => {
    async function fetchIp() {
      try {
        const API_URL = 'https://api.ipify.org/?format=json';
        const response = await fetch(API_URL);
        const json = await response.json();
        setIp(json.ip || '');
      } catch (err) {
        setIp('');
      }
    }

    fetchIp();
  }, []);

  async function setUserInfo(email: string) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

    const deviceType = detectDeviceType();

    const userObj: UserInfoPost = {
      name: 'registered_user',
      data: {
        email,
        ip,
        'user-agent': window.navigator.userAgent,
        data: formattedDate,
        device: deviceType,
        fbp: '0000',
        fbc: '0001'
      }
    };

    const { url, options } = USER_INFO_POST(userObj);
    const response = await fetch(url, options);
    if (response.ok) location.reload();
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const token = checkUserAuthenticated();
    if (email.validate() && password.validate() && token) {
      try {
        setLoading(true);
        setError(null);
        const { url, options } = PANDA_LOGIN(token, {
          email: email.value,
          password: password.value
        });
        const response = await fetch(url, options);
        const json = await response.json();
        if (!response.ok) throw `${json.message}`;
        setUserInfo(email.value);
      } catch (err) {
        if (err && typeof err === 'string') {
          setError(err);
          if (err === 'Signature has expired') {
            refreshAccessToken();
          }
        }
      } finally {
        setLoading(false);
      }
    } else return;
  };

  if (
    login &&
    data &&
    !data.message.user_status?.email.length &&
    !data.message.user_status?.password.length
  )
    return (
      <div className="modal-container active">
        <s.Logout onClick={userLogout}>
          <Image src={LogoutIcon} alt="Deslogar" />
        </s.Logout>

        <s.Content className="modal-content active">
          <figure>
            <Image src={PandaBetIcon} alt="Panda Bet" />
          </figure>
          <h2>
            Entre na sua conta da <span>pandabet.io</span> para continuar
          </h2>
          <form onSubmit={handleSubmit}>
            <Input id="email" type="email" label="E-mail" {...email} />
            <Input id="password" type="password" label="Senha" {...password} />
            {error && <Error error={error} />}
            <button className="btn">{loading ? <Loading /> : 'Entrar'}</button>
          </form>
        </s.Content>
      </div>
    );
};

export default LoginPanda;
