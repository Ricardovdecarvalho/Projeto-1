/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FormEvent, useEffect, useState } from 'react';

import { useStrategy } from '@/contexts/StrategyContext';
import { CHANGE_GAME, CONFIG_EDIT } from '@/server/api';
import { useUser } from '@/contexts/UserContext';
import { roulettes, bacboRoulettes } from '@/constants/roulettes';
import Error from '@/helpers/Error';
import Image from 'next/image';

import EditIcon from 'public/icons/Edit.svg';
import CloseIcon from 'public/icons/sidebar/Close.svg';
import { useGlobal } from '@/contexts/GlobalContext';
import Input from '../Input';
import { formatCurrency } from '@/helpers/formatCurrency';
import Dropdown from '../Dropdown';
import { checkUserAuthenticated } from '@/helpers/checkUserAuthenticated';

import * as s from './styles';

type SidebarRouletteProps = {
  activeBot: boolean | null;
  config: Config | null;
  setConfig: React.Dispatch<React.SetStateAction<Config | null>>;
  game: string;
  setGame: React.Dispatch<React.SetStateAction<string>>;
};

const gameLabel = {
  Roleta: 'roulette',
  BacBo: 'bacbo',
  Mines: 'mines'
};

const gameRoulettes = {
  roulette: roulettes,
  bacbo: bacboRoulettes,
  mines: []
};

