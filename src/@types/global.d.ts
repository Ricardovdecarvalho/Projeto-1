type StrategyItem = {
  strategy_name?: string | null;
  strategy_check: boolean;
  martingales: number;
  houses: number;
};

type CreateStrategy = {
  strategy_id?: number;
  name: string;
  payload: StrategyItem[];
  game: string;
};

type Strategy = {
  id: number;
  user_id: number;
  name: string;
  status: boolean;
  win: number;
  loss: number;
  import: boolean;
  description: string;
  strategies: StrategyItem[];
};

type DefaultStrategy = {
  name: string | null;
  strategy_name: string | null;
  strategy_count: number;
  strategy_check: boolean;
  martingales: number;
};

type AnyStrategy =
  | (Strategy & CreateStrategy & EditStrategy)
  | Strategy
  | CreateStrategy
  | EditStrategy
  | DefaultStrategy;

type User = {
  acess: number;
  balance: number;
  email: string;
  host: string;
  license: number;
  roulette: string;
  ticket: boolean;
  acess: number;
  lifetime: boolean;
  password: string;
  running: boolean;
  telegram: number;
  game: string;
};

type Config = {
  coin: number;
  stop_loss: number;
  stop_win: number;
  strategy_grouped: Strategy[];
  white_coin: number;
  white_protection: boolean;
  telegram: number;
};

type ConfigEdit = {
  stop_loss: number;
  stop_win: number;
  coin: number;
  roulette: string;
  white_protection: boolean;
  white_coin: number;
  telegram: number;
};

type ConfigCataloguer = {
  name: string;
  houses: number;
  martingales: number;
  reverse_strategy: boolean;
  strategy: string | Strategy[];
  coin: number;
  hour: number;
};

type CataloguerFilter = {
  name: string;
  houses: number;
  martingales: number;
  strategy: string;
  reverse_strategy: boolean;
  coin: number;
  hour: number;
};

type Cataloguer = {
  id?: string;
  history?: [[number, string, string][]];
  profit: number;
  cataloguer: Record<string, number>;
  porcent: Record<string, number>;
};

type UserInfo = {
  id: number;
  email: string;
  host: 'panda' | 'arbety';
  panda_email: string;
  license_key: number;
  lifetime: boolean;
  running: boolean;
};

type UserInfoPost = {
  name: string;
  data: {
    email: string;
    data: string;
    ip: string;
    'user-agent': string;
    device: string;
    fbp: '0000';
    fbc: '0001';
  };
};

type CreateUser = {
  email: string;
  password: string;
  host: 'panda';
  months: number;
  lifetime: boolean;
};
