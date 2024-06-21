import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={styles.title}>Informações:</Text>
      <View style={styles.content}>
        <Metric keyName='Temperatura' value={'28 graus'} />
        <Metric keyName='Humidade' value={'10'} />
        <Metric keyName='Pressão' value={'1 atm'} />
        <Metric keyName='Movimento' value={true ? 'Sim' : 'Não'} />
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