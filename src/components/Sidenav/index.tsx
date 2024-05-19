'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import Image from 'next/image';
import NavLink from '../NavLink/NavLink';
import useClickOutside from '@/hooks/useClickOutside';

import Logo from 'public/images/logo.png';
import DashboardIcon from 'public/icons/sidebar/Dashboard.svg';
import SettingsIcon from 'public/icons/sidebar/Settings.svg';
import RobotIcon from 'public/icons/sidebar/Robot.svg';
import DiceIcon from 'public/icons/sidebar/Dice.svg';
import RouletteIcon from 'public/icons/sidebar/Roulette.svg';
import CataloguerIcon from 'public/icons/sidebar/Cataloguer.svg';
import RankingIcon from 'public/icons/sidebar/Ranking.svg';
import LogoutIcon from 'public/icons/sidebar/Logout.svg';
import MenuIcon from 'public/icons/sidebar/Menu.svg';
import UserIcon from 'public/icons/sidebar/User.svg';
import MinesIcon from 'public/icons/sidebar/Mines.svg';
import TelegramIcon from 'public/icons/sidebar/Telegram.svg';
import CloseIcon from 'public/icons/sidebar/Close.svg';
import ArrowDownIcon from 'public/icons/ArrowDown.svg';

import * as s from './styles';

const Sidenav = () => {
  const { userLogout, isAdmin } = useUser();

  const [sidebar, setSidebar] = useState(false);
  const [subListActive, setSubListActive] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSidebar = () => setSidebar(!sidebar);
  const toggleSubList = (name: string) => {
    setSubListActive((prevState) => ({
      ...prevState,
      [name]: !prevState[name]
    }));
  };

  const sidenavRef = useRef<HTMLElement | null>(null);

  useClickOutside(sidenavRef, () => {
    setSidebar(false);
  });

  const pathname = usePathname();

  useEffect(() => {
    setSidebar(false);
  }, [pathname]);

  if (pathname === '/') return null;
  else
    return (
      <>
        <s.Aside ref={sidenavRef} className={sidebar ? 'active' : ''}>
          {sidebar ? (
            <s.ToggleButton onClick={toggleSidebar}>
              <Image src={CloseIcon} alt="Fechar Menu" />
            </s.ToggleButton>
          ) : (
            <s.ToggleButton onClick={toggleSidebar}>
              <Image src={MenuIcon} alt="Abrir Menu" />
            </s.ToggleButton>
          )}

          <s.Navhead className={sidebar ? 'active' : ''}>
            <NavLink href="/dashboard">
              <Image src={Logo} alt="Panda Bet" />
            </NavLink>
            <h2>
              <Image src={DashboardIcon} alt="Dashboard" />
              Dashboard
            </h2>
          </s.Navhead>

          <s.Navigation className={sidebar ? 'active' : ''}>
            <ul>
              {isAdmin && (
                <li>
                  <NavLink
                    href="/administracao"
                    className="tooltip"
                    ariaLabel="Administração"
                  >
                    <Image src={UserIcon} alt="Administração" /> Administração
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  href="/bot"
                  className="tooltip"
                  ariaLabel="Bot Automático"
                >
                  <Image src={RobotIcon} alt="Bot Automático" /> Bot Automático
                </NavLink>
              </li>

              <li>
                <li>
                  <button
                    className={`tooltip ${
                      subListActive['botBacBo'] ? 'active' : ''
                    }`}
                    onClick={() => toggleSubList('botBacBo')}
                  >
                    <Image src={DiceIcon} alt="Bot BacBo" /> Bot BacBo
                    <Image src={ArrowDownIcon} alt="Selecione" />
                  </button>
                </li>
                <s.SubList
                  className={subListActive['botBacBo'] ? 'active' : ''}
                >
                  {/* <li>
                        <NavLink
                          href="/bacbo/bot"
                          className="tooltip"
                          ariaLabel="Bot Automático"
                        >
                          <Image src={RobotIcon} alt="Bot Automático" /> Bot
                          Automático
                        </NavLink>
                      </li> */}
                  {/* <li>
                    <NavLink
                      href="/bacbo/ranking"
                      className="tooltip"
                      ariaLabel="Ranking"
                    >
                      <Image src={RankingIcon} alt="Ranking" /> Ranking
                    </NavLink>
                  </li> */}
                  <li>
                    <NavLink
                      href="/bacbo/configuracoes"
                      className="tooltip"
                      ariaLabel="Configurações"
                    >
                      <Image src={SettingsIcon} alt="Configurações" />
                      Configurações
                    </NavLink>
                  </li>
                </s.SubList>
              </li>

              <li>
                <li>
                  <button
                    className={`tooltip ${
                      subListActive['botRoleta'] ? 'active' : ''
                    }`}
                    onClick={() => toggleSubList('botRoleta')}
                  >
                    <Image src={RouletteIcon} alt="Bot Roleta" /> Bot Roleta{' '}
                    <Image src={ArrowDownIcon} alt="Selecione" />
                  </button>
                </li>
                <s.SubList
                  className={subListActive['botRoleta'] ? 'active' : ''}
                >
                  {/* <li>
                    <NavLink
                      href="/roleta/bot"
                      className="tooltip"
                      ariaLabel="Bot Automático"
                    >
                      <Image src={RobotIcon} alt="Bot Automático" /> Bot
                      Automático
                    </NavLink>
                  </li> */}

                  <li>
                    <NavLink
                      href="/roleta/catalogador"
                      className="tooltip"
                      ariaLabel="Catalogador"
                    >
                      <Image src={CataloguerIcon} alt="Catalogador" />{' '}
                      Catalogador
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      href="/roleta/ranking"
                      className="tooltip"
                      ariaLabel="Ranking"
                    >
                      <Image src={RankingIcon} alt="Ranking" /> Ranking
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      href="/roleta/configuracoes"
                      className="tooltip"
                      ariaLabel="Configurações"
                    >
                      <Image src={SettingsIcon} alt="Configurações" />
                      Configurações
                    </NavLink>
                  </li>
                </s.SubList>
              </li>

              <li>
                <li>
                  <button
                    className={`tooltip ${
                      subListActive['botMines'] ? 'active' : ''
                    }`}
                    onClick={() => toggleSubList('botMines')}
                  >
                    <Image src={MinesIcon} alt="Bot Mines" /> Bot Mines
                    <Image src={ArrowDownIcon} alt="Selecione" />
                  </button>
                </li>
                <s.SubList
                  className={subListActive['botMines'] ? 'active' : ''}
                >
                  <li>
                    <NavLink
                      href="/mines/configuracoes"
                      className="tooltip"
                      ariaLabel="Configurações"
                    >
                      <Image src={SettingsIcon} alt="Configurações" />
                      Configurações
                    </NavLink>
                  </li>
                </s.SubList>
              </li>

              <li>
                <a
                  href="https://t.me/tecnologiamilionaria"
                  target="_blank"
                  rel="noreferrer"
                  id="telegram"
                  className="tooltip"
                  aria-label="Telegram"
                >
                  <Image src={TelegramIcon} alt="Telegram" />
                  Telegram
                </a>
              </li>

              <li id="logout">
                <span
                  onClick={userLogout}
                  className="tooltip"
                  aria-label="Deslogar"
                >
                  <Image src={LogoutIcon} alt="Deslogar" /> Deslogar
                </span>
              </li>
            </ul>
          </s.Navigation>
        </s.Aside>
      </>
    );
};

export default Sidenav;
