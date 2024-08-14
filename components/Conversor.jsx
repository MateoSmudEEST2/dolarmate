import { View, Text, TextInput, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
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

  const tipoData = [
    { key: 0, label: "Pesos a Dólares", value: "compra" },
    { key: 1, label: "Dólares a Pesos", value: "venta" },
  ];

  const initValue = selectedCasa
    ? dolares.find((item) => item.casa === selectedCasa)?.nombre
    : "Selecciona una Moneda!";

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-3xl font-bold text-center text-emerald-600 mb-6">
        Conversor de Dólares a Pesos
      </Text>
      <View className="mb-4">
        <Text className="text-lg font-bold mb-2">Selecciona una Moneda:</Text>
        <Picker
          selectedValue={selectedCasa}
          onValueChange={(value) => {
            setSelectedCasa(value);
            if (inputValue) {
              const casaFiltrada = filtrarDolar(value);
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
          className="bg-white border border-gray-300 rounded-lg"
        >
          <Picker.Item label="Selecciona una Moneda!" value={null} />
          {dolares.map((item) => (
            <Picker.Item
              key={item.casa}
              label={item.nombre}
              value={item.casa}
            />
          ))}
        </Picker>
      </View>
      <View className="mb-4">
        <Text className="text-lg font-bold mb-2">Tipo de Conversión:</Text>
        <Picker
          selectedValue={selectedTipo}
          onValueChange={(value) => {
            setSelectedTipo(value);
            if (inputValue && selectedCasa) {
              const casaFiltrada = filtrarDolar(selectedCasa);
              if (casaFiltrada) {
                const tasa =
                  value === "compra" ? casaFiltrada.compra : casaFiltrada.venta;
                const conversion =
                  value === "compra"
                    ? parseFloat(inputValue.replace(",", ".")) / tasa
                    : parseFloat(inputValue.replace(",", ".")) * tasa;
                setResultado(conversion);
              } else {
                setResultado(null);
              }
            }
          }}
          className="bg-white border border-gray-300 rounded-lg"
        >
          {tipoData.map((item) => (
            <Picker.Item key={item.key} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
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