const SidebarRoulette = ({
  activeBot,
  config,
  setConfig,
  game,
  setGame
}: SidebarRouletteProps) => {
  const [currentRoulettes, setCurrentRoulettes] = useState(
    gameRoulettes[
      gameLabel[game as keyof typeof gameLabel] as keyof typeof gameRoulettes
    ]
  );

  useEffect(() => {
    setCurrentRoulettes(
      gameRoulettes[
        gameLabel[game as keyof typeof gameLabel] as keyof typeof gameRoulettes
      ]
    );
  }, [game]);

  const { showAdvice } = useGlobal();

  // Estratégias
  const { data, loading, handleActiveStrategy, fetchLibrary } = useStrategy();
  // Usuário [roleta]
  const user = useUser();

  // Fichas dropdown
  const [currentValue, setCurrentValue] = useState<number>(
    roulettes.all?.chipStack[0]
  );

  // Estratégias dropdown
  const [currentStrategy, setCurrentStrategy] = useState<Strategy | null>(null);

  function handleStrategy(strategyId: number) {
    if (config)
      setCurrentStrategy(
        config.strategy_grouped.filter(
          ({ id }: { id: number }) => id === strategyId
        )[0]
      );
  }

  // Roletas dropdown
  const [currentRoulette, setCurrentRoulette] = useState('');

  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    if (user.data?.message.user_status.running) setIsEditing(false);
  }, [user]);

  // Se o bot ativar, desativa a edição
  useEffect(() => {
    if (activeBot) setIsEditing(false);
  }, [activeBot]);

  // Seta as configurações salvas quando entrar na página
  useEffect(() => {
    if (data && user.data) {
      setConfig({
        ...data.message,
        telegram: user.data.message.user_status.telegram
      });

      setCurrentRoulette(user.data.message.user_status.roulette);

      setCurrentStrategy(
        data.message.strategy_grouped.filter(
          ({ status }: { status: boolean }) => status
        )[0]
      );
    }
  }, [data, isEditing, user]);

  // Setando valor de entrada de acordo com a chipStack da roleta selecionada
  useEffect(() => {
    if (config && config.coin) {
      const hasValueAtRollete = (
        currentRoulettes[
          currentRoulette as keyof typeof currentRoulettes
        ] as any
      )?.chipStack.filter((n: any) => n === currentValue).length
        ? true
        : false;

      if (!hasValueAtRollete) {
        setCurrentValue(
          (
            currentRoulettes[
              currentRoulette as keyof typeof currentRoulettes
            ] as any
          )?.chipStack[0]
        );
      } else {
        setCurrentValue(config.coin);
      }
    }
  }, [config, currentRoulette]);

  // Editar configurações
  function handleChange(key: string, value: string | number | boolean | null) {
    if (config) {
      setConfig({ ...config, [key]: value });
    } else {
      if (data) {
        setConfig(data.message);
        handleChange(key, value);
      }
    }
  }

  // Salvar alterações
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  async function handleSaveChanges(event: FormEvent) {
    event.preventDefault();
    const token = checkUserAuthenticated();
    if (!config || !token || loading) return;

    if (!currentStrategy) {
      showAdvice('Selecione uma estratégia', 'error');
      return;
    }

    try {
      setSaveLoading(true);
      setSaveError(null);

      const { url, options } = CONFIG_EDIT(token, {
        stop_loss: config.stop_loss,
        stop_win: config.stop_win,
        coin: currentValue,
        roulette: currentRoulette,
        white_protection: config.white_protection,
        white_coin: config.white_coin,
        telegram: config.telegram ? config.telegram : 0
      });

      const response = await fetch(url, options);
      const json = await response.json();
      if (!response.ok) throw `${json.message}`;

      if (currentStrategy) handleActiveStrategy(currentStrategy, 'roulette');
      showAdvice('Alterações salvas!', 'success');
      setIsEditing(false);
      user.getLogin();
    } catch (error) {
      if (error && typeof error === 'string') {
        setSaveError(error);
        if (error === 'Signature has expired') {
          user.refreshAccessToken();
        }
      }
      showAdvice('Erro ao alterar.', 'error');
    } finally {
      setSaveLoading(false);
    }
  }

  // Troca de game
  const [gameLoading, setGameLoading] = useState(false);
  async function handleChangeGame(game: string) {
    setGame(game);
    const token = checkUserAuthenticated();
    if (!token) return;
    try {
      setGameLoading(true);

      const { url, options } = CHANGE_GAME(
        token,
        gameLabel[game as keyof typeof gameLabel]
      );

      const response = await fetch(url, options);
      const json = await response.json();
      if (!response.ok) throw `${json.message}`;
      showAdvice('Jogo alterado!', 'success');
      user.getUser(token);
    } catch (error) {
      if (error && typeof error === 'string') {
        if (error === 'Signature has expired') {
          user.refreshAccessToken();
        }
      }
      showAdvice('Erro ao alterar.', 'error');
    } finally {
      setGameLoading(false);
    }
  }

  useEffect(() => {
    const currentGame = Object.keys(gameLabel)
      .find(
        (key) =>
          gameLabel[key as keyof typeof gameLabel] ===
          user.data?.message.user_status.game
      )
      ?.toString();
    if (user.data && currentGame) setGame(currentGame);
  }, [user.data]);

  useEffect(() => {
    setCurrentValue(
      (
        currentRoulettes[
          currentRoulette as keyof typeof currentRoulettes
        ] as any
      )?.chipStack[0]
    );
  }, [currentRoulettes, currentRoulette]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (game) {
      timeoutId = setTimeout(
        () => fetchLibrary(gameLabel[game as keyof typeof gameLabel]),
        300
      );
    }
    return () => clearTimeout(timeoutId);
  }, [game]);

  return (
    <s.Container>
      <s.ContainerGame>
        <Dropdown
          label="Jogo"
          current={game ?? 'Selecione'}
          options={['Roleta', 'BacBo']} //, 'Mines']}
          onChange={(value) => {
            handleChangeGame(value.toString());
          }}
          disabled={!isEditing}
        />

        <button
          className="edit"
          disabled={user.data?.message.user_status.running}
          onClick={() => {
            if (!activeBot) {
              setIsEditing(!isEditing);
            } else {
              showAdvice('Não é possível editar com o bot ligado.', 'error');
            }
          }}
        >
          {isEditing ? (
            <Image src={CloseIcon} alt="" />
          ) : (
            <Image src={EditIcon} alt="" />
          )}
        </button>
      </s.ContainerGame>
      {!gameLoading && (
        <s.ContainerForm>
          <s.Title>
            <strong>Tecnologia Milionária</strong>
            <span>Comanda de operações</span>
          </s.Title>
          <form onSubmit={handleSaveChanges}>
            <Dropdown
              label={game === 'Roleta' ? game : 'Mesas'}
              current={
                (
                  currentRoulettes[
                    currentRoulette as keyof typeof currentRoulettes
                  ] as any
                )?.name ?? 'Selecione'
              }
              options={Object.entries(currentRoulettes).map(
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                ([_, value]) => value.name
              )}
              onChange={(_, index) => {
                setCurrentRoulette(Object.keys(currentRoulettes)[index]);
              }}
              disabled={!isEditing}
            />

            <Dropdown
              label="Valor de entrada"
              current={
                formatCurrency(currentValue)
                  ? formatCurrency(currentValue)
                  : 'Selecione o valor'
              }
              options={(
                currentRoulettes[
                  currentRoulette as keyof typeof currentRoulettes
                ] as any
              )?.chipStack.map((item: any) => formatCurrency(item))}
              onChange={(value) => {
                setCurrentValue(Number(formatCurrency(value, true)));
                handleChange('coin', Number(formatCurrency(value, true)));
              }}
              disabled={!isEditing}
            />

            <s.InputList>
              <s.Input>
                <label htmlFor="loss">Stop Loss</label>
                <div className="r-input-value">
                  <span>R$</span>
                  {isEditing ? (
                    <input
                      type="number"
                      min={1}
                      pattern="\d*"
                      id="loss"
                      required
                      value={config?.stop_loss}
                      onChange={({ target }) =>
                        handleChange('stop_loss', Number(target.value))
                      }
                    />
                  ) : (
                    <input
                      type="number"
                      min={1}
                      pattern="\d*"
                      id="loss"
                      required
                      value={config?.stop_loss}
                      disabled
                    />
                  )}
                </div>
              </s.Input>

              <s.Input>
                <label htmlFor="gain">Stop Gain</label>
                <div className="r-input-value">
                  <span>R$</span>
                  {isEditing ? (
                    <input
                      type="number"
                      min={1}
                      pattern="\d*"
                      id="gain"
                      required
                      value={config?.stop_win}
                      onChange={({ target }) =>
                        handleChange('stop_win', Number(target.value))
                      }
                    />
                  ) : (
                    <input
                      type="number"
                      min={1}
                      pattern="\d*"
                      id="gain"
                      required
                      value={config?.stop_win}
                      disabled
                    />
                  )}
                </div>
              </s.Input>
            </s.InputList>

            {config?.strategy_grouped && (
              <Dropdown
                label="Estratégia"
                current={currentStrategy ? currentStrategy.name : 'Selecione'}
                options={config?.strategy_grouped.map(({ name }) => name)}
                onChange={(_, index) => {
                  handleStrategy(config?.strategy_grouped[index].id);
                }}
                disabled={!isEditing}
              />
            )}

            <Input
              disabled={!isEditing}
              type="number"
              id="telegram"
              tooltip="Você deve colocar seu ID do Telegram nesse campo, e sempre que o bot fizer alguma entrada, você será notificado via Telegram também."
              label="Telegram"
              placeholder="ID de usuário (opcional)"
              value={config?.telegram === 0 ? '' : config?.telegram}
              onChange={({ target }) => {
                handleChange('telegram', target.value);
              }}
            />

            {saveError && <Error error={saveError} />}
            {isEditing && (
              <button className="save-changes">
                {saveLoading ? 'Carregando...' : 'Salvar alterações'}
              </button>
            )}
          </form>
        </s.ContainerForm>
      )}
    </s.Container>
  );
};

export default SidebarRoulette;
