import { Tabs } from "expo-router";

import {
  CotizacionesIcon,
  InfoIcon,
  CalculadoraIcon,
} from "../../components/Icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffff",
        tabBarActiveBackgroundColor: "#059669",
        tabBarStyle: {
          height: 60,
        },
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Cotizaciones del Dolar",
          tabBarIcon: ({ color }) => <CotizacionesIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="conversor"
        options={{
          title: "Calculadora del Dolar",
          tabBarIcon: ({ color }) => <CalculadoraIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "Informacion de la App",
          tabBarIcon: ({ color }) => <InfoIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
