import React, { useState } from "react";
import "./../css/drag_and_drop.css";
import imag from "./../assets/tiempo.png";

const DragAndDrop = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Tarea 1",
      body: "Descripcion de la tarea 1",
      list: 1,
    },
    {
      id: 2,
      title: "Tarea 2",
      body: "Descripcion de la tarea 2",
      list: 1,
    },
    {
      id: 3,
      title: "Tarea 3",
      body: "Descripcion de la tarea 3",
      list: 1,
    },
    {
      id: 4,
      title: "Tarea 4",
      body: "Descripcion de la tarea 4",
      list: 1,
    },
  ]);

  const getList = (list) => {
    return tasks.filter((item) => item.list === list);
  };

  const startDrag = (evt, item) => {
    evt.dataTransfer.setData("itemID", item.id);
  };

  const draggingOver = (evt) => {
    evt.preventDefault();
  };

  const OnDrop = (evt, list) => {
    let id = evt.dataTransfer.getData("itemID");
    let task = tasks.find((item) => item.id == id);
    task.list = list;
    setTasks([...tasks]);
  };
  return (
    <>
      <h1>
        Arrastrar y Soltar &nbsp;
        <img style={{ width: "40px" }} src={imag} alt="" />
      </h1>
      <br />
      <div className="drag-and-drop">
        <div className="column column--1">
          <h3>tereas por hacer</h3>
          <div
            className="dd-zone"
            droppable="true"
            onDragOver={(evt) => draggingOver(evt)}
            onDrop={(evt) => OnDrop(evt, 1)}
          >
            {getList(1).map((item) => (
              <div
                className="dd-element"
                key={item.id}
                draggable
                onDragStart={(evt) => startDrag(evt, item)}
              >
                <string className="title">{item.title}</string>
                <p className="body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="column column--2">
          <h3>tereas en progreso</h3>
          <div
            className="dd-zone"
            droppable="true"
            onDragOver={(evt) => draggingOver(evt)}
            onDrop={(evt) => OnDrop(evt, 2)}
          >
            {getList(2).map((item) => (
              <div
                className="dd-element"
                key={item.id}
                draggable
                onDragStart={(evt) => startDrag(evt, item)}
              >
                <string className="title">{item.title}</string>
                <p className="body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="column column--3">
          <h3>tereas terminadas</h3>
          <div
            className="dd-zone"
            droppable="true"
            onDragOver={(evt) => draggingOver(evt)}
            onDrop={(evt) => OnDrop(evt, 3)}
          >
            {getList(3).map((item) => (
              <div
                className="dd-element"
                key={item.id}
                draggable
                onDragStart={(evt) => startDrag(evt, item)}
              >
                <string className="title">{item.title}</string>
                <p className="body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DragAndDrop;
