import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Mic, Bell, Cast, User } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface HeaderProps {
  showSearch?: boolean;
  title?: string;
}

export default function Header({ showSearch = false, title }: HeaderProps) {
  const router = useRouter();

  const handleSearchPress = () => {
    router.push('/search');
  };

  const handleProfilePress = () => {
    // In a full implementation, this would navigate to profile or account settings
    console.log('Profile pressed');
  };

  return (
    <View style={styles.container}>
      {!showSearch ? (
        <View style={styles.titleContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.youtubeIcon}>
              <View style={styles.playButton} />
            </View>
            <Text style={styles.logoText}>YouTube</Text>
          </View>

          <View style={styles.rightIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Cast size={24} color={Colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={24} color={Colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleSearchPress}>
              <Search size={24} color={Colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
              <User size={24} color={Colors.text.primary} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.searchInputContainer}>
            <Search size={20} color={Colors.text.secondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search YouTube"
              placeholderTextColor={Colors.text.secondary}
              autoFocus
            />
          </View>
          <TouchableOpacity style={styles.micButton}>
            <Mic size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ui.background,
    paddingTop: Platform.OS === 'web' ? 0 : 40,
    paddingHorizontal: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.divider,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  youtubeIcon: {
    width: 28,
    height: 20,
    backgroundColor: Colors.primary.main,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 0,
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderLeftColor: 'white',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginLeft: 2,
  },
  logoText: {
    color: Colors.text.primary,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    marginLeft: 4,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.ui.divider,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },
  backButton: {
    paddingRight: Layout.spacing.sm,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  searchInputContainer: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.ui.divider,
    borderRadius: 20,
    paddingHorizontal: Layout.spacing.sm,
  },
  searchIcon: {
    marginRight: Layout.spacing.xs,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: Colors.text.primary,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  micButton: {
    marginLeft: Layout.spacing.md,
    padding: 4,
  },
});