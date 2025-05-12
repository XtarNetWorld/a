import { useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import Header from '@/components/Header';
import VideoCard from '@/components/VideoCard';
import Categories from '@/components/Categories';
import Colors from '@/constants/Colors';
import { VIDEOS, CATEGORIES } from '@/utils/data';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredVideos = selectedCategory === 'All'
    ? VIDEOS
    : VIDEOS.filter(video => video.category === selectedCategory.toLowerCase());

  return (
    <View style={styles.container}>
      <Header />
      <Categories 
        categories={CATEGORIES} 
        onSelectCategory={setSelectedCategory} 
      />
      <FlatList
        data={filteredVideos}
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.background,
  },
});