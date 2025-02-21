import { Button, Text, Box } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function TotpScreen({ route }: { route: any }) {
  const { decoded } = route.params;
  const navigation = useNavigation();
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeLeft = decoded.exp - currentTime;
      setCountdown(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [decoded.exp]);

  return (
    <Box flex={1} h={"$full"} alignItems="center" justifyContent="center" backgroundColor="$white" pt={12} gap={16}>
      <Text px={36} py={16} textAlign="center" fontWeight="$semibold" fontSize='$lg'>Você leu um QR Code para iniciar a sessão no Authguard</Text>
      <Text fontSize='$5xl' fontWeight="bold">{decoded.room}</Text>
      <Text>Deseja fazer login como:</Text>
      <Text fontWeight="$semibold" fontSize='$2xl'>{decoded.label}</Text>
      <Box>
        <Text textAlign="center" fontWeight="$semibold" fontSize='$md'>{decoded.issuer}</Text>
        <Text textAlign="center" fontWeight="$semibold" fontSize='$md'>EXP: {decoded.exp}</Text>
        <Text textAlign="center" fontWeight="$semibold" fontSize='$md'>Tempo restante: {countdown} segundos</Text>
      </Box>
      <Button mt={16} gap={16} py={4} width='$2/3' bgColor="#d33f09" rounded='$sm'
        onPress={() => { }}>
        <Text color="$white">
          Login
        </Text>
      </Button>
      <Button gap={16} py={4} width='$2/3' rounded='$sm' bgColor="$secondary900" onPress={() => { navigation.goBack() }}>
        <Text color="$white">
          Cancelar
        </Text>
      </Button>
    </Box>
  );
}
