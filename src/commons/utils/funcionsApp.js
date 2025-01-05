import { usuarios, userTypes, areas } from "./fixed";
import { decryptData } from "./functionsLibrary";

export const getArea = (zona) => {
  const aswArea = areas.find((area) => area.key === zona);
  if (undefined !== aswArea) {
    return aswArea.text;
  } else {
    ("NO EXISTE");
  }
};
export const getUserById = (data, id) => {
  let userfind = {};
  const foundUser = data.find((user) => user.id === id);
  if (undefined !== foundUser) {
    userfind = foundUser;
  }
  return userfind;
};

export const getUserByKey = (key, data = undefined, value, semilla) => {
  let userfind;
  if (undefined !== data) {
    userfind = data.find((user) => decryptData(user[key], semilla) === value);
  } else {
    userfind = usuarios.find(
      (user) => decryptData(user[key], semilla) === value
    );
  }
  if (undefined !== userfind) {
    return userfind;
  } else {
    return undefined;
  }
};

export const checkDevice = () => {
  let res = /Mobi|Android/i.test(navigator.userAgent);
  if (!res) res = window.innerWidth <= 768;
  return res;
};

export const getUserType = (tip) => {
  return userTypes[parseInt(tip) - 1].text;
};

export const getLastUserId = (data) => {
  const res = parseInt(data[data.length - 1].id) + 1;
  return res.toString().padStart(3, "0");
};

export const validarEditTer = (datater, datE, datI, hno) => {
  const errs = validarDatosTer(datater);
  if (datater.stateTD) {
    if (
      (!datE.dayFE || datE.dayFE.trim() === "") &&
      (!datE.mounthFE || datE.mounthFE.trim() === "") &&
      (!datE.yearFE || datE.yearFE.trim() === "")
    ) {
      errs.fecstateTD = "La fecha de salida no puede estar vacia.";
    } else {
      if (!esFechaValida(`${datE.dayFE}-${datE.mounthFE}-${datE.yearFE}`)) {
        errs.fecstateTD =
          "La fecha de salida no es correcta, por favor introduzca una fecha valida.";
      } else {
        if (!hno || hno.trim() === "") {
          errs.hnohasTD = "El territorio tiene que tener un hermano asignado.";
        } else {
          if (
            datater.historiTD[datater.historiTD.length - 2].fecentHTD >
              `${datE.yearFE}-${datE.mounthFE}-${datE.dayFE}` ||
            datater.historiTD[datater.historiTD.length - 2].fecentHTD === ""
          ) {
            errs.fecstateTD =
              "La fecha de salida no puede ser inferior a la fecha de entrada anterior.";
          }
        }
      }
    }
  } else {
    if (
      (!datI.dayFI || datI.dayFI.trim() === "") &&
      (!datI.mounthFI || datI.mounthFI.trim() === "") &&
      (!datI.yearFI || datI.yearFI.trim() === "")
    ) {
      errs.fecstateTD = "La fecha de entrada no puede estar vacia.";
    } else {
      if (!esFechaValida(`${datI.dayFI}-${datI.mounthFI}-${datI.yearFI}`)) {
        errs.fecstateTD =
          "La fecha de entrada no es correcta, por favor introduzca una fecha valida.";
      } else {
        if (
          datater.historiTD[datater.historiTD.length - 1].fecsalHTD >
            `${datI.yearFI}-${datI.mounthFI}-${datI.dayFI}` ||
          datater.historiTD[datater.historiTD.length - 1].fecsalHTD === ""
        ) {
          errs.fecstateTD =
            "La fecha de entrada no puede ser inferior a la fecha de salida.";
        }
      }
    }
  }
  return errs;
};
export const validarDatosTer = (obj) => {
  const errs = {};
  const { idTD, descTD, grupoTD, tipoTD, planoTD } = obj;
  if (!idTD || idTD.trim() === "") {
    errs.idTD = "El código de territorio es obligatorio.";
  }
  if (!descTD || descTD.trim() === "") {
    errs.descTD = "Por favor, ponga una descripcion al territorio.";
  }
  if (!grupoTD || grupoTD < 0 || grupoTD > 3) {
    errs.grupoTD = "Debe escoger un tipo (ciudad, negocios o campo).";
  }
  if (!tipoTD || tipoTD < 0 || tipoTD > 6) {
    errs.tipoTD = "Escoja la caracteristica que define al territorio.";
  }
  if (!planoTD || planoTD.trim() === "") {
    errs.planoTD =
      "El plano del territorio no puede estar vacio. Carge uno deje el que hay por defecto.";
  }
  return errs;
};
export function validarDatos(obj) {
  const errs = {};
  const { namperUser, whatsappUser, emailUser, nameUser, grupoSer, exhibidor } =
    obj;
  if (!namperUser || namperUser.trim() === "") {
    errs.namperUser =
      "El nombre personal es obligatorio, aunque los apellidos no lo son.";
  }
  if (whatsappUser.length > 0) {
    const telefonoRegex =
      /^(?:\d{3} \d{3} \d{3}|\d{3}\.\d{3}\.\d{3}|\d{3} \d{2} \d{2} \d{2}|\d{3}\.\d{2}\.\d{2}\.\d{2}|\d{9})$/;
    if (!whatsappUser || !telefonoRegex.test(whatsappUser)) {
      errs.whatsappUser =
        "El teléfono debe tener al menos 9 dígitos y contener solo números. Con los formato posibles nnnnnnnnn ó nnn nn nn nn ó nnn.nn.nn.nn ó nnn nnn nnn ó nnn.nnn.nnn";
    }
  }
  if (emailUser.length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailUser || !emailRegex.test(emailUser)) {
      errs.emailUser = "El formato email no es válido.";
    }
  }
  if (!nameUser || obj.nameUser.trim().length < 4) {
    errs.nameUser =
      "El usuario es requerido y debe tener al menos 4 caracteres.";
  }
  if (!grupoSer || grupoSer === 0) {
    errs.grupoSer = "El grupo de servicio es obligatorio.";
  } else {
    if (parseInt(grupoSer) < 1 || parseInt(grupoSer) > 6) {
      errs.grupoSer = "El grupo de servicio debe ser un valor entre 1 y 6.";
    }
  }
  if (exhibidor !== true && exhibidor !== false) {
    errs.exhibidor = "Indique si participa en el exhibidor o no.";
  }
  return errs;
}

