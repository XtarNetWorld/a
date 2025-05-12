import { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '@/components/Header';
import VideoCard from '@/components/VideoCard';
import Colors from '@/constants/Colors';
import { VIDEOS } from '@/utils/data';

export default function SearchScreen() {
  const [searchResults, setSearchResults] = useState(VIDEOS);

  return (
    <View style={styles.container}>
      <Header showSearch={true} />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoCard
            id={item.id}
            title={item.title}
            thumbnail={item.thumbnail}
            channelName={item.channelName}
            channelAvatar={item.channelAvatar}
            views={item.views}
            uploadedAt={item.uploadedAt}
            duration={item.duration}
            isLive={item.isLive}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.background,
  },
  listContent: {
    paddingTop: 8,
  },
});