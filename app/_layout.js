import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function Layout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f8f8f8", // Color de fondo ligeramente gris
            elevation: 4, // Sombra para dar un efecto de profundidad
            shadowColor: "#000", // Color de la sombra
            shadowOffset: { width: 0, height: 2 }, // Offset de la sombra
            shadowOpacity: 0.1, // Opacidad de la sombra
            shadowRadius: 4, // Radio de la sombra
          },
          headerTintColor: "#333", // Color del texto y íconos
          headerTitle: "EcoMate",
          headerTitleAlign: "center", // Centrar el título
          headerTitleStyle: {
            fontWeight: "bold", // Estilo del título
            fontSize: 18, // Tamaño del texto
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
