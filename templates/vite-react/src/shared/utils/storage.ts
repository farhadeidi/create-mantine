export type StorageProps = {
  isLoggedIn: boolean;
  token: string;
  userInfo: {
    name: string;
    avatarUrl: string;
  };
};

export const setStorage = <T extends keyof StorageProps>(
  key: keyof StorageProps,
  value: StorageProps[T],
) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = (keyName: keyof StorageProps) => {
  const value = localStorage.getItem(keyName);
  if (!value) return;

  return JSON.parse(value);
};

export const removeStorage = (keyName: keyof StorageProps) => {
  localStorage.removeItem(keyName);
};

export const clearStorage = () => {
  localStorage.clear();
};
