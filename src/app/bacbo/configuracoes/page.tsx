/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from './Modal';
import { usePathname } from 'next/navigation';

import StrategyIcon from 'public/icons/Strategy.svg';
import GridIcon from 'public/icons/Grid.svg';

import TrashIcon from 'public/icons/Trash.svg';
import EditIcon from 'public/icons/Edit.svg';

import * as s from './styles';
import Loading from '@/helpers/Loading';
import { useStrategy } from '@/contexts/StrategyContext';

const Settings = () => {
  const { data, loading, handleRemoveStrategy, fetchLibrary } = useStrategy();
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const toggleModal = () => setActiveModal(!activeModal);

  const pathname = usePathname();
  const [editObject, setEditObject] = useState<any>(null);

  function handleEdit(item: Strategy) {
    setEditObject(item);
    setActiveModal(true);
  }

  useEffect(() => {
    fetchLibrary('bacbo');
  }, [pathname]);

  return (
    <>
      <title>Tecnologia Milionária | Configurações</title>
      <s.Container className="content">
        <div>
          <h1>
            <Image src={StrategyIcon} alt="Estratégias" /> Estratégias
          </h1>
          <button
            className="btn"
            onClick={() => {
              setEditObject(null);
              toggleModal();
            }}
          >
            Criar nova estratégia
          </button>
        </div>

        <div>
          <h1>
            <Image src={GridIcon} alt="Biblioteca" /> Biblioteca
          </h1>

          <s.LibraryList>
            {loading && <Loading />}
            {!loading &&
              data?.message.strategy_grouped
                ?.slice()
                .reverse()
                .map((item) => (
                  <li key={item.id}>
                    <span>{item.name}</span>
                    <div id="handles">
                      <button onClick={() => handleEdit(item)}>
                        <Image src={EditIcon} alt="Editar" />
                      </button>
                      <button
                        onClick={() => {
                          handleRemoveStrategy(item, 'bacbo');
                        }}
                      >
                        <Image src={TrashIcon} alt="Apagar" />
                      </button>
                    </div>
                  </li>
                ))}

            {!loading && data?.message.strategy_grouped.length === 0 && (
              <p>Nenhuma estratégia criada.</p>
            )}
          </s.LibraryList>
        </div>
      </s.Container>

      <Modal
        isActive={activeModal}
        onClose={toggleModal}
        editObject={editObject}
        // onSave={(data: StrategyItem | null) => {
        //   if (data !== null) {
        //     setStrategies((prev) => ({
        //       ...prev,
        //       [activeIdRef as keyof typeof strategies]: data
        //     }));
        //   } else {
        //     removeStrategy(activeIdRef);
        //   }
        //   closeModal();
        // }}
      />
    </>
  );
};

export default Settings;
