import React from "react";
import { headerListTerr } from "./../AuxiTerr";

const ListTerriHeader = () => {
  return (
    <>
      <div
        style={{
          userSelect: "none",
          width: headerListTerr[0].with,
          backgroundColor: headerListTerr[0].bc,
          textAlign: headerListTerr[0].align,
          fontSize: headerListTerr[0].title.fsize,
          fontWeight: headerListTerr[0].title?.fw,
          borderLeft: headerListTerr[0]?.bol,
          borderRight: headerListTerr[0]?.bor,
        }}
      >
        {headerListTerr[0].title.tit}
      </div>
      <div
        style={{
          userSelect: "none",
          width: headerListTerr[1].with,
          backgroundColor: headerListTerr[1].bc,
          textAlign: headerListTerr[1].align,
          fontSize: headerListTerr[1].title.fsize,
          fontWeight: headerListTerr[1].title?.fw,
          borderRight: headerListTerr[1]?.bor,
        }}
      >
        {headerListTerr[1].title.tit}
      </div>
      <div
        style={{
          userSelect: "none",
          width: headerListTerr[2].with,
          backgroundColor: headerListTerr[2].bc,
          textAlign: headerListTerr[2].align,
          fontSize: headerListTerr[2].title.fsize,
          fontWeight: headerListTerr[2].title?.fw,
          borderRight: headerListTerr[2]?.bor,
        }}
      >
        {headerListTerr[2].title.tit}
      </div>
      <div
        style={{
          userSelect: "none",
          width: headerListTerr[3].with,
          backgroundColor: headerListTerr[3].bc,
          textAlign: headerListTerr[3].align,
          fontSize: headerListTerr[3].title.fsize,
          fontWeight: headerListTerr[3].title?.fw,
          borderRight: headerListTerr[3]?.bor,
        }}
      >
        {headerListTerr[3].title.tit}
      </div>
      <div
        style={{
          userSelect: "none",
          width: headerListTerr[4].with,
          backgroundColor: headerListTerr[4].bc,
          textAlign: headerListTerr[4].align,
          fontSize: headerListTerr[4].title.fsize,
          fontWeight: headerListTerr[4].title?.fw,
          borderRight: headerListTerr[4]?.bor,
        }}
      >
        {headerListTerr[4].title.tit}
      </div>
      <div
        style={{
          userSelect: "none",
          width: headerListTerr[5].with,
          backgroundColor: headerListTerr[5].bc,
          textAlign: headerListTerr[5].align,
          fontSize: headerListTerr[5].title.fsize,
          fontWeight: headerListTerr[5].title?.fw,
          borderRight: headerListTerr[5]?.bor,
        }}
      >
        {headerListTerr[5].title.tit}
      </div>
      <div
        style={{
          userSelect: "none",
          width: headerListTerr[6].with,
          backgroundColor: headerListTerr[6].bc,
          textAlign: headerListTerr[6].align,
          fontSize: headerListTerr[6].title.fsize,
          fontWeight: headerListTerr[6].title?.fw,
          borderRight: headerListTerr[6]?.bor,
        }}
      >
        {headerListTerr[6].title.tit}
      </div>
      <div
        style={{
          userSelect: "none",
          width: headerListTerr[7].with,
          backgroundColor: headerListTerr[7].bc,
          textAlign: headerListTerr[7].align,
          fontSize: headerListTerr[7].title.fsize,
          fontWeight: headerListTerr[7].title?.fw,
          borderRight: headerListTerr[7]?.bor,
        }}
      >
        {headerListTerr[7].title.tit}
      </div>
    </>
  );
};

export default ListTerriHeader;
