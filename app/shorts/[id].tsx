import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  Share2, 
  MoreVertical, 
  ChevronDown,
  Music
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { SHORTS } from '@/utils/data';

export default function ShortScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const shortId = id as string;
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  
  // Find the short by ID
  const short = SHORTS.find(s => s.id === shortId) || SHORTS[0];
  
  const handleBackPress = () => {
    router.back();
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: short.thumbnail }} style={styles.background} />
      <View style={styles.overlay} />
      
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <ChevronDown size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* Right-side actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <ThumbsUp 
            size={28} 
            color={liked ? Colors.primary.main : "white"} 
          />
          <Text style={[
            styles.actionText,
            liked && styles.likedText
          ]}>
            {short.likes}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <ThumbsDown size={28} color="white" />
          <Text style={styles.actionText}>Dislike</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={28} color="white" />
          <Text style={styles.actionText}>{short.comments}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Share2 size={28} color="white" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
      
      {/* Bottom info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{short.title}</Text>
        <View style={styles.channelContainer}>
          <Text style={styles.channelName}>@{short.channelName}</Text>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.musicContainer}>
          <Music size={16} color="white" />
          <Text style={styles.musicText}>Original Sound - {short.channelName}</Text>
        </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  topBar: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Layout.spacing.md,
    zIndex: 10,
  },
  backButton: {
    padding: Layout.spacing.xs,
  },
  moreButton: {
    padding: Layout.spacing.xs,
  },
  actionsContainer: {
    position: 'absolute',
    right: Layout.spacing.md,
    bottom: 150,
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    marginTop: Layout.spacing.xs,
  },
  likedText: {
    color: Colors.primary.main,
  },
  infoContainer: {
    position: 'absolute',
    left: Layout.spacing.md,
    right: 80,
    bottom: Layout.spacing.xl,
    padding: Layout.spacing.md,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    marginBottom: Layout.spacing.md,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  channelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  channelName: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    marginRight: Layout.spacing.md,
  },
  subscribeButton: {
    backgroundColor: Colors.primary.main,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs / 2,
    borderRadius: Layout.borderRadius.md,
  },
  subscribeText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
  },
  musicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginLeft: Layout.spacing.xs,
  },
});