const TOKEN_KEY = 'jwt';

export const login = (key: string) => {
  localStorage.setItem(TOKEN_KEY, key);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.location.reload();
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
};
