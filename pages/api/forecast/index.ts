import type { NextApiRequest, NextApiResponse } from "next";
import { getLocationDataByAddress } from "../../../services/geoCoding";
import { getForecastService, getGridService } from "../../../services/forecast";
const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const address = req.query.address as string;
  if (!address)
    return res.status(400).json({
      message: "Address cannot be empty and cannot exceed 100 characters",
    });
  /**
   * Get geocoding data by address.
   */
  const geoLocationResponse = await getLocationDataByAddress(address);
  if (geoLocationResponse.status >= 300) {
    if (geoLocationResponse?.data?.errors?.length) {
      return res.status(geoLocationResponse.status).json({
        message: geoLocationResponse?.data?.errors.join(", "),
      });
    }
    return res.status(geoLocationResponse.status).json({
      message: "An unexpected problem has occurred",
    });
  }
  if (!geoLocationResponse?.data?.result?.addressMatches?.length) {
    return res.status(400).json({ message: "No results found" });
  }
  /**
   * If getLocationDataByAddress returns a 200 and a result
   */
  const { x, y } =
    geoLocationResponse?.data?.result?.addressMatches?.[0]?.coordinates;
  /**
   * Get grid service from latitude and longitude
   */
  const gridResponse = await getGridService(x, y);
  if (gridResponse.status >= 300) {
    if (gridResponse.data?.detail) {
      res.status(200).json({ message: gridResponse.data.detail });
    }
    return res.status(gridResponse.status).json({
      message: "An unexpected problem has occurred",
    });
  }
  const { gridId, gridX, gridY } = gridResponse.data?.properties;
  /**
   * Get forecast data
   */
  const getForecastResponse = await getForecastService(gridId, gridX, gridY);
  if (getForecastResponse.status >= 300) {
    if (getForecastResponse.data?.detail) {
      res.status(200).json({ message: getForecastResponse.data.detail });
    }
    return res.status(getForecastResponse.status).json({
      message: "An unexpected problem has occurred",
    });
  }
  if (!getForecastResponse.data?.properties?.periods?.length) {
    return res.status(getForecastResponse.status).json({
      message: "No forecast data found",
    });
  }
  return res
    .status(getForecastResponse.status)
    .json({ periods: getForecastResponse.data?.properties?.periods });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await get(req, res);
      break;
    default:
      res.status(405).json({ message: `Method ${req.method} not supported.` });
  }
}
