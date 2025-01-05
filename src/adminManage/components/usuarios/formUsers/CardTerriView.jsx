import React from "react";
import { useTerryContext } from "./../../../../commons/context/territorios/TerryContext";
import ImagenConRespaldo from "./../../../../adminManage/components/ImagenConRespaldo";

const CardTerriView = ({ codter }) => {
  const { terryState } = useTerryContext();
  const [tersel, setTersel] = React.useState({});

  React.useEffect(() => {
    const terrfind = terryState.find((ter) => ter.idTD === codter);
    if (undefined !== terrfind) {
      setTersel(terrfind);
    }
  }, [codter]);

  return (
    <div className="cardTerriViewCont">
      {Object.keys(tersel).length > 0 && (
        <>
          <div className="titleTerri">{`${tersel.idTD} - ${tersel.descTD}`}</div>
          <div className="mapTeri">
            <ImagenConRespaldo
              src={tersel.planoTD} // URL de la imagen principal
              fallback={"terrImg/PlanoElche.jpg"} // URL de la imagen de respaldo
              alt={`imagen territorio ${codter}`}
              imgsize={{
                width: 250,
                height: 150,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CardTerriView;