function esBisiesto(año) {
  return (año % 4 === 0 && año % 100 !== 0) || año % 400 === 0;
}

export const esFechaValida = (fecha) => {
  // Expresión regular para el formato dd-mm-aaaa
  const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
  const match = fecha.match(regex);

  if (!match) {
    return false; // La fecha no cumple con el formato
  }

  // Extrae el día, mes y año del string
  const dia = parseInt(match[1], 10);
  const mes = parseInt(match[2], 10);
  const año = parseInt(match[3], 10);

  // Verifica el rango del mes
  if (mes < 1 || mes > 12) {
    return false;
  }

  // Verifica el rango del día según el mes
  const diasPorMes = [
    31,
    esBisiesto(año) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  if (dia < 1 || dia > diasPorMes[mes - 1]) {
    return false;
  }

  return true; // La fecha es válida
};

export const extractDate = (fecha) => {
  const [anio, mes, dia] = fecha.split("-");
  return {
    anio: parseInt(anio, 10),
    mes: parseInt(mes, 10),
    dia: parseInt(dia, 10),
  };
};

export function validateForm(data, isNew) {
  let errs = {};
  // Validar que el nombre no esté vacío
  const { userName, userPassword, emailUser } = data;
  if (!userName || userName.trim() === "") {
    errs.userName = {
      isValid: false,
      message: "El usuario no puede estar vacío.",
    };
  }
  // Validar la contraseña
  if (isNew) {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{1,10}$/;
    if (!userPassword || !passwordRegex.test(userPassword)) {
      errs.userPassword = {
        isValid: false,
        message:
          "La contraseña debe tener al menos una letra mayúscula, un número, un carácter especial y una longitud maxima de 10 caracteres.",
      };
    }
  } else {
    if (!userPassword || userPassword.trim() === "") {
      errs.userPassword = {
        isValid: false,
        message: "La contraseña no puede estar vacía.",
      };
    }
  }

  if (isNew) {
    // Validar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailUser || !emailRegex.test(emailUser)) {
      errs.emailUser = { isValid: false, message: "El email no es válido." };
    }
  }
  // Si todo es válido
  return errs;
}

export const buildListMindata = (hnosData, semilla) => {
  const newData = [];
  hnosData.map((hno) => {
    const nomtem = hno.encrypted
      ? `${decryptData(hno.nombre, semilla)} ${hno.apellidos.charAt(0)}*******`
      : hno.nombre;
    const apetem = "";
    const ematem = "";
    const whatem = "";
    const usetem = hno.encrypted
      ? decryptData(hno.usuario, semilla)
      : hno.usuario;
    const newObj = {
      id: hno.id,
      nombre: nomtem,
      apellidos: apetem,
      email: ematem,
      whatsapp: whatem,
      usuario: usetem,
      tipo: hno.tipo,
      grupoSer: hno.grupoSer,
      exhibidor: hno.exhibidor,
      territorios: hno.territorios,
      ultimaSesion: hno.ultimaSesion,
      historyExhib: hno.historyExhib,
      historyTer: hno.historyTer,
      encrypted: hno.encrypted,
    };
    newData.push(newObj);
  });
  return newData;
};

