// La contraseña debe tener al entre 8 y 16 caracteres,
//  al menos un dígito, al menos una minúscula y al menos una mayúscula.
// NO puede tener otros símbolos.

export const validatePassword = (password: string): boolean => {
  return /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(
    password
  );
};

export const validateEmail = (email: string): boolean => {
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
};
