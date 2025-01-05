import React from "react";
import "./../../../css/listcomp.css";
import { useGeneralContext } from "../../../../commons/context/GeneralContext";
import { areas } from "./../../../../commons/utils/fixed";
import { decryptData } from "./../../../../commons/utils/functionsLibrary";
import ButtonCus from "./../../../../commons/libraray/buttons/ButtonCus";
import RadioButtonComponent from "./../../../../commons/libraray/radioButtonComponent/RadioButtonComponent";
import SelectComponent from "./../../../../commons/libraray/selectComponent/SelectComponent";
import ListViewTerritory from "./ListViewTerritories";
import { getListSortHnos } from "../../../../commons/utils/funcionsApp";

const ListGenTerritories = ({
  terryState,
  hnosData,
  setArchive,
  session,
  handleAction,
}) => {
  const { isSemOk, getSemola } = useGeneralContext();
  const [listHnos, setListHnos] = React.useState([]);
  const [listNewHnos, setListNewHnos] = React.useState([]);
  const [lisTerry, setLisTerry] = React.useState([]);
  const [hnohasTerry, setHnohasTerry] = React.useState("");
  const [idDespl, setIsDespl] = React.useState(false);
  const [filterType, setFilterType] = React.useState(1);
  const [filterArea, setFilterArea] = React.useState(1);
  const [areaSelectd, setAreaSelectd] = React.useState("");

  React.useEffect(() => {
    if (terryState.length > 0) {
      setLisTerry(terryState);
    }
  }, [terryState]);

  React.useEffect(() => {
    setFilterArea(areas);
  }, [areas]);

  React.useEffect(() => {
    //console.log(session);
    let newlist = [];
    const result = getListSortHnos(hnosData, session, {
      getSemola,
      isSemOk,
    });
    setListNewHnos(result);
    if (result.length > 0) {
      result.map((hno) => {
        if (hno.nombre !== "Admin") {
          newlist.push({
            key: hno.id,
            text: `${hno.nombre} ${hno.apellidos}`,
            value: hno.nombre,
          });
        }
      });
      setListHnos(newlist);
    } else {
      setListHnos([]);
    }
  }, [hnosData]);

  React.useEffect(() => {
    let lisfiltered = [];
    if (filterType === 1) {
      lisfiltered = terryState;
    }
    if (filterType === 2) {
      lisfiltered = terryState.filter((ter) => ter.stateTD);
    }
    if (filterType === 3) {
      lisfiltered = terryState.filter((ter) => !ter.stateTD);
    }
    if (hnohasTerry !== "") {
      lisfiltered = lisfiltered.filter((ter) => ter.hnohasTD === hnohasTerry);
    }
    if (areaSelectd !== "") {
      const terarea = areas.find((us) => us.text === areaSelectd);
      lisfiltered = lisfiltered.filter((ter) => ter.grupoTD === terarea.key);
    }
    setLisTerry(lisfiltered);
  }, [filterType, hnohasTerry, areaSelectd]);

  const handleList = (value) => {
    if (value.length > 0) {
      const newlist = lisHnosFix.filter((elem) =>
        elem.value.toLowerCase().includes(value.toLowerCase())
      );
      setListHnos(newlist);
    }
  };

  const handleFormButton = () => {
    handleAction("", 1);
  };

  return (
    <div className="listTerContainer">
      <div className="listFilterOpt">
        {session.lebel === 1 ? (
          <div className="mr-5">
            <ButtonCus
              key="newbtn"
              icono={{
                position: "left",
                url: "iconos/ubicacion.png",
                classi: "icono-ms mr-2",
              }}
              data={{
                label: {
                  text: "nuevo",
                  textype: "uper",
                },
                width: "90px",
                height: "auto",
                border: {
                  color: "white",
                  width: "1px",
                },
              }}
              colors={{
                ct: "white",
                cb: "orange",
              }}
              onClick={handleFormButton}
            />
          </div>
        ) : null}
        <div style={{ width: "320px", marginLeft: "25px" }}>
          <RadioButtonComponent
            name="tipoter"
            label={{
              text: "Filtrar listado",
              align: "left",
              posit: "top",
              color: "rgb(79, 91, 121)",
              minw: 0,
            }}
            list={[
              { key: 1, value: "Todos" },
              { key: 2, value: "Trabajado" },
              { key: 3, value: "Disponibles" },
            ]}
            valini={1}
            valfin={filterType}
            object={false}
            position="Row"
            disabled={false}
            setState={setFilterType}
          />
        </div>
        <div style={{ width: "210px" }}>
          {listHnos.length > 0 ? (
            <div>
              <SelectComponent
                name="hnohasTerry"
                type="entero"
                lista={listHnos}
                label={{
                  text: "filtrar por Hno/a",
                  align: "left",
                  posit: "top",
                  minw: 130,
                }}
                width={180}
                height={listHnos.length * 30 > 350 ? 350 : listHnos.length * 30}
                top={207}
                valini={hnohasTerry}
                valfin={hnohasTerry}
                object={false}
                size={15}
                disabled={false}
                editable={true}
                color={{ label: "white", options: "navy" }}
                setState={setHnohasTerry}
                setuplist={handleList}
                setStatelist={setIsDespl}
              />
            </div>
          ) : null}
        </div>
        {filterArea.length > 0 ? (
          <div>
            <SelectComponent
              name="areaSelectd"
              type="entero"
              lista={filterArea}
              label={{
                text: "filtrar Zona",
                align: "left",
                posit: "top",
                minw: 130,
              }}
              width={135}
              height={
                filterArea.length * 30 > 350 ? 350 : filterArea.length * 30
              }
              top={207}
              valini={areaSelectd}
              valfin={areaSelectd}
              object={false}
              size={9}
              disabled={false}
              color={{ label: "white", options: "navy" }}
              setState={setAreaSelectd}
              setStatelist={setIsDespl}
            />
          </div>
        ) : null}
      </div>
      <div className="listViewContainer">
        <ListViewTerritory
          lisTerry={lisTerry}
          setArchive={setArchive}
          handleAction={handleAction}
          session={session}
          hnosData={listNewHnos}
        />
      </div>
    </div>
  );
};

export default ListGenTerritories;
