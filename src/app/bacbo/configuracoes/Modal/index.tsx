/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import * as s from './styles';
import Image from 'next/image';
import RemoveIcon from 'public/icons/Remove.svg';
import Input from '@/components/Input';
import useForm from '@/hooks/useForm';
import { useStrategy } from '@/contexts/StrategyContext';
import Error from '@/helpers/Error';
import Loading from '@/helpers/Loading';
import Counter from '@/components/Counter';

type ModalProps = {
  isActive?: boolean;
  onClose?: () => void;
  editObject: any;
};

const Modal = ({ isActive, onClose, editObject = null }: ModalProps) => {
  const name = useForm();
  const [readingSequence, setReadingSequence] = useState<number[]>([]);
  const [inputSequence, setInputSequence] = useState<number>(0);

  const {
    // data,
    error,
    loading,
    handleCreateStrategy,
    handleEditStrategy
    // handleRemoveStrategy,
    // fetchLibrary
  } = useStrategy();

  const sequence: { [key: string]: number } = {
    p: 1,
    b: 2,
    t: 3
  };

  const [martigales, setMartigales] = useState(0);

  const handleButtonClick = (color: string, type: string) => {
    const valueToAdd = sequence[color];

    if (type === 'read') {
      setReadingSequence([...readingSequence, valueToAdd]);
    } else if (type === 'input') {
      setInputSequence(valueToAdd);
    }
  };

  const clearSequences = () => {
    name.clear();
    setReadingSequence([]);
    setInputSequence(0);
  };

  const removeLastItem = (type: string) => {
    if (type === 'read') {
      setReadingSequence(readingSequence.slice(0, -1));
    } else if (type === 'input') {
      setInputSequence(0);
    }
  };

  async function createStrategy() {
    const payload = {
      name: name.value,
      description: '',
      payload: [
        {
          strategy_name: 'bacbo',
          houses: 0,
          reverse: false,
          martingales: martigales,
          strategy_check: false,
          sequential: readingSequence,
          buy: inputSequence
        }
      ],
      game: 'bacbo'
    };

    handleCreateStrategy(payload, () => {
      name.value = '';
      clearSequences();
      if (onClose) onClose();
    });
  }

  async function editStrategy() {
    const payload = {
      name: name.value,
      description: '',
      strategy_id: editObject.id,
      payload: [
        {
          strategy_name: 'bacbo',
          houses: 0,
          reverse: false,
          martingales: martigales,
          strategy_check: false,
          sequential: readingSequence,
          buy: inputSequence
        }
      ],
      game: 'bacbo'
    };

    handleEditStrategy(payload, 'bacbo', () => {
      name.value = '';
      clearSequences();
      if (onClose) onClose();
    });
  }

  useEffect(() => {
    if (editObject) {
      name.insertValue(editObject.name);
      setReadingSequence(editObject.strategies[0].sequential);
      setInputSequence(editObject.strategies[0].buy);
    }
    if (!isActive) {
      clearSequences();
    }
  }, [isActive]);

  return (
    <div className={`modal-container ${isActive ? 'active' : ''}`}>
      <s.Content className={`modal-content ${isActive ? 'active' : ''}`}>
        <s.Body>
          <div>
            <p>
              <Input id="name" label="Nome da estratégia" {...name} />
            </p>

            <header>
              <strong>Padrão de Leitura</strong>
              <p>Sequência que deve ser confirmada para realizar ordens.</p>
            </header>

            <nav>
              <ul>
                {readingSequence.map((color, index) => (
                  <li
                    id={
                      Object.keys(sequence).find(
                        (key) => sequence[key] === color
                      ) || ''
                    }
                    key={index}
                  >
                    {Object.keys(sequence).find(
                      (key) => sequence[key] === color
                    ) || ''}
                  </li>
                ))}
                <button id="remove" onClick={() => removeLastItem('read')}>
                  <Image src={RemoveIcon} alt="Remover" />
                </button>
              </ul>
            </nav>

            <article>
              <button id="b" onClick={() => handleButtonClick('b', 'read')}>
                B
              </button>
              <button id="t" onClick={() => handleButtonClick('t', 'read')}>
                T
              </button>
              <button id="p" onClick={() => handleButtonClick('p', 'read')}>
                P
              </button>
            </article>
          </div>

          <div>
            <header>
              <strong>Padrão de Entrada</strong>
              <p>Ordens que serão enviadas ao confirmar leitura.</p>
            </header>

            <nav>
              <ul>
                {inputSequence ? (
                  <li
                    id={
                      Object.keys(sequence).find(
                        (key) => sequence[key] === inputSequence
                      ) || ''
                    }
                  >
                    {Object.keys(sequence).find(
                      (key) => sequence[key] === inputSequence
                    ) || ''}
                  </li>
                ) : (
                  ''
                )}

                <button id="remove" onClick={() => removeLastItem('input')}>
                  <Image src={RemoveIcon} alt="Remover" />
                </button>
              </ul>
            </nav>

            <article>
              <button id="b" onClick={() => handleButtonClick('b', 'input')}>
                B
              </button>
              <button id="t" onClick={() => handleButtonClick('t', 'input')}>
                T
              </button>
              <button id="p" onClick={() => handleButtonClick('p', 'input')}>
                P
              </button>
            </article>
          </div>

          <Counter
            label="Martigales"
            value={martigales}
            setValue={setMartigales}
            min={0}
            max={99999}
          />
        </s.Body>
        <s.Handles>
          <button
            className="btn"
            onClick={editObject ? editStrategy : createStrategy}
            disabled={loading || name.value.length <= 0}
          >
            {loading ? <Loading /> : 'Salvar'}
          </button>
          <button
            className="btn"
            id="cancel"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
        </s.Handles>
        {error && <Error error={error} />}
      </s.Content>
    </div>
  );
};

export default Modal;
