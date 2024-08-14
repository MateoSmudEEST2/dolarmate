import { Text, View, Button, Linking, Share } from "react-native";

export function About() {
  const shareApp = () => {
    Share.share({
      message:
        "Esta aplicación muestra las cotizaciones del dólar y te permite hacer conversiones. ¡Descárgala ahora! https://github.com/MateoSmudEEST2/DolarMate/releases/",
    });
  };

  return (
    <View className="flex-1 p-5 items-center">
      <Text className="text-2xl font-bold mb-4">Sobre la Aplicación</Text>
      <Text className="text-lg mb-2">Versión: 1.5.0</Text>
      <Text className="text-lg mb-2">Desarrollado con React Native y Expo</Text>
      <Text className="text-lg mb-2">Mateo Smud</Text>
      <Text className="text-lg mb-4">
        API usada:{" "}
        <Text
          className="text-emerald-500"
          onPress={() => Linking.openURL("https://dolarapi.com/")}
        >
          https://dolarapi.com/
        </Text>
      </Text>
      <Button title="Compartir Aplicación" onPress={shareApp} color="#047857" />
    </View>
  );
}
