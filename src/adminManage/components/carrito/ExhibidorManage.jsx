import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ButtonGroup from "./../../../commons/libraray/buttons/ButtonGroup";
import { useTerryContext } from "./../../../commons/context/territorios/TerryContext";
import { tableMounth, areaimg } from "./../../../commons/utils/fixed";
import CuadroExhibidor from "./CuadroExhibidor";

const getHnosDaySel = (data, idia, per) => {
  //console.log(`--->${data.length}<----`);
  let newdata = [];
  if (data.length > 0) {
    const [seldata] = data.filter((elem) => elem.dia === `${idia}${per}`);
    //console.log("sel", seldata);
    if (undefined !== seldata) {
      newdata = seldata.asings;
    }
  }
  return newdata;
};
const getHnoName = (id, listHnosCar) => {
  const idhno = listHnosCar.find((ele) => ele.id === id);
  if (undefined !== idhno) {
    return `${idhno.nombre} ${idhno.apellidos}`;
  } else {
    return id;
  }
};

const ExhibidorManage = ({
  year,
  month,
  draggingOver,
  OnDrop,
  cuaMesData,
  startDragCell,
  setMenu,
  updateCuad,
  loadMonthData,
  listHnosCar,
  session,
}) => {
  const { isYearInData, isMouthinData } = useTerryContext();
  const [mesact, setMesact] = React.useState([]);
  const [yearsData, setYearsData] = React.useState([]);
  const [mounthData, setMounthData] = React.useState([]);

  React.useEffect(() => {
    setYearsData([year - 2, year - 1, year, year + 1, year + 2]);
    setMounthData(tableMounth);
  }, [year]);

  React.useEffect(() => {
    if (undefined !== cuaMesData) {
      setMesact(cuaMesData);
    }
  }, [cuaMesData]);

  // Obtener el primer día del mes y el último día del mes
  const primerDia = new Date(year, month - 1, 1);
  const ultimoDia = new Date(year, month, 0);
  let diasem = 0;
  let repite = false;

  // Cambiar el día de inicio: 0 = lunes, 6 = sábado (sin domingo y sin miércoles)
  let primerDiaSemana = primerDia.getDay();
  //primerDiaSemana = primerDiaSemana === 0 ? 6 : primerDiaSemana - 1; // Adaptar el inicio al lunes

  const totalDias = ultimoDia.getDate();

  // Crear un array para representar las celdas del calendario
  const celdas = [];

  // Llenar las celdas vacías antes del primer día del mes
  if (primerDiaSemana === 0) {
    for (let i = 1; i <= 6; i++) {
      celdas.push(<div key={`empty-${i}`} style={estiloCelda}></div>);
      diasem = 6;
      if (diasem !== 1) repite = true;
    }
  } else {
    if (celdas.length <= 0 && primerDiaSemana !== 1) {
      for (let i = 1; i <= primerDiaSemana; i++) {
        if (i !== 3) {
          //if (i === 1) {
          //  celdas.push(<div key={`empty-${0}`} style={estiloCelda}></div>);
          //}
          celdas.push(<div key={`empty-${i}`} style={estiloCelda}></div>);
        } else {
          if (i === primerDiaSemana){
            celdas.push(<div key={`empty-${i+1}`} style={estiloCelda}></div>);
          }
        }
        diasem = i - 1;
        if (diasem !== 1) repite = true;
      }
    }
  }

  // Llenar las celdas con los días del mes
  for (let dia = 1; dia <= totalDias; dia++) {
    diasem++;
    if (diasem > 7) {
      diasem = 1;
      repite = false;
    }
    if (diasem === 1 && !repite) {
      celdas.push(
        <div key={`${dia}-a`} style={estiloCelda}>
          <div style={{ backgroundColor: "lightgray" }}>{dia}</div>
          <div
            className="cellcontent"
            droppable={session.lebel === 1 ? "true" : "false"}
            onDragOver={(evt) => draggingOver(evt)}
            onDrop={(evt) => OnDrop(evt, "cell", diasem, dia, "m")}
          >
            {mesact.length > 0
              ? getHnosDaySel(mesact, dia, "m").map((elem) => (
                  <div
                    key={elem}
                    className="dropname dropaux"
                    draggable
                    onDragStart={
                      session.lebel === 1
                        ? (evt) => startDragCell(evt, elem, dia, "m")
                        : null
                    }
                  >
                    {getHnoName(elem, listHnosCar)}
                  </div>
                ))
              : "data"}
          </div>
        </div>
      );
      celdas.push(
        <div key={`${dia}-b`} style={estiloCelda}>
          <div style={{ backgroundColor: "lightgray" }}>{dia}</div>
          <div
            className="cellcontent"
            droppable={session.lebel === 1 ? "true" : "false"}
            onDragOver={(evt) => draggingOver(evt)}
            onDrop={(evt) => OnDrop(evt, "cell", diasem, dia, "t")}
          >
            {mesact.length > 0
              ? getHnosDaySel(mesact, dia, "t").map((elem) => (
                  <div
                    key={elem}
                    className="dropname dropaux"
                    draggable
                    onDragStart={
                      session.lebel === 1
                        ? (evt) => startDragCell(evt, elem, dia, "t")
                        : null
                    }
                  >
                    {getHnoName(elem, listHnosCar)}
                  </div>
                ))
              : "data"}
          </div>
        </div>
      );
      repite = true;
    } else {
      //if (diasem === 3) diasem++;
      if (diasem !== 3 && diasem !== 7) {
        celdas.push(
          <div key={dia} style={estiloCelda}>
            <div style={{ backgroundColor: "lightgray" }}>{dia}</div>
            <div
              className="cellcontent"
              droppable={session.lebel === 1 ? "true" : "false"}
              onDragOver={(evt) => draggingOver(evt)}
              onDrop={(evt) => OnDrop(evt, "cell", diasem, dia, "u")}
            >
              {/* crear maping pasa sacar valores con un div */}
              {mesact.length > 0
                ? getHnosDaySel(mesact, dia, "u").map((elem) => (
                    <div
                      name={`cell${dia}`}
                      key={elem}
                      className="dropname dropaux"
                      draggable
                      onDragStart={
                        session.lebel === 1
                          ? (evt) => startDragCell(evt, elem, dia, "u")
                          : null
                      }
                    >
                      {getHnoName(elem, listHnosCar)}
                    </div>
                  ))
                : "data"}
            </div>
          </div>
        );
      }
    }
  }

  const handleFormButton = (evento) => {
    if (evento === "validar") {
      updateCuad();
    } else {
      if (evento === "imprimir") {
        exportPDF();
      } else {
        if (evento === "salir") setMenu(0);
      }
    }
  };
  const exportPDF = () => {
    const input = document.getElementById("PrintArea");
    html2canvas(input, {
      logging: true,
      letterRendering: 1,
      useCORS: true,
    }).then((canvas) => {
      const imgWidth = areaimg.a4.w;
      const imgHeight = areaimg.a4.h;
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("l", "mm", "a4");
      pdf.addImage(imgData, "PNG", 3, 3, imgWidth, imgHeight);
      pdf.save(`CuadranteCarrito_${month}-${year}.pdf`);
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {yearsData.map((ye) => (
            <div
              key={ye}
              style={{
                margin: "3px 5px",
                padding: "0px 10px",
                border: isYearInData(ye)
                  ? "solid 1px #27395b"
                  : "solid 1px #b7c3da",
                borderRadius: "30px",
                backgroundColor: ye === year ? "white" : "none",
                color: isYearInData(ye) ? "#27395b" : "#b7c3da",
                cursor: isYearInData(ye) ? "pointer" : "auto",
              }}
            >
              {ye}
            </div>
          ))}
        </div>
        <div
          style={{
            width: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {mounthData.map((mo) => (
            <div
              key={mo.id}
              style={{
                margin: "3px 5px",
                padding: "0px 10px",
                border: isMouthinData(mo.id)
                  ? "solid 1px #27395b"
                  : "solid 1px #b7c3da",
                borderRadius: "30px",
                backgroundColor:
                  parseInt(mo.id) === parseInt(month)
                    ? "white"
                    : " rgba(79, 91, 121, 0)",
                color: isMouthinData(mo.id) ? "#27395b" : "#b7c3da",
                cursor: isMouthinData(mo.id) ? "pointer" : "auto",
              }}
              onClick={() => loadMonthData(year, mo.id)}
            >
              {mo.text}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <div>
          <ButtonGroup
            direction="row"
            border={{
              pos: "top",
              color: "rgba(79, 91, 121, 0.094)",
              width: "1px",
              style: "dotted",
            }}
            list={
              session.lebel === 1
                ? [
                    {
                      label: {
                        text: "Validar",
                        textype: "uper",
                      },
                      width: "100px",
                      height: "auto",
                      border: {
                        color: "orange",
                        width: "1px",
                      },
                      onClick: handleFormButton,
                    },
                    {
                      label: {
                        text: "Imprimir",
                        textype: "uper",
                      },
                      width: "100px",
                      height: "auto",
                      border: {
                        color: "orange",
                        width: "1px",
                      },
                      onClick: handleFormButton,
                    },
                    {
                      label: {
                        text: "Salir",
                        textype: "uper",
                      },
                      width: "100px",
                      height: "auto",
                      border: {
                        color: "orange",
                        width: "1px",
                      },
                      onClick: handleFormButton,
                    },
                  ]
                : [
                    {
                      label: {
                        text: "Imprimir",
                        textype: "uper",
                      },
                      width: "100px",
                      height: "auto",
                      border: {
                        color: "orange",
                        width: "1px",
                      },
                      onClick: handleFormButton,
                    },
                    {
                      label: {
                        text: "Salir",
                        textype: "uper",
                      },
                      width: "100px",
                      height: "auto",
                      border: {
                        color: "orange",
                        width: "1px",
                      },
                      onClick: handleFormButton,
                    },
                  ]
            }
          />
        </div>
      </div>
      <div className="App">
        <header id="PrintArea" className="App-header">
          {/* Acá va el componente que quiero guardar en PDF */}
          <CuadroExhibidor year={year} month={month} celdas={celdas} />
        </header>
      </div>
    </div>
  );
};

// Estilos
const estiloCelda = {
  border: "1px solid #ddd",
  padding: "0px",
  textAlign: "center",
  backgroundColor: "white",
};

export default ExhibidorManage;
