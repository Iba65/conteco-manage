import React from "react";

const ListDateExhibView = ({ mes, user, data }) => {
  return (
    <div className="contentExDates">
      <div className="headerExDates">
        <h3>
          Fechas de {mes} para {user}
        </h3>
      </div>
      <div>
        {data.map((fec) => (
          <div key={fec.idHE} className="lineExDates">
            {fec.idHE} {fec.secdayHE}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListDateExhibView;
