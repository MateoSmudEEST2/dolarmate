import { View, Text, TextInput, ScrollView } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { obtenerDolares } from "../lib/obtenerdato";
import { useEffect, useState } from "react";

export function Conversor() {
  const filtrarDolar = (casa) => {
    const casaFiltrada = dolares.find((dolar) => dolar.casa === casa);
    return casaFiltrada ? casaFiltrada : null;
  };

  const [inputValue, setInputValue] = useState("");
  const [dolares, setDolar] = useState([]);
  const [selectedCasa, setSelectedCasa] = useState(null);
  const [selectedTipo, setSelectedTipo] = useState("venta");
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    obtenerDolares().then((dolares) => {
      setDolar(dolares);
    });
  }, []);

  const calcularConversion = (text) => {
    const numericValue = text.replace(/[^0-9,]/g, "").replace(",", ".");
    setInputValue(numericValue);
    if (selectedCasa) {
      const casaFiltrada = filtrarDolar(selectedCasa);
      if (casaFiltrada) {
        const tasa =
          selectedTipo === "compra" ? casaFiltrada.compra : casaFiltrada.venta;
        const conversion =
          selectedTipo === "compra"
            ? parseFloat(numericValue) / tasa // Pesos a dólares
            : parseFloat(numericValue) * tasa; // Dólares a pesos
        setResultado(conversion);
      } else {
        setResultado(null);
      }
    }
  };

  let index = 0;
  const data = dolares.map((item) => ({
    key: index++,
    label: item.nombre,
    value: item.casa,
  }));

  const tipoData = [
    { key: 0, label: "Pesos a Dolares", value: "compra" },
    { key: 1, label: "Dolares a Pesos", value: "venta" },
  ];

  const initValue = selectedCasa
    ? data.find((item) => item.value === selectedCasa)?.label
    : "Selecciona una Moneda!";

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-3xl font-bold text-center text-emerald-600 mb-6">
        Conversor de Dólares a Pesos
      </Text>
      <ModalSelector
        data={data}
        initValue={initValue}
        supportedOrientations={["landscape"]}
        accessible={true}
        scrollViewAccessibilityLabel={"Scrollable options"}
        cancelButtonAccessibilityLabel={"Cancel Button"}
        onChange={(option) => {
          setSelectedCasa(option.value);
          if (inputValue) {
            const casaFiltrada = filtrarDolar(option.value);
            if (casaFiltrada) {
              const tasa =
                selectedTipo === "compra"
                  ? casaFiltrada.compra
                  : casaFiltrada.venta;
              const conversion =
                selectedTipo === "compra"
                  ? parseFloat(inputValue.replace(",", ".")) / tasa
                  : parseFloat(inputValue.replace(",", ".")) * tasa;
              setResultado(conversion);
            } else {
              setResultado(null);
            }
          }
        }}
        className="mb-4"
      />
      <ModalSelector
        data={tipoData}
        initValue={
          selectedTipo === "compra" ? "Pesos a Dolares" : "Dolares a Pesos"
        }
        supportedOrientations={["landscape"]}
        accessible={true}
        scrollViewAccessibilityLabel={"Scrollable options"}
        cancelButtonAccessibilityLabel={"Cancel Button"}
        onChange={(option) => {
          setSelectedTipo(option.value);
          if (inputValue && selectedCasa) {
            const casaFiltrada = filtrarDolar(selectedCasa);
            if (casaFiltrada) {
              const tasa =
                option.value === "compra"
                  ? casaFiltrada.compra
                  : casaFiltrada.venta;
              const conversion =
                option.value === "compra"
                  ? parseFloat(inputValue.replace(",", ".")) / tasa
                  : parseFloat(inputValue.replace(",", ".")) * tasa;
              setResultado(conversion);
            } else {
              setResultado(null);
            }
          }
        }}
        className="mb-4"
      />
      <TextInput
        editable
        keyboardType="numeric"
        onChangeText={calcularConversion}
        value={inputValue}
        placeholder="Ingresa cantidad"
        className="m-3 p-3 bg-emerald-600 text-xl text-white rounded-lg"
      />
      {resultado !== null && (
        <View className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <Text className="text-xl text-gray-800">
            {selectedTipo === "compra"
              ? "Dólares comprados: "
              : "Valor en pesos: "}
            <Text className="font-bold">{resultado.toFixed(2)}</Text>
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
