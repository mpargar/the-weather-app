import httpRequest from "../utils/httpRequest";

export const getGridService = async (x: number, y: number) =>
  await httpRequest.get(`https://api.weather.gov/points/${y},${x}`);

export const getForecastService = async (
  gridId: string,
  x: number,
  y: number
) => {
  return httpRequest.get(
    `https://api.weather.gov/gridpoints/${gridId}/${x},${y}/forecast`
  );
};
