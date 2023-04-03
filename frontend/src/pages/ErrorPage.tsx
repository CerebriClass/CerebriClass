type ErrorPageprops = {
  statusCode: number;
};

export const ErrorPage = ({ statusCode }: ErrorPageprops) => {
  return <p>{statusCode}</p>;
};
