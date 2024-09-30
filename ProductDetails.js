import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const ProductDetails = ({ route }) => {
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.productImage} />
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productCategory}>Category: {product.category}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productPrice}>Price: ${product.price}</Text>
      <Text>Rating: {product.rating} ⭐</Text>
      <Text>Stock: {product.stock}</Text>
      <Text>Brand: {product.brand}</Text>
      <Text>Shipping: {product.shippingInformation}</Text>
      <Text>Warranty: {product.warrantyInformation}</Text>

      {/* Reviews Section */}
      <View style={styles.reviewSection}>
        <Text style={styles.reviewTitle}>Reviews:</Text>
        {product.reviews.map((review, index) => (
          <View key={index} style={styles.reviewContainer}>
            <Text style={styles.reviewRating}>Rating: {review.rating} ⭐</Text>
            <Text>{review.comment}</Text>
            <Text>By: {review.reviewerName}</Text>
            <Text>Date: {new Date(review.date).toLocaleDateString()}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  productCategory: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: 'green',
    marginBottom: 10,
  },
  reviewSection: {
    marginTop: 20,
    width: '100%',
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reviewContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  reviewRating: {
    fontWeight: 'bold',
  },
});

export default ProductDetails;
