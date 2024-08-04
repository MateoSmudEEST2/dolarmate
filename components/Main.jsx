import { StyleSheet, View, ScrollView } from "react-native";
import { obtenerDolares } from "../lib/obtenerdato";
import { useEffect, useState } from "react";
import { DolarCard } from "./DolarCard";

export function Main() {
  const [dolares, setDolar] = useState([]);

  useEffect(() => {
    obtenerDolares().then((dolares) => {
      setDolar(dolares);
    });
  }, []);

  return (
    <View style={styles.container} className="bg-emerald-900">
      <ScrollView>
        {dolares.map((dolar, index) => (
          <DolarCard
            key={index}
            nombre={dolar.nombre}
            compra={dolar.compra}
            venta={dolar.venta}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  dolartitulo: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
