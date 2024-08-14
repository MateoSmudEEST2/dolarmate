import { Text, View } from "react-native";

export function DolarCardS({ nombre, compra, venta, fecha }) {
  return (
    <View className="bg-emerald-100 p-5 m-3 rounded-lg shadow-md relative">
      <Text className="text-2xl font-bold mb-2 text-emerald-900">{nombre}</Text>
      <Text className="text-lg mb-2 text-emerald-800">{fecha}</Text>
      <View className="flex-row justify-between">
        <Text className="text-lg">Compra: </Text>
        <Text className="text-lg font-semibold">{compra}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-lg">Venta: </Text>
        <Text className="text-lg font-semibold">{venta}</Text>
      </View>
    </View>
  );
}
