import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface SubscriptionCardProps {
  id: string;
  name: string;
  avatar: string;
  subscribers: string;
  videoCount: number;
  latestVideo: {
    title: string;
    thumbnail: string;
    uploadedAt: string;
    views: string;
  };
}

export default function SubscriptionCard({
  id,
  name,
  avatar,
  subscribers,
  videoCount,
  latestVideo,
}: SubscriptionCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/channel/${id}`);
  };

  const handleVideoPress = () => {
    router.push(`/video/${id}`); // Using channel ID as a mock video ID
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.channelContainer} onPress={handlePress}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.channelInfo}>
          <Text style={styles.channelName}>{name}</Text>
          <Text style={styles.subscriberCount}>
            {subscribers} subscribers • {videoCount} videos
          </Text>
        </View>
        <TouchableOpacity style={styles.subscribeButton}>
          <Text style={styles.subscribeText}>SUBSCRIBED</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity style={styles.videoContainer} onPress={handleVideoPress}>
        <Image source={{ uri: latestVideo.thumbnail }} style={styles.thumbnail} />
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {latestVideo.title}
          </Text>
          <Text style={styles.videoStats}>
            {latestVideo.views} views • {latestVideo.uploadedAt}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.xl,
  },
  channelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  channelInfo: {
    flex: 1,
    marginLeft: Layout.spacing.md,
  },
  channelName: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: Colors.text.primary,
  },
  subscriberCount: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: Colors.text.secondary,
  },
  subscribeButton: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.ui.divider,
  },
  subscribeText: {
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    color: Colors.text.secondary,
  },
  videoContainer: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.md,
  },
  thumbnail: {
    width: 120,
    height: 68,
    borderRadius: Layout.borderRadius.sm,
  },
  videoInfo: {
    flex: 1,
    marginLeft: Layout.spacing.md,
  },
  videoTitle: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Colors.text.primary,
    marginBottom: Layout.spacing.xs / 2,
  },
  videoStats: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: Colors.text.secondary,
  },
});