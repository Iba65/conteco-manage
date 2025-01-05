import React from "react";

const AlertOkModal = ({ options, data, functions, children }) => {
  const [windowDimensions, setWindowDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { width = 0, height = 0 } = options;
  const { title } = data;
  const { closefunc, validfunc } = functions;
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
          <div className="headerModalTitle ml-3">{title}</div>
          <div className="headerModalClose">
            <img
              className="icono-xs mr-1"
              src={`iconos/Acctions/cerrar.png`}
              alt="volver"
              onClick={() => closefunc(false)}
            />
          </div>
        </div>
        <div ref={bod} className="bodyModal">
          {children}
        </div>
        <div className="footerOkModal">
          <div>
            <button onClick={() => validfunc()}>ENTIENDO</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertOkModal;
