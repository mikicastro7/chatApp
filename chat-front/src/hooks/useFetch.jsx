import { useCallback, useState } from "react";

const useFetch = () => {
  const [datos, setDatos] = useState(null);
  const pedirDatos = useCallback(async (url, opciones = {}) => {
    const resp = await fetch(url, opciones);
    const datos = await resp.json();
    setDatos(datos);
  }, []);
  return {
    datos,
    pedirDatos,
    setDatos
  };
};

export default useFetch;
