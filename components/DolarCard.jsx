import React, { useState, useEffect } from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";

export function DolarCard({ nombre, compra, venta }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationTime, setNotificationTime] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  useEffect(() => {
    // Solicitar permisos para notificaciones
    const requestNotificationPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("No se pudieron obtener permisos para notificaciones");
      }
    };
    requestNotificationPermissions();

    // Cargar estado de notificaciones desde AsyncStorage
    const loadNotificationSettings = async () => {
      try {
        const enabled = await AsyncStorage.getItem(`notifications_${nombre}`);
        const time = await AsyncStorage.getItem(`notification_time_${nombre}`);
        if (enabled !== null) {
          setNotificationsEnabled(JSON.parse(enabled));
        }
        if (time !== null) {
          setNotificationTime(new Date(time));
        }
      } catch (error) {
        console.error("Failed to load notification settings", error);
      }
    };
    loadNotificationSettings();
  }, [nombre]);

  const handleNotificationToggle = async () => {
    const enabled = !notificationsEnabled;
    setNotificationsEnabled(enabled);
    await AsyncStorage.setItem(
      `notifications_${nombre}`,
      JSON.stringify(enabled),
    );

    if (enabled) {
      // Cancel existing notifications if enabled
      await Notifications.cancelAllScheduledNotificationsAsync();

      // Schedule new notification
      const schedulingOptions = {
        content: {
          title: `Actualización de ${nombre}`,
          body: `Compra: ${compra}, Venta: ${venta}`,
        },
        trigger: {
          hour: notificationTime.getHours(),
          minute: notificationTime.getMinutes(),
          repeats: true,
        },
      };
      await Notifications.scheduleNotificationAsync(schedulingOptions);
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
    setModalVisible(false);
  };

  const handleTimeChange = (event, selectedDate) => {
    setShowDateTimePicker(false);
    if (selectedDate) {
      setNotificationTime(selectedDate);
      AsyncStorage.setItem(
        `notification_time_${nombre}`,
        selectedDate.toISOString(),
      );
    }
  };

  const showDatePicker = () => {
    setShowDateTimePicker(true);
  };

  return (
    <View className="bg-emerald-100 p-5 m-3 rounded-lg shadow-md relative">
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{ position: "absolute", top: 10, right: 10 }}
      >
        <FontAwesome
          name={notificationsEnabled ? "cogs" : "cogs"}
          size={24}
          color={notificationsEnabled ? "green" : "gray"}
        />
      </TouchableOpacity>
      <Text className="text-2xl font-bold mb-2 text-emerald-900">{nombre}</Text>
      <View className="flex-row justify-between">
        <Text className="text-lg">Compra: </Text>
        <Text className="text-lg font-semibold">{compra}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-lg">Venta: </Text>
        <Text className="text-lg font-semibold">{venta}</Text>
      </View>
      <Modal isVisible={isModalVisible}>
        <View className="bg-white p-5 rounded-lg">
          <Text className="text-lg mb-4">Configura las notificaciones</Text>
          <View className="mb-4">
            <Text>Hora de Notificación</Text>
            <TouchableOpacity onPress={showDatePicker} className="border p-2">
              <Text>{notificationTime.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            {showDateTimePicker && (
              <DateTimePicker
                mode="time"
                value={notificationTime}
                is24Hour={true}
                onChange={handleTimeChange}
              />
            )}
          </View>
          <Button
            title={
              notificationsEnabled
                ? "Desactivar Notificaciones"
                : "Activar Notificaciones"
            }
            onPress={handleNotificationToggle}
          />
          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}
