import Cookies from 'js-cookie';

export type CookiesProps = {
  isLoggedIn: boolean;
  token: string;
  userInfo: {
    name: string;
    avatarUrl: string;
  };
};

export const setCookie = <T extends keyof CookiesProps>(
  key: keyof CookiesProps,
  value: CookiesProps[T],
  options: Cookies.CookieAttributes = {},
) => {
  Cookies.set(key, JSON.stringify(value), options);
};

export const getCookie = (keyName: keyof CookiesProps) => {
  const value = Cookies.get(keyName);
  if (!value) return;

  return JSON.parse(value);
};

export const removeCookie = (
  keyName: keyof CookiesProps,
  options: Cookies.CookieAttributes = {},
) => {
  Cookies.remove(keyName, options);
};
