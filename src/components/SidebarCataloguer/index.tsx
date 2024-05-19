'use client';

import React, { useEffect, useState } from 'react';

import { CATALOGUER } from '@/server/api';
import { cataloguerRoulettes } from '@/constants/cataloguerRoulettes';
import Error from '@/helpers/Error';

import { useGlobal } from '@/contexts/GlobalContext';

import Input from '../Input';
import Counter from '../Counter';

import { formatCurrency } from '@/helpers/formatCurrency';
import Dropdown from '../Dropdown';
import { strategyIds } from '@/constants/strategyIds';

import * as s from './styles';
import { checkUserAuthenticated } from '@/helpers/checkUserAuthenticated';
import { useUser } from '@/contexts/UserContext';

type SidebarCataloguerProps = {
  setCataloguer: React.Dispatch<React.SetStateAction<Cataloguer | null>>;
};

const SidebarCataloguer = ({ setCataloguer }: SidebarCataloguerProps) => {
  const { showAdvice } = useGlobal();
  const { refreshAccessToken } = useUser();

  // Configurações reativas
  const [config, setConfig] = useState({
    name: 'PorROU0000000001',
    houses: 1,
    martingales: 0,
    reverse_strategy: false,
    coin: 0.5,
    hour: 1
  });

  // Fichas dropdown
  const [currentValue, setCurrentValue] = useState<number | string>(0.5);

  // Roletas dropdown
  const [currentRoulette, setCurrentRoulette] = useState('PorROU0000000001');

  // Nome da estratégia
  const [strategy, setStrategy] = useState<string>('Colunas');

  // Editar configurações
  function handleChange(key: string, value: string | number | boolean | null) {
    setConfig({ ...config, [key]: value });
  }

  // Setando valor de entrada de acordo com a chipStack da roleta selecionada
  useEffect(() => {
    if (config && config.coin) {
      const hasValueAtRollete = cataloguerRoulettes[
        currentRoulette as keyof typeof cataloguerRoulettes
      ]?.chipStack.filter((n) => n === currentValue).length
        ? true
        : false;

      if (!hasValueAtRollete) {
        setCurrentValue(
          cataloguerRoulettes[
            currentRoulette as keyof typeof cataloguerRoulettes
          ]?.chipStack[0]
        );
      } else {
        setCurrentValue(config.coin);
      }
    }
  }, [config, currentRoulette]);

  // Cataloguar
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  async function handleCatalog() {
    const token = checkUserAuthenticated();
    if (!config || !token) return;

    if (!config.hour) {
      showAdvice('Escolha um período', 'error');
      return;
    }

    try {
      setSaveLoading(true);
      setSaveError(null);

      const { url, options } = CATALOGUER(token, {
        name: currentRoulette,
        houses: config.houses,
        martingales: config.martingales,
        strategy: strategyIds[strategy],
        reverse_strategy: false,
        coin: Number(config.coin),
        hour: config.hour ? Number(config.hour) : 1
      });

      const response = await fetch(url, options);
      const json = await response.json();
      if (!response.ok) throw `Error: ${json.message}`;
      setCataloguer(json.data);
    } catch (error) {
      if (error) {
        setSaveError(`${error}`);
        if (error === 'Signature has expired') {
          refreshAccessToken();
        }
      }
      showAdvice('Erro ao alterar.', 'error');
    } finally {
      setSaveLoading(false);
    }
  }

  return (
    <s.Container>
      <s.Title>
        <strong>Tecnolgia Milionária</strong>
        <span>Comanda de operações</span>
      </s.Title>

      <Dropdown
        label="Roleta"
        current={
          cataloguerRoulettes[
            currentRoulette as keyof typeof cataloguerRoulettes
          ].name ?? 'Selecione'
        }
        options={Object.entries(cataloguerRoulettes).map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_, value]) => value.name
        )}
        onChange={(_, index) => {
          setCurrentRoulette(Object.keys(cataloguerRoulettes)[index]);
        }}
      />

      <Dropdown
        label="Valor de entrada"
        current={formatCurrency(Number(currentValue))}
        options={cataloguerRoulettes[
          currentRoulette as keyof typeof cataloguerRoulettes
        ].chipStack.map((item) => formatCurrency(item))}
        onChange={(value) => {
          setCurrentValue(Number(formatCurrency(value, true)));
          handleChange('coin', Number(formatCurrency(value, true)));
        }}
      />

      <Dropdown
        label="Estratégia"
        current={strategy}
        options={Object.keys(strategyIds).map((name) => name)}
        onChange={(value) => setStrategy(value.toString())}
      />

      <Input
        id="houses"
        type="range"
        label="Quantidade de casas"
        min={1}
        max={15}
        value={config?.houses}
        onChange={({ target }) => handleChange('houses', Number(target.value))}
      />

      <Counter
        label="Martigales"
        value={config?.martingales}
        setValue={(newValue) => handleChange('martingales', newValue)}
        min={0}
        max={99999}
      />

      <s.SimulatorPeriod>
        <strong>Período Simulador</strong>
        <div className="period-list">
          <ul>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <li key={n}>
                <input
                  type="radio"
                  id={`${n}h`}
                  checked={config.hour === Number(n)}
                  value={n}
                  onChange={({ target }) => {
                    handleChange('hour', Number(target.value));
                  }}
                />
                <label htmlFor={`${n}h`}>{n}h</label>
              </li>
            ))}
          </ul>
        </div>
      </s.SimulatorPeriod>

      {saveError && <Error error={saveError} />}
      <button className="save-changes" onClick={handleCatalog}>
        {saveLoading ? 'Carregando...' : 'Catalogar'}
      </button>
    </s.Container>
  );
};

export default SidebarCataloguer;
