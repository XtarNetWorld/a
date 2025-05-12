import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { History, Clock, ThumbsUp, PlaylistAdd, Download, MoreVertical } from 'lucide-react-native';
import Header from '@/components/Header';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { WATCH_HISTORY } from '@/utils/data';

export default function LibraryScreen() {
  const router = useRouter();

  const navigateToHistory = () => {
    // In a full implementation, this would navigate to a history screen
    console.log('Navigate to history');
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Library</Text>
        </View>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={navigateToHistory}>
            <History size={24} color={Colors.text.primary} />
            <Text style={styles.actionText}>History</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <PlaylistAdd size={24} color={Colors.text.primary} />
            <Text style={styles.actionText}>Playlists</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <ThumbsUp size={24} color={Colors.text.primary} />
            <Text style={styles.actionText}>Liked videos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Download size={24} color={Colors.text.primary} />
            <Text style={styles.actionText}>Downloads</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <History size={20} color={Colors.text.primary} />
              <Text style={styles.sectionTitle}>History</Text>
            </View>
            <TouchableOpacity style={styles.seeAllButton} onPress={navigateToHistory}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {WATCH_HISTORY.slice(0, 3).map((video) => (
            <TouchableOpacity 
              key={video.id}
              style={styles.videoItem}
              onPress={() => router.push(`/video/${video.id}`)}
            >
              <View style={styles.thumbnailContainer}>
                <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
                <View style={styles.durationContainer}>
                  <Text style={styles.durationText}>{video.duration}</Text>
                </View>
                <View style={[
                  styles.progressBar, 
                  { width: `${video.progress}%` }
                ]} />
              </View>
              
              <View style={styles.videoDetails}>
                <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
                <Text style={styles.channelName}>{video.channelName}</Text>
                <Text style={styles.viewInfo}>Watched {video.watchedAt}</Text>
              </View>
              
              <TouchableOpacity style={styles.menuButton}>
                <MoreVertical size={20} color={Colors.text.secondary} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Clock size={20} color={Colors.text.primary} />
              <Text style={styles.sectionTitle}>Watch Later</Text>
            </View>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>
              Videos you save to watch later will show up here
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.background,
  },
  headerContainer: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.lg,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: Colors.text.primary,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.md,
    paddingBottom: Layout.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.divider,
  },
  actionButton: {
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.xs,
  },
  actionText: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    color: Colors.text.primary,
    marginTop: Layout.spacing.xs,
    textAlign: 'center',
  },
  sectionContainer: {
    paddingTop: Layout.spacing.lg,
    paddingBottom: Layout.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.divider,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    color: Colors.text.primary,
    marginLeft: Layout.spacing.sm,
  },
  seeAllButton: {
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.sm,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Colors.primary.main,
  },
  videoItem: {
    flexDirection: 'row',
    padding: Layout.spacing.md,
  },
  thumbnailContainer: {
    width: 120,
    height: 68,
    borderRadius: Layout.borderRadius.sm,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  durationContainer: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  durationText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 3,
    backgroundColor: Colors.primary.main,
  },
  videoDetails: {
    flex: 1,
    marginLeft: Layout.spacing.md,
  },
  videoTitle: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Colors.text.primary,
    marginBottom: 2,
  },
  channelName: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: Colors.text.secondary,
  },
  viewInfo: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: Colors.text.secondary,
    marginTop: 2,
  },
  menuButton: {
    padding: Layout.spacing.xs,
    alignSelf: 'center',
  },
  emptyStateContainer: {
    padding: Layout.spacing.xl,
    alignItems: 'center',
  },
  emptyStateText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: Colors.text.secondary,
  },
});