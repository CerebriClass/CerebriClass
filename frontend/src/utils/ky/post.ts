import ky from 'ky';

export const post = async (path: string, data: any) => {
  const json = await ky
    .post(import.meta.env.VITE_REQUESTER_URL + path, { json: data })
    .json();
  return json;
};
