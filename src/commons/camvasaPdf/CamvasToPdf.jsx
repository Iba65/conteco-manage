//Instrucciones por debajo del componente...
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CuadroExhibidor from "../../../components/carrito/CuadroExhibidor";

const CamvasToPdf = ({
  year,
  month,
  draggingOver,
  OnDrop,
  cuaMesData,
  startDragCell,
  setMenu,
  updateCuad,
  loadMonthData,
}) => {
  const exportPDF = () => {
    const input = document.getElementById("PrintArea");
    html2canvas(input, {
      logging: true,
      letterRendering: 1,
      useCORS: true,
    }).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("nombreDelPdf.pdf");
    });
  };

  return (
    <div className="PrintArea">
      <button onClick={() => exportPDF()}>Print PDF</button>
      <header id="App" className="App-header">
        {/* Acá va el componente que quiero guardar en PDF */}
        <CuadroExhibidor
          year={year}
          month={month}
          draggingOver={draggingOver}
          OnDrop={OnDrop}
          cuaMesData={cuaMesData}
          startDragCell={startDragCell}
          setMenu={setMenu}
          updateCuad={updateCuad}
          loadMonthData={loadMonthData}
        />
      </header>
    </div>
  );
};

export default CamvasToPdf;

// 1 - instalar dependencias en tu proyecto ( ojo la carpeta donde instalas ): npm i jspdf html2canvas

// 2 - Si no me fumás y preferis otra fuente ( pero en ingles ): https://www.youtube.com/watch?v=NnyZ_rgDOWg

// 3 - Creamos este componente, o sea el del codigo de arriba. ( lo posicionamos donde creamos correcto )

// 4 - Importamos desde este componente, el componente que se supone que queremos pasar a pdf

// 5 - En donde antiguamente se encontraba importado el componente original, lo reemplazamos importando el componente creado por nosotros.
// o sea, el del código que les pasé aca arriba.

// 6 - No te olvides de instalas las dos dependencias, porque seguro no me hiciste caso antes.

// 7 - Abrite una Coquita y mirá por la ventana,... ya terminaste.

// RECORDA QUE NUESTRO COMPONENTE AHORA TIENE: EL BOTON + EL COMPONENTE QUE
// VAMOS A EXPORTAR. POR LO QUE NO HAY QUE OLVIDARSE DE SACARLO DE LA IMPORTACION
// EN LA PAGINA DONDE SE ESTABA MOSTRANDO ORIGINALMENTE ( PARA QUE NO SALGA 2 VECES ).

//Tutorial realizado con cariño por David Cunha para el canal "Te lo digo en código" a la fecha 03/06/2024>>>>>
