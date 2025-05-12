import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  channelAvatar: string;
  views: string;
  uploadedAt: string;
  duration: string;
  isLive?: boolean;
}

export default function VideoCard({
  id,
  title,
  thumbnail,
  channelName,
  channelAvatar,
  views,
  uploadedAt,
  duration,
  isLive = false,
}: VideoCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/video/${id}`);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
        {isLive ? (
          <View style={styles.liveTag}>
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        ) : (
          <View style={styles.durationTag}>
            <Text style={styles.durationText}>{duration}</Text>
          </View>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Image source={{ uri: channelAvatar }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <Text style={styles.channelName}>{channelName}</Text>
          <Text style={styles.stats}>
            {views} views • {uploadedAt}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.md,
  },
  thumbnailContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 16 / 9,
    marginBottom: Layout.spacing.xs,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: Layout.borderRadius.sm,
  },
  durationTag: {
    position: 'absolute',
    bottom: Layout.spacing.xs,
    right: Layout.spacing.xs,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.sm,
  },
  durationText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
  },
  liveTag: {
    position: 'absolute',
    bottom: Layout.spacing.xs,
    right: Layout.spacing.xs,
    backgroundColor: Colors.primary.main,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.sm,
  },
  liveText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
  },
  detailsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.xs,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: Layout.spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Colors.text.primary,
    marginBottom: Layout.spacing.xs / 2,
  },
  channelName: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: Colors.text.secondary,
  },
  stats: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: Colors.text.secondary,
  },
});