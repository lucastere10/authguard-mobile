import { Spinner, Box, Text, Image } from "@gluestack-ui/themed";

export default function SplashScreen() {
  return (
    <Box
      flex={1}
      h={"$full"}
      alignItems="center"
      justifyContent="center"
      backgroundColor="$white"
      pt={12}
      gap={16}
    >
      {/* <Spinner size="large" color="#d33f09" /> */}
      <Image
        source={require("../../../assets/logo-color.png")}
        alt="Splash Image"
        style={{ width: 300, height: 50, resizeMode: "contain", marginBottom: 48 }}
      />
      {/* <Text>Carregando...</Text> */}
    </Box>
  );
}
