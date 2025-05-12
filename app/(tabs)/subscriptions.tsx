import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Header from '@/components/Header';
import SubscriptionCard from '@/components/SubscriptionCard';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { SUBSCRIPTIONS } from '@/utils/data';

export default function SubscriptionsScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Subscriptions</Text>
        </View>
        
        {SUBSCRIPTIONS.map(subscription => (
          <SubscriptionCard
            key={subscription.id}
            id={subscription.id}
            name={subscription.name}
            avatar={subscription.avatar}
            subscribers={subscription.subscribers}
            videoCount={subscription.videoCount}
            latestVideo={subscription.latestVideo}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.background,
  },
  titleContainer: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.lg,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: Colors.text.primary,
  },
});