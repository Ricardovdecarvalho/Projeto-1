/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGlobal } from '@/contexts/GlobalContext';
import { useUser } from '@/contexts/UserContext';
import { checkUserAuthenticated } from '@/helpers/checkUserAuthenticated';
import { useState, useEffect } from 'react';

type Host = {
  history: number[];
  name: string;
  price: number;
  host: 'arbety' | 'panda';
  id: string;
  timestamp: number;
};

type SocketState = {
  goal: number | null;
  profit: number | null;
  losses: number | null;
  wins: number | null;
  dataChart: [number, string][] | null;
  dataMines: any;
  balance: number;
  activeBot: boolean | null;
  panda: Host[] | null;
  arbety: Host[] | null;
};

function useSocket(onDataReceived?: (data: SocketState) => void) {
  const { getLogin } = useUser();
  const { showAdvice } = useGlobal();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<SocketState>({
    goal: null,
    profit: null,
    losses: null,
    wins: null,
    dataChart: null,
    dataMines: null,
    balance: 0,
    activeBot: null,
    panda: [],
    arbety: []
  });

  useEffect(() => {
    const token = checkUserAuthenticated();
    if (!token) return;

    const socket = new WebSocket(
      `wss://api.tecmilionaria.com/socket?EVOSESSIONID=${token}`
    );

    socket.addEventListener('message', (event) => {
      const socketData = JSON.parse(event.data);

      switch (socketData.type) {
        case 'log_start_client':
          showAdvice('Bot ativado.', 'success');

          setState((prev) => ({ ...prev, activeBot: true }));
          setLoading(false);
          break;
        case 'log_stop_client':
          setState((prev) => ({ ...prev, activeBot: false }));
          setLoading(false);
          break;
        case 'log_profit':
          setState((prev) => ({
            ...prev,
            goal: socketData.profit,
            profit: socketData.profit_porcent
          }));
          break;
        case 'log_results':
          setState((prev) => ({
            ...prev,
            losses: socketData.loss,
            wins: socketData.win
          }));
          break;
        case 'log_history_balance':
          setState((prev) => ({ ...prev, dataChart: socketData.data }));
          break;
        case 'log_balance':
          setState((prev) => ({ ...prev, balance: socketData.balance }));
          break;
        case 'log':
          setState((prev) => ({ ...prev, activeBot: false }));
          if (typeof onDataReceived === 'function') {
            onDataReceived(socketData);
          }
          if (socketData.message === 'Stop losing hit') {
            showAdvice('Seu stop loss foi atingido!', 'success');
            getLogin();
            break;
          } else if (socketData.message === 'Stop winning hit') {
            showAdvice('Seu stop gain foi atingido!', 'success');
            getLogin();
            break;
          } else {
            break;
          }
        case 'log_grid':
          setState((prev) => ({
            ...prev,
            dataMines: socketData.data.map((row: any) =>
              row.map((cell: any) => {
                if (cell === '') return 0;
                if (cell === 'b') return 2;
                if (cell === 'p') return 1;
                return 0;
              })
            )
          }));
          break;
        case 'history':
          if (
            socketData.data.host === 'panda' ||
            socketData.data.host === 'arbety'
          ) {
            const newData = socketData.data;
            setState((prev) => {
              if (!prev) return prev;

              if (socketData.data.host === 'panda') {
                const pandaData = prev.panda ? [...prev.panda] : [];
                const index = pandaData.findIndex(
                  (item) => item.name === newData.name
                );
                if (index !== -1) {
                  pandaData[index] = newData;
                } else {
                  pandaData.unshift(newData);
                }
                return { ...prev, panda: pandaData, arbety: prev.arbety };
              } else if (socketData.data.host === 'arbety') {
                const arbetyData = prev.arbety ? [...prev.arbety] : [];
                const index = arbetyData.findIndex(
                  (item) => item.name === newData.name
                );
                if (index !== -1) {
                  arbetyData[index] = newData;
                } else {
                  arbetyData.unshift(newData);
                }
                return { ...prev, panda: prev.panda, arbety: arbetyData };
              }
              return prev;
            });
          }
          break;
        default:
          break;
      }
    });

    return () => {
      socket.close();
    };
  }, [onDataReceived]);

  return { ...state, loading, setLoading };
}

export default useSocket;
