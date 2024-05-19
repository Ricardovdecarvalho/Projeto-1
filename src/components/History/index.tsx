'use client';

import React from 'react';

import { HISTORY_GET } from '@/server/api';
import Error from '@/helpers/Error';
import Loading from '@/helpers/Loading';
import RedCoinIcon from '../../../public/icons/RedCoin.svg';
import GreenCoinIcon from '../../../public/icons/GreenCoin.svg';
import WarningIcon from '../../../public/icons/advice/Warning.svg';
import Image from 'next/image';
import { formatCurrency } from '@/helpers/formatCurrency';
import { checkUserAuthenticated } from '@/helpers/checkUserAuthenticated';

import * as s from './styles';
import { useUser } from '@/contexts/UserContext';

type History = {
  id: number;
  hour: string;
  martingale: string;
  profit: number;
  result: 'loss' | 'win';
  roulette_name: string;
  strategy_name: string;
  strategy: string;
  timestamp: number;
};

type HistoryData = {
  message: {
    history: History[];
  };
};

const History = () => {
  const [data, setData] = React.useState<HistoryData | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { refreshAccessToken } = useUser();

  React.useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setData(null);
      try {
        const token = checkUserAuthenticated();
        if (!token) return;
        const { url, options } = HISTORY_GET(token);
        const response = await fetch(url, options);
        const json = (await response.json()) as HistoryData;
        if (!response.ok) throw `Error: ${json.message}`;
        setData(json);
      } catch (error) {
        if (typeof error === 'string') {
          setError(error);
          if (error === 'Signature has expired') {
            refreshAccessToken();
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const idRef: { [key: string]: string } = {
    strategy_red: 'Vermelho',
    strategy_black: 'Preto',
    strategy_even: 'Par',
    strategy_odd: 'Ímpar',
    strategy_max: 'Máximo',
    strategy_min: 'Mínimo',
    strategy_dozen_based_1: 'Dúzias',
    strategy_dozen_based_2: 'Dúzias',
    strategy_dozen_based_3: 'Dúzias',
    strategy_column_based_1: 'Colunas',
    strategy_column_based_2: 'Colunas',
    strategy_column_based_3: 'Colunas'
  };

  if (error)
    return (
      <div className="content">
        <Error error={error} />
      </div>
    );
  return (
    <s.Container style={{ height: '350px' }}>
      {loading && <Loading />}
      <s.HistoryList>
        {data && data.message.history.length <= 0 && (
          <p>Sem histórico disponível.</p>
        )}
        {data?.message.history.map(
          ({
            id,
            roulette_name,
            strategy_name,
            result,
            hour,
            martingale,
            strategy,
            profit
          }) => (
            <s.HistoryItem key={id}>
              <div>
                <strong className="rollete">
                  {result === 'loss' && (
                    <Image src={RedCoinIcon} alt={roulette_name} />
                  )}
                  {result === 'win' && (
                    <Image src={GreenCoinIcon} alt={roulette_name} />
                  )}
                  {roulette_name}
                </strong>

                <div className="strategy-name">
                  <strong>Estratégia: </strong>
                  <span>{strategy_name}</span>
                </div>

                <div className="informations">
                  <div>
                    <span>Hora:</span>
                    <strong>{hour}</strong>
                  </div>

                  <div
                    className="tooltip"
                    aria-label="GO: Primeira entrada G-Número: Representa o número de tentativas feitas"
                  >
                    <span>Martingales:</span>
                    <strong>{martingale}</strong>

                    <div id="warning">
                      <Image src={WarningIcon} alt="" />
                    </div>
                  </div>

                  <div>
                    <span>Entrada:</span>
                    <strong>{idRef[strategy]}</strong>
                  </div>
                </div>
              </div>

              <div className="result" id={result}>
                <span>{formatCurrency(profit)}</span>
                <strong>{result}</strong>
              </div>
            </s.HistoryItem>
          )
        )}
      </s.HistoryList>
    </s.Container>
  );
};

export default History;
