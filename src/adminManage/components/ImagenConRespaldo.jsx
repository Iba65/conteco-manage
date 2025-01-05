import React from "react";

const ImagenConRespaldo = ({ src, alt, fallback, imgsize = null }) => {
  const [imagenSrc, setImagenSrc] = React.useState();
  // Función que maneja el error al cargar la imagen y cambia al fallback
  const handleImageError = () => {
    setImagenSrc(fallback);
  };

  React.useEffect(() => {
    setImagenSrc(src);
  }, [src]);

  return (
    <img
      src={imagenSrc}
      alt={alt}
      onError={handleImageError}
      style={
        imgsize !== null
          ? {
              width: imgsize.width,
              height: imgsize.height,
              border: "solid 2px gray",
            }
          : null
      } // Puedes ajustar el tamaño si lo deseas
    />
  );
};

export default ImagenConRespaldo;
