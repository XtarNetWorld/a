import { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import VideoPlayer from '@/components/VideoPlayer';
import CommentSection from '@/components/CommentSection';
import Colors from '@/constants/Colors';
import { VIDEOS, COMMENTS } from '@/utils/data';

export default function VideoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const videoId = id as string;
  
  // Find the video by ID
  const video = VIDEOS.find(v => v.id === videoId) || VIDEOS[0];
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VideoPlayer
          videoId={video.id}
          title={video.title}
          channelName={video.channelName}
          channelAvatar={video.channelAvatar}
          views={video.views}
          uploadedAt={video.uploadedAt}
          likes={video.likes}
          subscribers={video.subscribers}
          description={video.description}
        />
        
        <CommentSection 
          comments={COMMENTS} 
          commentCount={COMMENTS.length}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.background,
  },
});