import React from "react";

const AlertModal = ({ options, data, functions, children }) => {
  const [windowDimensions, setWindowDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { actionBack, width = 0, height = 0 } = options;
  const { title } = data;
  const { backfunc = null, closefunc, validfunc } = functions;
  const conten = React.useRef();
  const bod = React.useRef();
  const genconten = React.useRef();

  React.useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    // Limpia el evento cuando el componente se desmonte
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    genconten.current.style.bottom = `${windowDimensions.height}`;
  }, [windowDimensions]);

  React.useEffect(() => {
    if (width !== 0) {
      conten.current.style.minWidth = `${width}px`;
    }
    if (height !== 0) {
      conten.current.style.height = `${height}px`;
      bod.current.style.height = `${height - 90}px`;
    }
  }, [width]);
  return (
    <div ref={genconten} className="arcmodContainer">
      <div ref={conten} className="arcmodFormContiner">
        <div className="headerModal">
          <div className="headerModalBack">
            {actionBack ? (
              <img
                className="icono-xs"
                src={`iconos/Acctions/atrasColor.png`}
                alt="volver"
                onClick={backfunc}
              />
            ) : null}
          </div>
          <div className="headerModalTitle">{title}</div>
          <div className="headerModalClose">
            <img
              className="icono-xs mr-1"
              src={`iconos/Acctions/cerrar.png`}
              alt="volver"
              onClick={closefunc}
            />
          </div>
        </div>
        <div ref={bod} className="bodyModal">
          {children}
        </div>
        <div className="footerModal">
          <div>
            <button onClick={() => validfunc()}>VALIDAR</button>
          </div>
          <div>
            <button onClick={closefunc}>CANCELAR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
