import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ThumbsUp, MessageCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface ShortCardProps {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  likes: string;
  comments: string;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24;
const CARD_HEIGHT = CARD_WIDTH * 1.8;

export default function ShortCard({
  id,
  title,
  thumbnail,
  channelName,
  likes,
  comments,
}: ShortCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/shorts/${id}`);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
        <View style={styles.overlay}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <ThumbsUp size={16} color="white" />
              <Text style={styles.statText}>{likes}</Text>
            </View>
            <View style={styles.statItem}>
              <MessageCircle size={16} color="white" />
              <Text style={styles.statText}>{comments}</Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.channelName}>{channelName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: Layout.spacing.md,
  },
  thumbnailContainer: {
    width: '100%',
    height: CARD_HEIGHT,
    borderRadius: Layout.borderRadius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
    padding: Layout.spacing.sm,
  },
  titleContainer: {
    marginTop: 'auto',
  },
  title: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: Layout.spacing.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  statText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    marginLeft: Layout.spacing.xs / 2,
  },
  channelName: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: Colors.text.secondary,
    marginTop: Layout.spacing.xs,
  },
});