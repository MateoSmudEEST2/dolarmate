export async function obtenerDolares() {
  const DATOS_DOLAR = "https://dolarapi.com/v1/dolares";
  const rawData = await fetch(DATOS_DOLAR);
  const json = await rawData.json();

  return json.map((dolar) => {
    const { nombre, compra, venta, casa } = dolar;
    return { nombre, compra, venta, casa };
  });
}
