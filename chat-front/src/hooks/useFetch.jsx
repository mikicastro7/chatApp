import { useCallback, useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const requestData = useCallback(async (url, options = {}) => {
    const resp = await fetch(url, options);
    const datos = await resp.json();
    setData(datos);
  }, []);
  return {
    data,
    requestData,
    setData
  };
};

export default useFetch;
