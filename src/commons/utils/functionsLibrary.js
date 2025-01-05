import CryptoJS from "crypto-js";

export function generateCalendar() {
  const calendarContainer = document.getElementById("calendar");

  // Limpia el contenido previo del calendario
  calendarContainer.innerHTML = "";

  // Días de la semana
  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  // Cabecera con los días de la semana
  daysOfWeek.forEach((day) => {
    const header = document.createElement("div");
    header.className = "header";
    header.textContent = day;
    calendarContainer.appendChild(header);
  });

  // Fecha del sistema
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Primer día del mes
  const firstDay = new Date(year, month, 1);
  const firstDayIndex = (firstDay.getDay() + 6) % 7; // Ajusta para que el lunes sea el primer día

  // Días en el mes
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Agrega días vacíos antes del primer día del mes
  for (let i = 0; i < firstDayIndex; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "day";
    calendarContainer.appendChild(emptyDay);
  }

  // Agrega los días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.className = "day";

    // Esquina superior izquierda con el número del día
    const dayNumber = document.createElement("span");
    dayNumber.textContent = day;
    dayCell.appendChild(dayNumber);

    calendarContainer.appendChild(dayCell);
  }
}

export const invertirFecha = (fecha) => {
  let partes;
  let separador = "";
  if (fecha.includes("-")) {
    separador = "-";
  }
  if (fecha.includes("/")) {
    separador = "/";
  }
  partes = fecha.split(separador);
  let fechaInvertida = `${partes[2]}${separador}${partes[1]}${separador}${partes[0]}`;

  return fechaInvertida;
};

export const getZona = (zona) => {
  if (parseInt(zona) === 1 || zona === "C") return "Ciudad";
  if (parseInt(zona) === 2 || zona === "N") return "Negocios";
  if (parseInt(zona) === 3 || zona === "E") return "Campo";
};

export const getDateToday = (sec = false) => {
  const hoy = new Date();

  const año = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0"); // Los meses en JS van de 0 (enero) a 11 (diciembre)
  const dia = String(hoy.getDate()).padStart(2, "0"); // Obtiene el día y lo formatea
  if (sec) {
    return { dia, mes, año };
  } else {
    return `${año}-${mes}-${dia}`;
  }
};

export const diasTranscurridos = (fecha1, fecha2 = "") => {
  // Convertimos las fechas de string a objetos Date
  const f1 = new Date(fecha1);
  let f2;
  if (fecha2 === "") {
    f2 = new Date(getDateToday());
  } else {
    f2 = new Date(fecha2);
  }
  // Restamos las fechas en milisegundos
  const diferenciaTiempo = Math.abs(f2 - f1);

  // Convertimos los milisegundos a días (1 día = 24h * 60min * 60s * 1000ms)
  const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));

  return diferenciaDias;
};

export const getProgress = (date, days) => {
  const trans = diasTranscurridos(date);
  return (parseInt(trans) * 100) / parseInt(days);
};

export const isFecEqual = (fecyear, fecmouth, fecday, fecsel) => {
  const fec1 = `${fecyear}-${fecmouth.padStart(2, "0")}-${fecday.padStart(
    2,
    "0"
  )}`;
  if (fec1 === fecsel) {
    return true;
  }
  return false;
};

export function diaSemanaInicioMes(mes, año) {
  const fecha = new Date(año, mes - 1, 1);
  const diaSemana = fecha.getDay();
  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  return diasSemana[diaSemana];
}
export function obtenerDiaSemana(fecha) {
  const año = fecha.slice(0, 4);
  const mes = fecha.slice(4, 6);
  const dia = fecha.slice(6, 8);
  // Convertimos la cadena de fecha en un objeto Date
  const fechaObj = new Date(`${año}/${mes}/${dia}`);
  // Validamos si la fecha es válida
  if (isNaN(fechaObj)) {
    throw new Error(
      "La fecha proporcionada no es válida. Usa el formato yyyy/mm/dd."
    );
  }
  // Array con los días de la semana
  const diasSemana = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];
  // Obtenemos el índice del día de la semana (0 = domingo, 6 = sábado)
  const diaSemanaIndex = fechaObj.getDay();
  // Retornamos el nombre del día
  return diasSemana[diaSemanaIndex];
}

export function sumarMeses(fechaInicialStr, meses) {
  let fecha;
  // Convertir la cadena en formato yyyy/mm/dd a un objeto Date
  if (fechaInicialStr.includes("/")) {
    const [anio, mes, dia] = fechaInicialStr.split("/").map(Number);
    fecha = new Date(anio, mes - 1, dia); // Restamos 1 al mes porque los meses en JavaScript empiezan desde 0
  } else {
    const [anio, mes, dia] = fechaInicialStr.split("-").map(Number);
    fecha = new Date(anio, mes - 1, dia); // Restamos 1 al mes porque los meses en JavaScript empiezan desde 0
  }
  // Sumar los meses
  fecha.setMonth(fecha.getMonth() + meses);
  return fecha;
}

export function encryptData(data, secretKey) {
  // Convierte el dato en un string si es necesario
  const stringData = typeof data === "string" ? data : JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(stringData, secretKey).toString();
  return encrypted;
}

export function decryptData(encryptedData, secretKey) {
  if (encryptedData === "" || secretKey === "") {
    console.log("--->", `>${encryptedData}<>${secretKey}<`);
    return "";
  }
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    // Verifica si se pudo desencriptar correctamente
    if (!decrypted) {
      return "";
    }
    return decrypted;
  } catch (error) {
    //console.error("Error durante la desencriptación:", error);
    return null;
  }
}

export function guardarContexto(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}
export function obtenerContexto(clave) {
  const contextoGuardado = localStorage.getItem(clave);
  if (undefined !== contextoGuardado && null !== contextoGuardado) {
    return JSON.parse(contextoGuardado);
  }
  return contextoGuardado;
}

export function obtenerFechaHora() {
  // Obtener la fecha y hora actuales
  const ahora = new Date();

  // Formatear los valores de día, mes, año, horas y minutos
  const dia = String(ahora.getDate()).padStart(2, "0");
  const mes = String(ahora.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
  const anio = ahora.getFullYear();
  const horas = String(ahora.getHours()).padStart(2, "0");
  const minutos = String(ahora.getMinutes()).padStart(2, "0");

  // Devolver la fecha en el formato dd/mm/aaaa-hh:mm
  return `${dia}/${mes}/${anio}-${horas}:${minutos}`;
}

export function obtenerMesActual() {
  const fechaActual = new Date(); // Obtiene la fecha actual
  const mes = fechaActual.getMonth() + 1; // Obtiene el mes (0-11, por eso sumamos 1)
  return mes < 10 ? `0${mes}` : `${mes}`; // Formatea el mes con dos dígitos
}

export const obtenerNombreMes = (month) => {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return meses[month - 1];
};
