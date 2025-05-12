import { View, StyleSheet, FlatList } from 'react-native';
import Header from '@/components/Header';
import ShortCard from '@/components/ShortCard';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { SHORTS } from '@/utils/data';

export default function ShortsScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={SHORTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShortCard
            id={item.id}
            title={item.title}
            thumbnail={item.thumbnail}
            channelName={item.channelName}
            likes={item.likes}
            comments={item.comments}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.background,
  },
  contentContainer: {
    paddingTop: Layout.spacing.md,
    paddingBottom: Layout.spacing.xl,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.md,
  },
});