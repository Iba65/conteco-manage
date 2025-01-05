import React from "react";

const HnosExhibidorList = ({ hnoList, startDrag }) => {
  return (
    <div className="hnosCarritoContainer">
      <h1> Hermanos/as para el Exhibidor</h1>
      <div className="hnosCarritoBody">
        {hnoList.length > 0
          ? hnoList.map((elem) => (
              <div
                key={elem.id}
                className="dropname"
                draggable
                onDragStart={(evt) => startDrag(evt, elem)}
              >{`${elem.nombre} ${elem.apellidos}`}</div>
            ))
          : null}
      </div>
    </div>
  );
};

export default HnosExhibidorList;
