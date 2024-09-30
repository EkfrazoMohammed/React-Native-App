import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetails from './ProductDetails'; // Create this component next

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        extractCategories(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const extractCategories = (products) => {
    const uniqueCategories = ['all', ...new Set(products.map(product => product.category))];
    setCategories(uniqueCategories);
  };

  const filterByCategory = (category) => {
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
    setSelectedCategory(category);
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text>Price: ${item.price}</Text>
      <Text>Rating: {item.rating} ⭐</Text>
      <Text>Category: {item.category}</Text>
      <Text>Stock: {item.stock}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              selectedCategory === category && styles.selectedButton
            ]}
            onPress={() => filterByCategory(category)}
          >
            <Text style={styles.filterText}>{category.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
      />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Products' }} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ title: 'Product Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  filterButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5,
  },
  selectedButton: {
    backgroundColor: '#0056b3',
  },
  filterText: {
    color: 'white',
    fontWeight: 'bold',
  },
  productContainer: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default App;
