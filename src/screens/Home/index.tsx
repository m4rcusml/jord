import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import database from '@react-native-firebase/database';

type Props = {
  keyName: string;
  value: string;
}

const Metric = ({ keyName, value }: Props) => (
  <View style={metricStyles.container}>
    <Text style={metricStyles.title}>{keyName}</Text>
    <Text style={metricStyles.value}>
      {value}
    </Text>
  </View>
)

const metricStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    flex: 1
  },
  value: {
    fontSize: 16,
    flex: 1
  }
})

export function Home() {
  const [pressao, setPressao] = useState<number>(0);
  const [umidade, setUmidade] = useState<number>(0);
  const [movimento, setMovimento] = useState<boolean>(false);
  const [temperatura, setTemperatura] = useState<number>(0);

  useEffect(() => {
    const onPressaoChange = database().ref('/Pressao')
      .on('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          const values = Object.values(data) as number[];
          const lastValue = values[0];
          setPressao(lastValue);
        }
      });

    const onUmidadeChange = database().ref('/Umidade')
      .on('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          const values = Object.values(data) as number[];
          const lastValue = values[0];
          setUmidade(lastValue);
        }
      });
      
    const onTemperaturaChange = database().ref('/Temperatura')
      .on('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          const values = Object.values(data) as number[];
          const lastValue = values[0];
          setTemperatura(lastValue);
        }
      });
      
    const onMovimentoChange = database().ref('/Movimento')
      .on('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          const values = Object.values(data) as boolean[];
          const lastValue = values[0];
          setMovimento(lastValue);
        }
      });

    return () => {
      database().ref('/Pressao').off('value', onPressaoChange);
      database().ref('/Umidade').off('value', onUmidadeChange);
      database().ref('/Temperatura').off('value', onTemperaturaChange);
      database().ref('/Movimento').off('value', onMovimentoChange);
    };
  }, []);
  
  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={styles.title}>Informações:</Text>
      <View style={styles.content}>
        <Metric keyName='Temperatura' value={`${temperatura}`} />
        <Metric keyName='Umidade' value={`${umidade}`} />
        <Metric keyName='Pressão' value={`${pressao}`} />
        <Metric keyName='Movimento' value={movimento ? 'Sim' : 'Não'} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingVertical: 80,
    paddingHorizontal: 32
  },
  title: {
    fontWeight: '600',
    fontSize: 20
  },
  content: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    borderRadius: 30,
    padding: 20,
    gap: 20
  }
})