import React from "react";
import { headerListHistUser } from "./AuxiHistUser";

const ListHistUserHeader = () => {
  return (
    <>
      <div
        style={{
          userSelect: "none",
          width: headerListHistUser[0].with,
          backgroundColor: headerListHistUser[0].bc,
          textAlign: headerListHistUser[0].align,
          fontSize: headerListHistUser[0].title.fsize,
          fontWeight: headerListHistUser[0].title?.fw,
          borderLeft: headerListHistUser[0]?.bol,
          borderRight: headerListHistUser[0]?.bor,
        }}
      >
        {headerListHistUser[0].title.tit}
      </div>
      <div
        style={{
          userSelect: "none",
          width: headerListHistUser[1].with,
          backgroundColor: headerListHistUser[1].bc,
          textAlign: headerListHistUser[1].align,
          fontSize: headerListHistUser[1].title.fsize,
          fontWeight: headerListHistUser[1].title?.fw,
          borderRight: headerListHistUser[1]?.bor,
        }}
      >
        {headerListHistUser[1].title.tit}
      </div>
      <div
        style={{
          userSelect: "none",
          width: headerListHistUser[2].with,
          backgroundColor: headerListHistUser[2].bc,
          textAlign: headerListHistUser[2].align,
          fontSize: headerListHistUser[2].title.fsize,
          fontWeight: headerListHistUser[2].title?.fw,
          borderRight: headerListHistUser[2]?.bor,
        }}
      >
        {headerListHistUser[2].title.tit}
      </div>
      <div
        style={{
          userSelect: "none",
          width: headerListHistUser[3].with,
          backgroundColor: headerListHistUser[3].bc,
          textAlign: headerListHistUser[3].align,
          fontSize: headerListHistUser[3].title.fsize,
          fontWeight: headerListHistUser[3].title?.fw,
          borderRight: headerListHistUser[3]?.bor,
        }}
      >
        {headerListHistUser[3].title.tit}
      </div>
      <div
        style={{
          userSelect: "none",
          width: headerListHistUser[4].with,
          backgroundColor: headerListHistUser[4].bc,
          textAlign: headerListHistUser[4].align,
          fontSize: headerListHistUser[4].title.fsize,
          fontWeight: headerListHistUser[4].title?.fw,
          borderRight: headerListHistUser[4]?.bor,
        }}
      >
        {headerListHistUser[4].title.tit}
      </div>
    </>
  );
};

export default ListHistUserHeader;
