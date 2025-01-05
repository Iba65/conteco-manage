function generarNuevoID(idActual) {
  // Extraer la parte numérica del ID usando una expresión regular
  let parteNumerica = parseInt(idActual.match(/\d+/)[0]);
  // Incrementar la parte numérica en 1
  let nuevoNumero = parteNumerica + 1;
  // Obtener la parte no numérica (letras) del ID usando otra expresión regular
  let parteTexto = idActual.match(/[A-Za-z]+/)[0];
  // Formar el nuevo ID asegurando que el número mantenga el mismo formato de ceros
  let nuevoID =
    parteTexto +
    nuevoNumero.toString().padStart(idActual.length - parteTexto.length, "0");
  return nuevoID;
}

export const getLong = (type, territories) => {
  let idres = "";
  const toter = territories.filter((ter) => ter.grupoTD === type);
  if (toter.length > 0) {
    const idter = toter[toter.length - 1].idTD;
    idres = generarNuevoID(idter);
  } else {
    if (type === 1) idres = "C001";
    if (type === 2) idres = "N001";
    if (type === 3) idres = "E001";
  }
  return idres;
};

export const isInData = (data, state) => {
  const isIn = state.find((dat) => dat.idTD === data.idTD);
  if (undefined !== isIn) return true;
  return false;
};
