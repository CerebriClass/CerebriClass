import ky from 'ky';

export const get = async (path: string) => {
  const response = await ky.get(import.meta.env.VITE_REQUESTER_URL + path, {
    timeout: false,
  });
  return response;
};

export const getJSON = async (path: string) => {
  const json = await ky
    .get(import.meta.env.VITE_REQUESTER_URL + path, {
      timeout: false,
    })
    .json();
  return json;
};
