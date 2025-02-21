import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, ScrollView, Text } from "@gluestack-ui/themed";
import { jwtDecode } from "jwt-decode";

export default function AuthGuardScreen() {
  return <Container />;
}

const Container = () => {
  const device = useCameraDevice("back");
  const navigation = useNavigation();
  const { hasPermission, requestPermission } = useCameraPermission();

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: async (codes: any) => {
      console.log(codes[0].value);
      try {
        const decoded = jwtDecode(codes[0].value as string);
        console.log(decoded);
        navigation.navigate('totp', { decoded });
      } catch (error) {
        console.error("Failed to decode JWT:", error);
      }
    },
    regionOfInterest: { x: 0.25, y: 0.25, width: 0.5, height: 0.5 },
  });

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <Box flex={1} backgroundColor="$white">
      <ScrollView
        style={{ height: "100%" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {device == null ? (
          <Box>
            <Text>Erro na camera</Text>
          </Box>
        ) : (
          <>
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              codeScanner={codeScanner}
            />
            <Box style={StyleSheet.absoluteFill} pointerEvents="none">
              <Box flex={1} backgroundColor="rgba(0, 0, 0, 0.5)" />
              <HStack>
                <Box flex={1} backgroundColor="rgba(0, 0, 0, 0.5)" />
                <Box h={210} w={210} />
                <Box flex={1} backgroundColor="rgba(0, 0, 0, 0.5)" />
              </HStack>
              <Box flex={1} backgroundColor="rgba(0, 0, 0, 0.5)" />
            </Box>
          </>
        )}
        <BoxCodeReader />
      </ScrollView>
    </Box>
  );
};

const BoxCodeReader = () => {
  return (
    <Box
      alignSelf="center"
      h={200}
      width={200}
      position="absolute"
      top="50%"
      left="50%"
      style={{ transform: [{ translateX: -100 }, { translateY: -100 }] }}
      zIndex={1}
    >
      <HStack>
        <Box
          h={40}
          width={40}
          borderTopWidth={8}
          borderLeftWidth={8}
          borderColor="#FF6B35"
        ></Box>
        <Box h={40} width={120}></Box>
        <Box
          h={40}
          width={40}
          borderTopWidth={8}
          borderRightWidth={8}
          borderColor="#FF6B35"
        ></Box>
      </HStack>
      <HStack>
        <Box h={120} width={40}></Box>
        <Box h={120} width={120}></Box>
        <Box h={120} width={40}></Box>
      </HStack>
      <HStack>
        <Box
          h={40}
          width={40}
          borderBottomWidth={8}
          borderLeftWidth={8}
          borderColor="#FF6B35"
        ></Box>
        <Box h={40} width={120}></Box>
        <Box
          h={40}
          width={40}
          borderBottomWidth={8}
          borderRightWidth={8}
          borderColor="#FF6B35"
        ></Box>
      </HStack>
    </Box>
  );
};
