import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import getRandombytes from '@react-native-module/get-random-values';

export default function App() {
  const [result, setResult] = React.useState<Uint8Array | undefined>();

  React.useEffect(() => {
    const a = getRandombytes(new Uint8Array(4))
    setResult(a)
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
