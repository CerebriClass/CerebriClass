import ky from 'ky';

export const post = async (path: string, data: any) => {
  const response = await ky.post(import.meta.env.VITE_REQUESTER_URL + path, {
    json: data,
  });
  return response;
};

export const postJSON = async (path: string, data: any) => {
  const json = await ky
    .post(import.meta.env.VITE_REQUESTER_URL + path, { json: data })
    .json();
  return json;
};
