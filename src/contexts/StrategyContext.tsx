'use client';

import {
  ACTIVE_STRATEGY,
  CONFIG_GET,
  CREATE_STRATEGY,
  DELETE_STRATEGY,
  EDIT_STRATEGY
} from '@/server/api';
import { createContext, useContext, PropsWithChildren, useState } from 'react';
import { useGlobal } from './GlobalContext';
import { checkUserAuthenticated } from '@/helpers/checkUserAuthenticated';
import { useUser } from './UserContext';

type StrategyContext = {
  loading: boolean;
  error: string | null;
  data: { message: Config & ConfigCataloguer } | null;
  handleCreateStrategy: (
    strategy: CreateStrategy,
    callback?: () => void
  ) => void;
  handleEditStrategy: (
    strategy: CreateStrategy,
    game: string,
    callback?: () => void
  ) => void;
  handleRemoveStrategy: (strategy: Strategy, game: string) => void;
  handleActiveStrategy: (strategy: Strategy, game: string) => void;
  fetchLibrary: (game: string) => void;
};

const StrategyContext = createContext<StrategyContext | null>(null);

export const useStrategy = () => {
  const context = useContext(StrategyContext);
  if (context === null)
    throw new Error('strategyContext deve estar dentro do Provider');
  return context;
};

export const StrategyStorage = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<{
    message: Config & ConfigCataloguer;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showAdvice } = useGlobal();
  const { refreshAccessToken } = useUser();

  function isConfig(value: unknown): value is Config {
    if (value && typeof value === 'object' && 'coin' in value) {
      return true;
    } else return false;
  }

  async function fetchLibrary(game: string) {
    const token = checkUserAuthenticated();
    if (!token || loading) return;
    try {
      setLoading(true);
      setData(null);
      const { url, options } = CONFIG_GET(token, game);
      const response = await fetch(url, options);
      const json = await response.json();
      if (!response.ok) {
        if (json.message === 'Signature has expired') {
          refreshAccessToken();
        }
        throw new Error(`Error: ${response.status}`);
      }
      if (isConfig(json.message)) setData(json);
    } catch (error) {
      if (error && error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleFetch<T>(
    apiFunc: (
      token: string,
      data: T
    ) => {
      url: string;
      options: RequestInit;
    },
    data: T,
    errorMessage: string,
    successCallback?: () => void
  ) {
    const token = checkUserAuthenticated();
    if (!token || loading) return;

    try {
      setError(null);
      setLoading(true);

      const { url, options } = apiFunc(token, data);
      const response = await fetch(url, options);
      const json = await response.json();

      if (!response.ok) {
        if (json.message === 'Signature has expired') {
          refreshAccessToken();
        }
        throw new Error(errorMessage);
      }

      if (successCallback) {
        successCallback();
      }
    } catch (err) {
      if (err && err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateStrategy(
    strategy: CreateStrategy,
    callback?: () => void
  ) {
    handleFetch(CREATE_STRATEGY, strategy, 'Erro ao criar estratégia', () => {
      fetchLibrary(strategy.game);
      showAdvice('Estratégia criada!', 'success');
      if (callback) callback();
    });
  }

  async function handleEditStrategy(
    strategy: CreateStrategy,
    game: string,
    callback?: () => void
  ) {
    handleFetch(EDIT_STRATEGY, strategy, 'Erro ao editar estratégia', () => {
      fetchLibrary(game);
      showAdvice('Alterações salvas!', 'success');
      if (callback) callback();
    });
  }

  async function handleRemoveStrategy(strategy: Strategy, game: string) {
    handleFetch(
      DELETE_STRATEGY,
      { strategy_id: strategy.id },
      'Erro ao apagar estratégia',
      () => {
        fetchLibrary(game);
        showAdvice('Estratégia apagada!', 'success');
      }
    );
  }

  async function handleActiveStrategy(strategy: Strategy, game: string) {
    handleFetch(
      ACTIVE_STRATEGY,
      { strategy_id: strategy.id },
      'Erro ao ativar estratégia',
      () => fetchLibrary(game)
    );
  }

  return (
    <StrategyContext.Provider
      value={{
        loading,
        error,
        data,
        handleCreateStrategy,
        handleEditStrategy,
        handleRemoveStrategy,
        handleActiveStrategy,
        fetchLibrary
      }}
    >
      {children}
    </StrategyContext.Provider>
  );
};
