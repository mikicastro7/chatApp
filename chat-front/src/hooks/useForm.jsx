import { useState } from "react";

const useForm = (dataFormInitial) => {
  const [formData, setFormData] = useState(dataFormInitial);
  const modifieData = e => {
    const nombrePropiedad = e.target.name;
    setFormData({
      ...formData,
      [nombrePropiedad]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  return {
    formData,
    modifieData
  };
};

export default useForm;