export const buildListData = (hnosData, semilla, session, getSemola) => {
  const newData = [];
  const semola = getSemola(session.seed, semilla);
  //console.log(semilla, semola);
  hnosData.map((hno) => {
    const nomtem = hno.encrypted
      ? decryptData(hno.nombre, semilla)
      : hno.nombre;

    const apetem = hno.encrypted
      ? decryptData(hno.apellidos.slice(1), semola, false)
      : hno.apellidos;
    const ematem = hno.encrypted ? decryptData(hno.email, semola) : hno.email;
    const whatem = hno.encrypted
      ? decryptData(hno.whatsapp, semola)
      : hno.whatsapp;
    const usetem = hno.encrypted
      ? decryptData(hno.usuario, semilla)
      : hno.usuario;
    const newObj = {
      id: hno.id,
      nombre: nomtem,
      apellidos: apetem,
      email: ematem,
      whatsapp: whatem,
      usuario: usetem,
      tipo: hno.tipo,
      grupoSer: hno.grupoSer,
      exhibidor: hno.exhibidor,
      territorios: hno.territorios,
      ultimaSesion: hno.ultimaSesion,
      historyExhib: hno.historyExhib,
      historyTer: hno.historyTer,
      encrypted: hno.encrypted,
    };
    newData.push(newObj);
  });
  return newData;
};

export const converData = (data, semilla, keycry) => {
  //console.log(data);
  //const apetem = decryptData(data.apellidos.slice(1), keycry, false);
  const newObje = {
    id: data.id,
    nombre: data.encrypted ? decryptData(data.nombre, semilla) : data.nombre,
    apellidos: data.encrypted
      ? decryptData(data.apellidos.slice(1), keycry)
      : data.apellidos,
    email: data.encrypted ? decryptData(data.email, keycry) : data.email,
    whatsapp: data.encrypted
      ? decryptData(data.whatsapp, keycry)
      : data.whatsapp,
    usuario: data.encrypted ? decryptData(data.usuario, semilla) : data.usuario,
    tipo: data.tipo,
    grupoSer: parseInt(data.grupoSer),
    exhibidor: data.exhibidor,
    territorios: data.territorios,
    ultimaSesion: data.ultimaSesion,
    historyExhib: data.historyExhib,
    historyTer: data.historyTer,
    encrypted: data.encrypted,
  };
  return newObje;
};

export const calcTimTrans = (horaInicio, horaFin) => {
  // Convertir las horas en objetos Date para facilitar la manipulación
  const [inicioHoras, inicioMinutos] = horaInicio.split(":").map(Number);
  const [finHoras, finMinutos] = horaFin.split(":").map(Number);

  // Crear objetos Date (asumiendo el mismo día)
  const inicio = new Date();
  inicio.setHours(inicioHoras, inicioMinutos, 0, 0);

  const fin = new Date();
  fin.setHours(finHoras, finMinutos, 0, 0);

  // Calcular la diferencia en milisegundos
  let diferencia = fin - inicio;

  // Si la diferencia es negativa, significa que la hora de fin es al día siguiente
  if (diferencia < 0) {
    fin.setDate(fin.getDate() + 1); // Añadir un día
    diferencia = fin - inicio;
  }

  // Convertir la diferencia en horas y minutos
  const horasTranscurridas = Math.floor(diferencia / (1000 * 60 * 60));
  const minutosTranscurridos = Math.floor(
    (diferencia % (1000 * 60 * 60)) / (1000 * 60)
  );

  // Formatear el resultado en hh:mm
  const horasFormateadas = String(horasTranscurridas).padStart(2, "0");
  const minutosFormateados = String(minutosTranscurridos).padStart(2, "0");

  return `${horasFormateadas}:${minutosFormateados}`;
};

export const getListSortHnos = (data, session, funcs) => {
  const { getSemola, isSemOk } = funcs;
  const filterdat = data.filter(user => user.id !== '000');
  const semola = getSemola(session.seed, import.meta.env.VITE_APP_SEMILLA);
  const amaranto = isSemOk(semola);
  if (amaranto) {
    const listemp = buildListData(
      filterdat,
      import.meta.env.VITE_APP_SEMILLA,
      session,
      getSemola
    );
    const res = listemp.sort((a, b) => {
      return `${a.nombre} ${a.apellidos}`.localeCompare(
        `${b.nombre} ${b.apellidos}`
      );
    });
    return res;
  } else {
    const listempf = buildListMindata(
      filterdat,
      import.meta.env.VITE_APP_SEMILLA
    );
    const resf = listempf.sort((a, b) => {
      return `${a.nombre} ${a.apellidos}`.localeCompare(
        `${b.nombre} ${b.apellidos}`
      );
    });
    return resf;
  }
};

export const getListSortHnosExh = (data, session, funcs) => {
  const { getSemola, isSemOk } = funcs;
  const hnosFilter = data.filter((hno) => hno.exhibidor.state);
  const semola = getSemola(session.seed, import.meta.env.VITE_APP_SEMILLA);
  const amaranto = isSemOk(semola);
  if (amaranto) {
    const listemp = buildListData(
      hnosFilter,
      import.meta.env.VITE_APP_SEMILLA,
      session,
      getSemola
    );
    const res = listemp.sort((a, b) => {
      return `${a.nombre} ${a.apellidos}`.localeCompare(
        `${b.nombre} ${b.apellidos}`
      );
    });
    return res;
  } else {
    const listempf = buildListMindata(
      hnosFilter,
      import.meta.env.VITE_APP_SEMILLA
    );
    const resf = listempf.sort((a, b) => {
      return `${a.nombre} ${a.apellidos}`.localeCompare(
        `${b.nombre} ${b.apellidos}`
      );
    });
    return resf;
  }
};
