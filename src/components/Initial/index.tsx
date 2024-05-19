'use client';

import React, { useEffect, useState } from 'react';

import { GET_TICKET } from '@/server/api';
import { useGlobal } from '@/contexts/GlobalContext';
import { errorMessages } from '@/constants/errorMessages';
import { getRemaining } from '@/helpers/getRemaing';
import useSocket from '@/hooks/useSocket';
import Image from 'next/image';

// import Banner from 'public/banners/banner1.jpg';
import PlayIcon from 'public/icons/Play.svg';
// import FireIcon from 'public/icons/Fire.svg';
import WhiteRobotBetIcon from 'public/icons/WhiteRobotBet.svg';
import RobotBetIcon from 'public/icons/RobotBet.svg';
import RouletteIcon from 'public/icons/Roulette.svg';
// import DoubleGif from 'public/gif/double.gif';
// import CrashGif from 'public/gif/crash.gif';
// import MinesGif from 'public/gif/mines.gif';
import { useUser } from '@/contexts/UserContext';
import { formatCurrency } from '@/helpers/formatCurrency';
import { checkUserAuthenticated } from '@/helpers/checkUserAuthenticated';

import * as s from './styles';
import Slider from '../Slider';
import Link from 'next/link';

const Initial = () => {
  const { data, getLogin, refreshAccessToken } = useUser();
  const { showAdvice } = useGlobal();
  const socketState = useSocket();

  function getAssertiveness(wins: number, losses: number): number {
    if (wins + losses === 0) {
      return 0; // Para evitar divisão por zero
    }

    const assertiveness = (wins / (wins + losses)) * 100;
    return Number(assertiveness.toFixed(2));
  }

  const [loading, setLoading] = useState(false);
  async function handleGetTicket() {
    const token = checkUserAuthenticated();
    try {
      setLoading(true);
      if (!token) return;
      const { url, options } = GET_TICKET(token);
      const response = await fetch(url, options);
      const json = await response.json();
      if (!response.ok) throw `${json.message}`;
      location.reload();
    } catch (err) {
      if (typeof err === 'string')
        showAdvice(errorMessages[err as keyof typeof errorMessages], 'error');
      if (err === 'Signature has expired') {
        refreshAccessToken();
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getLogin();
  }, []);

  if (!data) return;
  else
    return (
      <s.Container>
        <section className="content">
          <h1>Seja bem vindo(a)!</h1>

          <ul className="initial-items">
            {!data?.message?.user_status?.running ? (
              <li id="status" className="inactive">
                <span>Status</span>
                <Image id="banner" src={WhiteRobotBetIcon} alt="Recarga" />
                <span id="status-message">Inativo</span>
              </li>
            ) : (
              <li id="status">
                <span>Status</span>
                <Image id="banner" src={WhiteRobotBetIcon} alt="Recarga" />
                <span id="status-message">Ativo</span>
              </li>
            )}

            {data?.message?.user_status?.lifetime && (
              <li id="lifetime">
                <span>Assinatura</span>
                <strong>VITALÍCIA</strong>
              </li>
            )}

            {!data?.message?.user_status?.lifetime && (
              <li id="balance">
                <span>Assertividade</span>
                <strong id="assertiveness">
                  {getAssertiveness(
                    Number(socketState.wins),
                    Number(socketState.losses)
                  )}
                  %
                </strong>
              </li>
            )}

            <li id="balance">
              <span>Saldo Atual</span>
              <strong>
                {formatCurrency(data?.message?.user_status?.balance)}
              </strong>
            </li>

            <li id="win-loss">
              <div>
                <strong id="wins">{socketState.wins}</strong>
                <span>Wins</span>
              </div>
              <div>
                <strong id="losses">{socketState.losses}</strong>
                <span>Losses</span>
              </div>
            </li>
          </ul>

          {/* <Image id="initial-banner" src={Banner} alt="Banner" /> */}

          {!data?.message?.user_status?.lifetime && (
            <s.Recharge>
              {!data?.message?.user_status?.lifetime &&
                data?.message?.user_status?.ticket &&
                getRemaining(data?.message.user_status.license).days <= 0 && (
                  <div id="recharge">
                    <Image id="banner" src={RobotBetIcon} alt="Recarga" />

                    <span>Faça sua primeira recarga</span>
                    <strong>Bateria estogata.</strong>
                    <button>Adicionar recarga</button>
                  </div>
                )}

              {!data?.message?.user_status?.lifetime &&
                !data?.message?.user_status?.ticket && (
                  <div id="recharge">
                    <Image id="banner" src={RobotBetIcon} alt="Recarga" />

                    <span>Experiência gratuita</span>
                    <strong id="experience">Experimente 7 dias grátis.</strong>
                    <button disabled={loading} onClick={handleGetTicket}>
                      {loading ? 'Adicionando recarga...' : 'Adicionar recarga'}
                    </button>
                  </div>
                )}

              {!data?.message?.user_status?.lifetime &&
                data?.message?.user_status?.ticket && (
                  <div id="recharge">
                    <Image id="banner" src={RobotBetIcon} alt="Recarga" />

                    <span>Você está em uma experiência gratuita</span>
                    <strong id="experience">
                      {getRemaining(data?.message.user_status.license).days}{' '}
                      {getRemaining(data?.message.user_status.license).days > 1
                        ? 'dias restantes'
                        : 'dia restante'}
                      .
                    </strong>
                    <span>
                      Previsão de término:{' '}
                      {getRemaining(data?.message.user_status.license).date}
                    </span>
                    <s.RemaingPercent
                      percent={
                        getRemaining(data?.message.user_status.license).percent
                      }
                    />
                  </div>
                )}

              {/* <div id="release">
              <Image src={FireIcon} alt="Fogo" />
              <strong>Recarregue para liberar</strong>
              <h2>R$ 44,97 OFF na próxima recarga!</h2>
              <p>
                Você ganha desconto sempre que recarregar antes do vencimento da
                sua última recarga.
              </p>
            </div> */}
            </s.Recharge>
          )}

          <s.NavList>
            <ul>
              <Slider title="Cursos">
                <li id="classes">
                  <Image src={RouletteIcon} alt="Vídeo Aulas" />
                  <strong>Bot da Roleta</strong>

                  <p>Aprenda a utilizar o seu bot da roleta.</p>

                  <Link href="/cursos/botroleta">Assistir aulas</Link>
                </li>
                <li id="coming-soon">
                  <strong>Em breve...</strong>

                  <Image src={PlayIcon} alt="Em breve..." />

                  <p>Material gratuito pra você começar na frente.</p>
                </li>

                <li id="coming-soon">
                  <strong>Em breve...</strong>

                  <Image src={PlayIcon} alt="Em breve..." />

                  <p>Material gratuito pra você começar na frente.</p>
                </li>
                <li id="coming-soon">
                  <strong>Em breve...</strong>

                  <Image src={PlayIcon} alt="Em breve..." />

                  <p>Material gratuito pra você começar na frente.</p>
                </li>
              </Slider>
            </ul>
          </s.NavList>
        </section>
      </s.Container>
    );
};

export default Initial;
