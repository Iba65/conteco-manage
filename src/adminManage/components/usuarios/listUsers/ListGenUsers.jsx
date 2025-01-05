import React from "react";
import "./../cssUsers/userStyle.css";
import { useGeneralContext } from "./../../../../commons/context/GeneralContext";
import { userTypes, groups } from "./../../../../commons/utils/fixed";
import {
  buildListData,
  buildListMindata,
} from "./../../../../commons/utils/funcionsApp";
import ButtonCus from "./../../../../commons/libraray/buttons/ButtonCus";
import InputComponent from "./../../../../commons/libraray/inputComponent/InputComponent";
import SelectComponent from "./../../../../commons/libraray/selectComponent/SelectComponent";
import ListUsersHeader from "./ListUsersHeader";
import ListUsersLine from "./ListUsersLine";

const ListGenUsers = ({ hnosData, session, handleAction }) => {
  const { isSemOk, getSemola } = useGeneralContext();
  const [listHnos, setListHnos] = React.useState([]);
  const [userFind, setUserFind] = React.useState("");
  const [idDespl, setIsDespl] = React.useState(false);
  const [viewData, setViewData] = React.useState(false);
  const [filterType, setfilterType] = React.useState([]);
  const [typeSelect, setTypeSelect] = React.useState("");
  const [filterGroup, setfilterGroup] = React.useState([]);
  const [groupSelect, setGroupSelect] = React.useState("");

  React.useEffect(() => {
    setfilterType(userTypes);
  }, [userTypes]);
  React.useEffect(() => {
    setfilterGroup(groups);
  }, [groups]);
  React.useEffect(() => {
    //setListHnos(hnosData);
    //console.log(hnosData);
    if (session.permitted) {
      const semola = getSemola(session.seed, import.meta.env.VITE_APP_SEMILLA);
      const amaranto = isSemOk(semola);
      if (amaranto) {
        setListHnos(
          buildListData(
            hnosData,
            import.meta.env.VITE_APP_SEMILLA,
            session,
            getSemola
          )
        );
      } else {
        setListHnos(
          buildListMindata(hnosData, import.meta.env.VITE_APP_SEMILLA)
        );
      }
      setViewData(amaranto);
    }
  }, [hnosData]);
  React.useEffect(() => {}, []);
  React.useEffect(() => {
    if (typeSelect !== "" || userFind !== "" || groupSelect !== "") {
      let newlist = buildListData(
        hnosData,
        import.meta.env.VITE_APP_SEMILLA,
        session,
        getSemola
      );
      if (typeSelect !== "") {
        const ustypeid = userTypes.find((us) => us.text === typeSelect);
        newlist = newlist.filter((hno) => hno.tipo === ustypeid.key);
      }
      if (userFind !== "") {
        newlist = newlist.filter(
          (hno) =>
            `${hno.nombre} ${hno.apellidos}`
              .toLowerCase()
              .includes(userFind.toLowerCase()) ||
            hno.usuario.toLowerCase().includes(userFind.toLowerCase())
        );
      }
      if (groupSelect !== "") {
        const usgroup = groups.find((us) => us.text === groupSelect);
        newlist = newlist.filter((hno) => hno.grupoSer === usgroup.key);
      }
      setListHnos(newlist);
    } else {
      if (
        listHnos.length !== hnosData.length - 1 &&
        listHnos.length > 0 &&
        hnosData.length > 0
      ) {
        if (session.permitted) {
          setListHnos(
            buildListData(
              hnosData,
              import.meta.env.VITE_APP_SEMILLA,
              session,
              getSemola
            )
          );
        }
      }
    }
  }, [typeSelect, userFind, groupSelect]);

  const handleFormButton = () => {
    handleAction("", 1);
  };

  return (
    <div className="listUserContainer">
      <div className="listUserSuper">
        <div className="listFilterUser">
          {session.lebel === 1 ? (
            <div className="mr-5">
              <ButtonCus
                key="newbtn"
                icono={{
                  position: "left",
                  url: "iconos/Acctions/newUser.png",
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
          <div className="customFieldContiner ml-5 mr-5">
            <InputComponent
              name="userFind"
              label={{
                text: "Buscar Usuario",
                align: "left",
                posit: "top",
                minw: 130,
              }}
              valini={userFind}
              object={false}
              width={175}
              size={15}
              foco={false}
              leftIco="iconos/Acctions/lupa.png"
              setState={setUserFind}
            />
          </div>
          {filterType.length > 0 ? (
            <div className="ml-3" style={{ minWidth: "150px" }}>
              <SelectComponent
                name="typeSelect"
                type="entero"
                lista={filterType}
                label={{
                  text: "filtrar por tipo",
                  align: "left",
                  posit: "top",
                  minw: 0,
                }}
                width={135}
                top={207}
                valini={typeSelect}
                valfin={typeSelect}
                object={false}
                size={9}
                disabled={false}
                color={{ label: "white", options: "navy" }}
                setState={setTypeSelect}
                setStatelist={setIsDespl}
              />
            </div>
          ) : null}
          {filterGroup.length > 0 ? (
            <div className="ml-3">
              <SelectComponent
                name="groupSelect"
                type="entero"
                lista={filterGroup}
                label={{
                  text: "filtrar por grupo",
                  align: "left",
                  posit: "top",
                  minw: 0,
                }}
                width={135}
                top={207}
                valini={groupSelect}
                valfin={groupSelect}
                object={false}
                size={9}
                disabled={false}
                color={{ label: "white", options: "navy" }}
                setState={setGroupSelect}
                setStatelist={setIsDespl}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className="listUserTitle">Listado de Usuarios</div>
      <div className="listHeaderContainer">
        <ListUsersHeader permitted={viewData} />
      </div>
      <div className="dataContainer">
        {listHnos.length > 0
          ? listHnos.map(
              (lit, index) =>
                lit.id !== "000" && (
                  <ListUsersLine
                    key={lit.id}
                    data={lit}
                    index={index}
                    permitted={viewData}
                    session={session}
                    handleAction={handleAction}
                    getSemola={getSemola}
                  />
                )
            )
          : null}
      </div>
    </div>
  );
};

export default ListGenUsers;
