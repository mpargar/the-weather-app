import { FormEvent, useState } from "react";
import httpRequest from "../utils/httpRequest";
import TForecastPeriod from "../types/forecastPeriod";

const useSearch = (address: string) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TForecastPeriod[]>([]);
  const [message, setMessage] = useState("");

  const handleSearch = async (e: FormEvent | Event) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const response = await httpRequest.get("/api/forecast", {
      params: {
        address,
      },
    });
    if (response.status >= 300) {
      setMessage(
        response?.data?.message || "An unexpected problem has occurred"
      );
      setResults([]);
    } else {
      setMessage("");
      setResults(response?.data?.periods);
    }
    setLoading(false);
  };

  return {
    handleSearch,
    loading,
    results,
    message,
  };
};

export default useSearch;
