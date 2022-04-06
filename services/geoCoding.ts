import httpRequest from "../utils/httpRequest";

export const getLocationDataByAddress = async (address: string) =>
  await httpRequest.get(
    "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress",
    {
      // headers: {
      //   "Access-Control-Allow-Origin": true,
      // },
      params: {
        address,
        benchmark: "2020",
        format: "json",
      },
    }
  );
