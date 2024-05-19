// export const API_URL = 'https://api.sandbox.tecmilionaria.com';
export const API_URL = 'https://api.tecmilionaria.com';
export const API_PIXEL_URL =
  'https://register.tecmilionaria.com/registered_user';

type Login = {
  email: string;
  password: string;
};

export function USER_LOGIN(body: Login) {
  return {
    url: API_URL + '/login',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  };
}

export function USER_GET(token: string) {
  return {
    url: API_URL + '/user',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  };
}

export function USERS_GET(token: string) {
  return {
    url: API_URL + '/users',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  };
}

export function USER_GET_BY_EMAIL(token: string, email: string) {
  return {
    url: API_URL + `/user_by_email/${email}`,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  };
}

export function CREATE_USER(token: string, body: CreateUser) {
  return {
    url: API_URL + '/create',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    }
  };
}

export function USER_RESET(token: string, body: { email: string }) {
  return {
    url: API_URL + '/reset_account',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    }
  };
}

export function USER_CONFIGS(token: string, body: { user_id: number }) {
  return {
    url: API_URL + '/get_user_config',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    }
  };
}

export function DELETE_USER(token: string, body: { user_id: number }) {
  return {
    url: API_URL + '/delet',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    }
  };
}

export function USER_INFO_POST(body: UserInfoPost) {
  return {
    url: API_PIXEL_URL,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  };
}

export function INCREASE_LICENSE(
  token: string,
  body: { user_id: number; month: number }
) {
  return {
    url: API_URL + '/license',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    }
  };
}

export function REFRESH_TOKEN(token: string) {
  return {
    url: API_URL + '/refresh',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  };
}

export function CONFIG_GET(token: string, game: string) {
  return {
    url: API_URL + `/config/${game}`,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  };
}

export function CONFIG_EDIT(token: string, body: ConfigEdit) {
  return {
    url: API_URL + '/config_stop',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    }
  };
}

export function CREATE_STRATEGY(token: string, body: CreateStrategy) {
  return {
    url: API_URL + '/create_strategy',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    }
  };
}

export function EDIT_STRATEGY(token: string, body: CreateStrategy) {
  return {
    url: API_URL + '/edit_strategy',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    }
  };
}

export function RESET_STRATEGY(token: string, body: { strategy_id: number }) {
  return {
    url: API_URL + '/reset_strategy',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    }
  };
}

export function DELETE_STRATEGY(token: string, body: { strategy_id: number }) {
  return {
    url: API_URL + '/delet_strategy',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    }
  };
}

export function ACTIVE_STRATEGY(token: string, body: { strategy_id: number }) {
  return {
    url: API_URL + '/active',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    }
  };
}

export function IMPORT_STRATEGY(token: string, body: { strategy_id: number }) {
  return {
    url: API_URL + '/import_strategy',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    }
  };
}

export function START_ROULETTE_BOT(token: string) {
  return {
    url: API_URL + '/roulette/start',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }
  };
}
export function START_BOT(token: string, game: string) {
  return {
    url: API_URL + `/${game}/start`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }
  };
}

export function START_BACBO_BOT(token: string) {
  return {
    url: API_URL + '/bacbo/start',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }
  };
}

export function STOP_ROULETTE_BOT(token: string) {
  return {
    url: API_URL + '/roulette/stop',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }
  };
}

export function STOP_BOT(token: string, game: string) {
  return {
    url: API_URL + `/${game}/stop`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }
  };
}

export function STOP_BACBO_BOT(token: string) {
  return {
    url: API_URL + '/bacbo/stop',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }
  };
}

export function RANKING_GET(token: string) {
  return {
    url: API_URL + '/best_strategy',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  };
}

export function HISTORY_GET(token: string) {
  return {
    url: API_URL + '/history',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  };
}

export function CATALOGUER(token: string, body: CataloguerFilter) {
  return {
    url: 'https://api.catalogador.tecnologiamilionaria.com/cataloguer',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    }
  };
}

export function PANDA_LOGIN(token: string, body: Login) {
  return {
    url: API_URL + '/user',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    }
  };
}

export function GET_TICKET(token: string) {
  return {
    url: API_URL + '/redeem_coupon',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }
  };
}

export function CHANGE_GAME(token: string, game: string) {
  return {
    url: API_URL + '/change_game',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ game })
    }
  };
}
