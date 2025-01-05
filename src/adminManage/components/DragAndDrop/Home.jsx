/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./../css/General.css";
import HeaderTop from "../components/headers/HeaderTop";
import GroupTopMenu from "../components/headers/GroupTopMenu";
import ActionsHeader from "../components/headers/ActionsHeader";
import useHeaderTop from "../common/hooks/useHeaderTop";
import BodyHome from "../components/body/BodyHome";
import { ArtiContext } from "../common/context/artiContex/ArtiContext";
import DragAndDrop from "../components/DragAndDrop";
import Cuadrante from "../components/Cuadrante";

const Home = () => {
  const { artiState, artiDispatch } = useContext(ArtiContext);
  const {
    generalState,
    generalDispatch,
    loadState,
    loadfuncState,
    loginUser,
    setgroup,
    setMobile,
  } = useHeaderTop();
  const [groupActive, setGroupActive] = useState(0);
  const [artiGroups, setArtiGroups] = useState([]);

  useEffect(() => {
    setMobile();
    loadState(artiDispatch);
  }, []);

  useEffect(() => {
    loadfuncState(setArtiGroups, artiState, "articList");
  }, [artiState.articList]);

  useEffect(() => {
    if (generalState?.grupac !== 0) {
      setGroupActive(generalState.grupac);
    }
  }, [generalState.grupac]);

  return (
    <div className="principalContainer">
      <HeaderTop
        generalState={generalState}
        generalDispatch={generalDispatch}
        loginUser={loginUser}
      />
      {artiGroups.length > 0 ? (
        <GroupTopMenu
          generalState={generalState}
          artiGroups={artiGroups}
          setgroup={setgroup}
        />
      ) : null}
      <ActionsHeader />
      {/* 
      {groupActive !== 0 ? (
        <BodyHome artiGroups={artiGroups} group={groupActive} />
      ) : null}
      <DragAndDrop />
       */}
      <Cuadrante year={2024} month={10} />
    </div>
  );
};

export default Home;
