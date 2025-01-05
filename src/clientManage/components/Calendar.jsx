import React, { useState, useEffect } from "react";
import "./../css/Calendar.css"; // Crea este archivo para los estilos
import DayLens from "./DayLens";

const Calendar = ({ exhMonth }) => {
  const [days, setDays] = useState([]);
  const [lensModal, setLensModal] = React.useState(0);
  const [headers] = useState(["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]);

  useEffect(() => {
    const generateDays = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();

      // Primer día del mes
      const firstDay = new Date(year, month, 1);
      const firstDayIndex = (firstDay.getDay() + 6) % 7; // Ajusta para que el lunes sea el primer día

      // Días en el mes
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      // Generar días vacíos antes del primer día
      const emptyDays = Array.from({ length: firstDayIndex }, () => null);

      // Generar los días del mes
      const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

      // Combina los días vacíos y los días del mes
      setDays([...emptyDays, ...monthDays]);
    };

    generateDays();
  }, []);

  const isInExhib = (dia) => {
    let result = [];
    let colour = "";
    const isinEx = exhMonth.filter(
      (ex) => parseInt(ex.dia.slice(0, 2)) === dia
    );
    if (isinEx.length > 0) {
      colour = isinEx[0].dia.slice(-1);
      isinEx[0].asings.forEach((element) => {
        result.push({ color: colour, value: element });
      });
      if (isinEx.length > 1) {
        colour = isinEx[1].dia.slice(-1);
        isinEx[1].asings.forEach((element) => {
          result.push({ color: colour, value: element });
        });
      }
    }
    return result;
  };

  const viewDetail = (day) => {
    console.log(`quiero ver el dia ${isInExhib(day)}`);
    setLensModal(day);
  };

  return (
    <>
      <div className="calendar">
        {/* Cabecera */}
        <div className="calendarHeader">
          {headers.map((header, index) => (
            <div key={index} className="header">
              {header}
            </div>
          ))}
        </div>

        {/* Días */}
        <div className="calendarBody">
          {days.map((day, index) => (
            <div
              key={index}
              className={
                day !== null
                  ? isInExhib(day).length <= 0
                    ? "day fgrey"
                    : "day"
                  : "day"
              }
              onClick={() => viewDetail(day)}
            >
              <div className="number">{day && <span>{day}</span>}</div>
              {day !== null ? (
                isInExhib(day).length <= 0 ? (
                  <div className="msgnoe">no se pone el Exhibidor</div>
                ) : (
                  <div
                    className={
                      isInExhib(day).length > 0 ? "users" : "users fgray"
                    }
                  >
                    {isInExhib(day).map((us) => (
                      <div className={us.color === "m" ? "usdatm" : "usdatt"}>
                        {us.value.slice(0, 10)}
                      </div>
                    ))}
                  </div>
                )
              ) : null}
            </div>
          ))}
        </div>
      </div>
      {lensModal !== 0 ? <DayLens data={isInExhib(lensModal)} day={lensModal} setLensModal={setLensModal} /> : null}
    </>
  );
};

export default Calendar;
