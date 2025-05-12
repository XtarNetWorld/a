import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface CommentReply {
  id: string;
  username: string;
  avatar: string;
  comment: string;
  likes: number;
  time: string;
}

interface Comment {
  id: string;
  username: string;
  avatar: string;
  comment: string;
  likes: number;
  time: string;
  replies: CommentReply[];
}

interface CommentSectionProps {
  comments: Comment[];
  commentCount: number;
}

export default function CommentSection({ comments, commentCount }: CommentSectionProps) {
  const [expandedComments, setExpandedComments] = useState<string[]>([]);

  const toggleReplies = (commentId: string) => {
    if (expandedComments.includes(commentId)) {
      setExpandedComments(expandedComments.filter(id => id !== commentId));
    } else {
      setExpandedComments([...expandedComments, commentId]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentCount}>Comments {commentCount}</Text>
        <MessageCircle size={20} color={Colors.text.secondary} />
      </View>

      <View style={styles.addCommentContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=256' }}
          style={styles.userAvatar}
        />
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          placeholderTextColor={Colors.text.secondary}
        />
      </View>

      {comments.map(comment => (
        <View key={comment.id} style={styles.commentContainer}>
          <Image source={{ uri: comment.avatar }} style={styles.commentAvatar} />
          
          <View style={styles.commentContent}>
            <View style={styles.commentHeader}>
              <Text style={styles.commentUsername}>{comment.username}</Text>
              <Text style={styles.commentTime}>{comment.time}</Text>
            </View>
            
            <Text style={styles.commentText}>{comment.comment}</Text>
            
            <View style={styles.commentActions}>
              <View style={styles.likeContainer}>
                <TouchableOpacity style={styles.likeButton}>
                  <ThumbsUp size={16} color={Colors.text.secondary} />
                </TouchableOpacity>
                <Text style={styles.likeCount}>{comment.likes}</Text>
                <TouchableOpacity style={styles.dislikeButton}>
                  <ThumbsDown size={16} color={Colors.text.secondary} />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity style={styles.replyButton}>
                <Text style={styles.replyText}>REPLY</Text>
              </TouchableOpacity>
            </View>
            
            {comment.replies.length > 0 && (
              <TouchableOpacity 
                style={styles.viewRepliesButton}
                onPress={() => toggleReplies(comment.id)}
              >
                <Text style={styles.viewRepliesText}>
                  {expandedComments.includes(comment.id)
                    ? 'Hide replies'
                    : `View ${comment.replies.length} replies`}
                </Text>
              </TouchableOpacity>
            )}
            
            {expandedComments.includes(comment.id) && (
              <View style={styles.repliesContainer}>
                {comment.replies.map(reply => (
                  <View key={reply.id} style={styles.replyContainer}>
                    <Image source={{ uri: reply.avatar }} style={styles.replyAvatar} />
                    
                    <View style={styles.replyContent}>
                      <View style={styles.commentHeader}>
                        <Text style={styles.commentUsername}>{reply.username}</Text>
                        <Text style={styles.commentTime}>{reply.time}</Text>
                      </View>
                      
                      <Text style={styles.commentText}>{reply.comment}</Text>
                      
                      <View style={styles.commentActions}>
                        <View style={styles.likeContainer}>
                          <TouchableOpacity style={styles.likeButton}>
                            <ThumbsUp size={16} color={Colors.text.secondary} />
                          </TouchableOpacity>
                          <Text style={styles.likeCount}>{reply.likes}</Text>
                          <TouchableOpacity style={styles.dislikeButton}>
                            <ThumbsDown size={16} color={Colors.text.secondary} />
                          </TouchableOpacity>
                        </View>
                        
                        <TouchableOpacity style={styles.replyButton}>
                          <Text style={styles.replyText}>REPLY</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Layout.spacing.md,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.md,
  },
  commentCount: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: Colors.text.primary,
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: Layout.spacing.md,
  },
  commentInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.divider,
    paddingVertical: Layout.spacing.xs,
    color: Colors.text.primary,
    fontFamily: 'Roboto-Regular',
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.lg,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: Layout.spacing.md,
  },
  commentContent: {
    flex: 1,
  },
  commentUsername: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Colors.text.primary,
  },
  commentTime: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: Colors.text.secondary,
    marginLeft: Layout.spacing.sm,
  },
  commentText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: Colors.text.primary,
    marginTop: Layout.spacing.xs,
    lineHeight: 20,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Layout.spacing.sm,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {
    padding: Layout.spacing.xs,
  },
  likeCount: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: Colors.text.secondary,
    marginHorizontal: Layout.spacing.xs,
  },
  dislikeButton: {
    padding: Layout.spacing.xs,
  },
  replyButton: {
    marginLeft: Layout.spacing.md,
    padding: Layout.spacing.xs,
  },
  replyText: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    color: Colors.text.secondary,
  },
  viewRepliesButton: {
    marginTop: Layout.spacing.md,
  },
  viewRepliesText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Colors.primary.dark,
  },
  repliesContainer: {
    marginTop: Layout.spacing.md,
  },
  replyContainer: {
    flexDirection: 'row',
    marginTop: Layout.spacing.md,
  },
  replyAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: Layout.spacing.md,
  },
  replyContent: {
    flex: 1,
  },
});