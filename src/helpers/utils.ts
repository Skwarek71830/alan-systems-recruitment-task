// mock fn to simulate waiting for api response
export const wait = (ms = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const fetcher = <T = unknown>(
  ...args: Parameters<typeof fetch>
): Promise<T> => fetch(...args).then((res) => res.json());
