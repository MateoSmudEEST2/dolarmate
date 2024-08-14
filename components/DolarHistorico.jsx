import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, ScrollView, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { Picker } from "@react-native-picker/picker";
import { obtenerDolares } from "../lib/obtenerdato";
import { DolarCardS } from "./DolarCardSimple";
import moment from "moment";

const HistoricoPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCasa, setSelectedCasa] = useState("");
  const [dolares, setDolares] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const scrollViewRef = useRef(null); // Crear referencia para el ScrollView

  useEffect(() => {
    obtenerDolares().then((dolares) => {
      setDolares(dolares);
    });
  }, []);

  useEffect(() => {
    if (selectedDate && selectedCasa) {
      fetchData();
    }
  }, [selectedDate, selectedCasa]);

  const onDayPress = (day) => {
    if (day.dateString <= moment().format("YYYY-MM-DD")) {
      setSelectedDate(day.dateString);
    }
  };

  const filtrarDolar = (casa) => {
    const casaFiltrada = dolares.find((dolar) => dolar.casa === casa);
    return casaFiltrada ? casaFiltrada : null;
  };

  const fetchData = async () => {
    if (!selectedDate || !selectedCasa) {
      alert("Por favor selecciona una fecha y una casa de cambio.");
      return;
    }

    const [year, month, day] = selectedDate.split("-");
    const url = `https://api.argentinadatos.com/v1/cotizaciones/dolares/${selectedCasa}/${year}/${month}/${day}`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      setData(null); // Limpia los datos anteriores antes de actualizar

      const dolarFiltrado = filtrarDolar(selectedCasa);
      if (dolarFiltrado) {
        setData({
          ...dolarFiltrado,
          fecha: selectedDate,
          compra: json.compra,
          venta: json.venta,
        });
      }
      setError(null);

      // Desplazar al componente después de obtener los datos
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 400, animated: true }); // Ajusta el valor de `y` según sea necesario
      }
    } catch (err) {
      setError("Error al obtener los datos");
      setData(null);
    }
  };

  const today = moment().format("YYYY-MM-DD");

  return (
    <ScrollView ref={scrollViewRef}>
      <View className="p-4 flex-1">
        <Text className="text-2xl font-bold mb-4 text-center text-emerald-900">
          Selecciona una fecha y una casa de cambio:
        </Text>

        <View className="mb-4">
          <Text className="text-lg font-bold mb-2 text-emerald-700">
            Fecha seleccionada:
          </Text>
          <TouchableOpacity
            style={{ padding: 10, backgroundColor: "#d1fae5", borderRadius: 5 }}
            disabled={true}
          >
            <Text className="text-lg text-emerald-800">
              {selectedDate
                ? moment(selectedDate).format("DD/MM/YYYY")
                : "No hay fecha seleccionada"}
            </Text>
          </TouchableOpacity>
        </View>

        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: "emerald",
              selectedTextColor: "green",
            },
          }}
          minDate={"2020-01-01"}
          maxDate={today}
        />

        <Picker
          selectedValue={selectedCasa}
          onValueChange={(itemValue) => setSelectedCasa(itemValue)}
          className="mb-4"
        >
          <Picker.Item label="Seleccionar Casa" value="" />
          {dolares.map((dolar) => (
            <Picker.Item
              key={dolar.casa}
              label={dolar.nombre}
              value={dolar.casa}
            />
          ))}
        </Picker>

        <Button
          title="Obtener datos"
          onPress={fetchData}
          className="bg-emerald-500 text-white p-2 rounded"
        />

        {error ? (
          <Text className="text-red-500 text-center mt-4">{error}</Text>
        ) : data ? (
          <View className="mt-4">
            <DolarCardS
              key={`${data.nombre}-${data.fecha}`}
              nombre={data.nombre}
              compra={data.compra}
              venta={data.venta}
              fecha={data.fecha}
            />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default HistoricoPage;
