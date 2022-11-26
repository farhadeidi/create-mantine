import { AxiosRequestConfig } from 'axios';

import axiosClient from './axiosClient';

export const fetcher = async <T>(
  url: string | undefined = undefined,
  props: AxiosRequestConfig = {},
) => {
  const res = await axiosClient<Promise<T>>({ url, ...props });
  return res.data;
};

export default fetcher;
