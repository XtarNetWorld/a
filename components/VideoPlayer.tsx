import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Settings,
  ThumbsUp,
  ThumbsDown,
  Share,
  Download,
  Save,
  MoreVertical
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  channelName: string;
  channelAvatar: string;
  views: string;
  uploadedAt: string;
  likes: string;
  subscribers: string;
  description: string;
}

export default function VideoPlayer({
  videoId,
  title,
  channelName,
  channelAvatar,
  views,
  uploadedAt,
  likes,
  subscribers,
  description,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  // For demo purposes, advance progress bar
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 0.002;
          return newProgress > 1 ? 1 : newProgress;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
      setIsDisliked(false);
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      setIsLiked(false);
    }
  };

  const formatTime = (progress: number) => {
    // Assuming average video is 10 minutes
    const totalSeconds = Math.floor(progress * 600);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Image 
          source={{ uri: `https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2` }} 
          style={styles.videoPlaceholder} 
          resizeMode="cover"
        />
        
        <View style={styles.controls}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${progress * 100}%` }]} />
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(progress)}</Text>
              <Text style={styles.timeText}>10:00</Text>
            </View>
          </View>
          
          <View style={styles.playbackControls}>
            <TouchableOpacity style={styles.controlButton}>
              <SkipBack color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playPauseButton} onPress={handlePlayPause}>
              {isPlaying ? (
                <Pause color="white" size={24} />
              ) : (
                <Play color="white" size={24} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <SkipForward color="white" size={20} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton} onPress={handleMute}>
              {isMuted ? (
                <VolumeX color="white" size={20} />
              ) : (
                <Volume2 color="white" size={20} />
              )}
            </TouchableOpacity>
            
            <View style={{ flex: 1 }} />
            
            <TouchableOpacity style={styles.controlButton}>
              <Settings color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <Maximize color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.stats}>
          {views} views • {uploadedAt}
        </Text>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <ThumbsUp 
              size={24} 
              color={isLiked ? Colors.primary.main : Colors.text.primary}
            />
            <Text style={[
              styles.actionText, 
              isLiked && { color: Colors.primary.main }
            ]}>
              {likes}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleDislike}>
            <ThumbsDown 
              size={24} 
              color={isDisliked ? Colors.primary.main : Colors.text.primary}
            />
            <Text style={[
              styles.actionText,
              isDisliked && { color: Colors.primary.main }
            ]}>
              Dislike
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Share size={24} color={Colors.text.primary} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Download size={24} color={Colors.text.primary} />
            <Text style={styles.actionText}>Download</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Save size={24} color={Colors.text.primary} />
            <Text style={styles.actionText}>Save</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.channelContainer}>
          <View style={styles.channelInfo}>
            <Image source={{ uri: channelAvatar }} style={styles.channelAvatar} />
            <View style={styles.channelTextContainer}>
              <Text style={styles.channelName}>{channelName}</Text>
              <Text style={styles.subscriberCount}>{subscribers} subscribers</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[
              styles.subscribeButton,
              isSubscribed && styles.subscribedButton
            ]}
            onPress={handleSubscribe}
          >
            <Text style={[
              styles.subscribeText,
              isSubscribed && styles.subscribedText
            ]}>
              {isSubscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.descriptionContainer}
          onPress={() => setShowFullDescription(!showFullDescription)}
        >
          <Text 
            style={styles.description} 
            numberOfLines={showFullDescription ? undefined : 2}
          >
            {description}
          </Text>
          {!showFullDescription && (
            <Text style={styles.showMoreText}>Show more</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    width,
    height: width * (9 / 16),
    backgroundColor: '#000',
    position: 'relative',
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
  },
  controls: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    padding: Layout.spacing.sm,
  },
  progressContainer: {
    marginBottom: Layout.spacing.sm,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1.5,
  },
  progress: {
    height: '100%',
    backgroundColor: Colors.primary.main,
    borderRadius: 1.5,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  timeText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
  },
  playbackControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  controlButton: {
    padding: 8,
  },
  playPauseButton: {
    padding: 8,
    marginHorizontal: 8,
  },
  infoContainer: {
    padding: Layout.spacing.md,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: Colors.text.primary,
    marginBottom: Layout.spacing.xs,
  },
  stats: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.md,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.divider,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: Colors.text.primary,
    marginTop: Layout.spacing.xs / 2,
  },
  channelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.divider,
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  channelAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  channelTextContainer: {
    marginLeft: Layout.spacing.sm,
  },
  channelName: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: Colors.text.primary,
  },
  subscriberCount: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: Colors.text.secondary,
  },
  subscribeButton: {
    backgroundColor: Colors.primary.main,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.md,
  },
  subscribedButton: {
    backgroundColor: Colors.ui.divider,
  },
  subscribeText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  subscribedText: {
    color: Colors.text.secondary,
  },
  descriptionContainer: {
    paddingVertical: Layout.spacing.md,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: Colors.text.primary,
    lineHeight: 20,
  },
  showMoreText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Colors.text.secondary,
    marginTop: Layout.spacing.xs,
  },
});