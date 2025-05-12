import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Bell, Search, MoreVertical } from 'lucide-react-native';
import VideoCard from '@/components/VideoCard';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { SUBSCRIPTIONS, VIDEOS } from '@/utils/data';

export default function ChannelScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const channelId = id as string;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('VIDEOS');
  
  // Find the channel by ID
  const channel = SUBSCRIPTIONS.find(c => c.id === channelId) || SUBSCRIPTIONS[0];
  
  // Filter videos by this channel (mock implementation)
  const channelVideos = VIDEOS.filter(v => v.channelName === channel.name);
  
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Channel Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Search size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <MoreVertical size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Channel Banner */}
        <View style={styles.bannerContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=1600' }} 
            style={styles.banner} 
          />
        </View>
        
        {/* Channel Info */}
        <View style={styles.channelInfo}>
          <Image source={{ uri: channel.avatar }} style={styles.avatar} />
          
          <View style={styles.channelDetails}>
            <Text style={styles.channelName}>{channel.name}</Text>
            <Text style={styles.subscriberCount}>
              {channel.subscribers} subscribers • {channel.videoCount} videos
            </Text>
            <Text style={styles.channelDescription} numberOfLines={2}>
              Welcome to the official {channel.name} channel! Subscribe for the latest videos.
            </Text>
          </View>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>SUBSCRIBED</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.bellButton}>
            <Bell size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>
        
        {/* Tabs */}
        <View style={styles.tabs}>
          {['VIDEOS', 'SHORTS', 'PLAYLISTS', 'ABOUT'].map((tab) => (
            <TouchableOpacity 
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Video List */}
        <View style={styles.videoList}>
          {channelVideos.map(video => (
            <VideoCard
              key={video.id}
              id={video.id}
              title={video.title}
              thumbnail={video.thumbnail}
              channelName={video.channelName}
              channelAvatar={video.channelAvatar}
              views={video.views}
              uploadedAt={video.uploadedAt}
              duration={video.duration}
              isLive={video.isLive}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingHorizontal: Layout.spacing.md,
    paddingBottom: Layout.spacing.sm,
    backgroundColor: Colors.ui.background,
    zIndex: 10,
  },
  backButton: {
    paddingHorizontal: Layout.spacing.sm,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    padding: Layout.spacing.sm,
  },
  bannerContainer: {
    width: '100%',
    height: 120,
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  channelInfo: {
    padding: Layout.spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: Layout.spacing.md,
  },
  channelDetails: {},
  channelName: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: Colors.text.primary,
    marginBottom: Layout.spacing.xs,
  },
  subscriberCount: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.xs,
  },
  channelDescription: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: Colors.text.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
  },
  subscribeButton: {
    backgroundColor: Colors.ui.divider,
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.md,
    marginRight: Layout.spacing.md,
  },
  subscribeText: {
    color: Colors.text.secondary,
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
  },
  bellButton: {
    padding: Layout.spacing.sm,
    backgroundColor: Colors.ui.divider,
    borderRadius: Layout.borderRadius.circle,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.divider,
  },
  tab: {
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    marginRight: Layout.spacing.md,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary.main,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Colors.text.secondary,
  },
  activeTabText: {
    color: Colors.text.primary,
  },
  videoList: {
    paddingTop: Layout.spacing.md,
  },
});