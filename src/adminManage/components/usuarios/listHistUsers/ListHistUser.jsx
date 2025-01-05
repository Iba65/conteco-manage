import React from "react";
import "./../cssUsers/userStyle.css";
import ListHistUserHeader from "./ListHistUserHeader";
import ListHistUserLine from "./ListHistUserLine";

const ListHistUser = ({ listData }) => {
  const [listHistUser, setListHistUser] = React.useState([]);

  React.useEffect(() => {
    setListHistUser(listData);
  }, [listData]);

  return (
    <div className="listUserContainer">
      <div className="listHeaderContainer">
        <ListHistUserHeader />
      </div>
      <div className="dataContainer">
        {listHistUser.length > 0
          ? listHistUser.map((lit, index) => (
              <ListHistUserLine key={index} data={lit} />
            ))
          : null}
      </div>
    </div>
  );
};

export default ListHistUser;
