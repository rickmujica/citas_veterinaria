export const formatearFecha = fechaF => {
  const nuevaFecha = new Date(fechaF);
  const opciones = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return nuevaFecha.toLocaleDateString('es-ES', opciones);
};
