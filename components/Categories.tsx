import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface CategoriesProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

export default function Categories({ categories, onSelectCategory }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.selectedCategory,
          ]}
          onPress={() => handleCategoryPress(category)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedCategoryText,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ui.background,
    paddingVertical: Layout.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.divider,
  },
  contentContainer: {
    paddingHorizontal: Layout.spacing.md,
  },
  categoryButton: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    marginRight: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.ui.divider,
  },
  selectedCategory: {
    backgroundColor: Colors.ui.dark,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Colors.text.secondary,
  },
  selectedCategoryText: {
    color: Colors.text.white,
  },
});