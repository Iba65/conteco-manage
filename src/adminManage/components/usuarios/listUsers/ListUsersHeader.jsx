import React from "react";
import { headerListUsers } from "./AuxiUsers";

const ListUsersHeader = ({ permitted }) => {
  return (
    <>
      <div
        style={{
          userSelect: "none",
          width: headerListUsers[0].with,
          backgroundColor: headerListUsers[0].bc,
          textAlign: headerListUsers[0].align,
          fontSize: headerListUsers[0].title.fsize,
          fontWeight: headerListUsers[0].title?.fw,
          borderLeft: headerListUsers[0]?.bol,
          borderRight: headerListUsers[0]?.bor,
        }}
      >
        {headerListUsers[0].title.tit}
      </div>
      <div
        style={{
          userSelect: "none",
          width: headerListUsers[1].with,
          backgroundColor: headerListUsers[1].bc,
          textAlign: headerListUsers[1].align,
          fontSize: headerListUsers[1].title.fsize,
          fontWeight: headerListUsers[1].title?.fw,
          borderRight: headerListUsers[1]?.bor,
        }}
      >
        {headerListUsers[1].title.tit}
      </div>
      <div
        style={{
          userSelect: "none",
          width: headerListUsers[2].with,
          backgroundColor: headerListUsers[2].bc,
          textAlign: headerListUsers[2].align,
          fontSize: headerListUsers[2].title.fsize,
          fontWeight: headerListUsers[2].title?.fw,
          borderRight: headerListUsers[2]?.bor,
        }}
      >
        {headerListUsers[2].title.tit}
      </div>
      {permitted ? (
        <>
          <div
            style={{
              userSelect: "none",
              width: headerListUsers[3].with,
              backgroundColor: headerListUsers[3].bc,
              textAlign: headerListUsers[3].align,
              fontSize: headerListUsers[3].title.fsize,
              fontWeight: headerListUsers[3].title?.fw,
              borderRight: headerListUsers[3]?.bor,
            }}
          >
            {headerListUsers[3].title.tit}
          </div>
          <div
            style={{
              userSelect: "none",
              width: headerListUsers[4].with,
              backgroundColor: headerListUsers[4].bc,
              textAlign: headerListUsers[4].align,
              fontSize: headerListUsers[4].title.fsize,
              fontWeight: headerListUsers[4].title?.fw,
              borderRight: headerListUsers[4]?.bor,
            }}
          >
            {headerListUsers[4].title.tit}
          </div>
        </>
      ) : null}
      <div
        style={{
          userSelect: "none",
          width: headerListUsers[5].with,
          backgroundColor: headerListUsers[5].bc,
          textAlign: headerListUsers[5].align,
          fontSize: headerListUsers[5].title.fsize,
          fontWeight: headerListUsers[5].title?.fw,
          borderRight: headerListUsers[5]?.bor,
        }}
      >
        {headerListUsers[5].title.tit}
      </div>
      <div
        style={{
          userSelect: "none",
          width: headerListUsers[6].with,
          backgroundColor: headerListUsers[6].bc,
          textAlign: headerListUsers[6].align,
          fontSize: headerListUsers[6].title.fsize,
          fontWeight: headerListUsers[6].title?.fw,
          borderRight: headerListUsers[6]?.bor,
        }}
      >
        {headerListUsers[6].title.tit}
      </div>
      <div
        style={{
          userSelect: "none",
          width: permitted ? headerListUsers[7].with : 29,
          backgroundColor: headerListUsers[7].bc,
          textAlign: headerListUsers[7].align,
          fontSize: headerListUsers[7].title.fsize,
          fontWeight: headerListUsers[7].title?.fw,
          borderRight: headerListUsers[7]?.bor,
        }}
      >
        {permitted ? headerListUsers[7].title.tit : "AC"}
      </div>
    </>
  );
};

export default ListUsersHeader;
