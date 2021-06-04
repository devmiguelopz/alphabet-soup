export const getPresentation = () => {
  return `
    ------------------------SOPA DE LETRAS---------------------------
    CASO 1:
    3 3
    OIE
    IIX
    EXE
    -----------------
    CASO 2:
    1 10
    EIOIEIOEIOE
    -----------------
    CASO 3:
    5 5 
    EAEAE
    AIIIA
    EIOIE
    AIIIA
    EAEAE
    -----------------
    CASO 4:
    7 2
    OX
    IO
    EX
    II
    OX
    IE
    EX
    -----------------
    CASO 5:
    1 1
    E
    -----------------
    `;
};

export const getMessage = () => {
  return "SELECCIONE UN CASO VALIDO A PROBAR DEL 1 AL 5";
};

export const getMessageError = () => {
  return "Ocurrio un error no controlado, pongase en contacto con el administrador";
};

export const getMessageSuccess = (value) => {
  return `El número de veces que se repite la palabra es : ${value}`;
};

export const getMessageWarning = () => {
  return "Por favor seleccione un caso valido";
};
