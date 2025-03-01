import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image, Button, Linking, TouchableOpacity } from "react-native";
import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_NEWS_API; 
const API_URL = `https://newsapi.org/v2/top-headlines?category=health&language=en&apiKey=${API_KEY}`;

const HealthNews = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get(API_URL);
      setNews(response.data.articles[0]); 
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const truncatedContent = news.content ? news.content.slice(0, 100) + ".." : "No content available.";


  return (
    <View style={styles.container}>
      {news ? (
        <>
          <Text style={styles.title}>{news.title}</Text>
          <Text style={styles.content}>{truncatedContent || "No full content available."}</Text>

          {news.url && (
            <TouchableOpacity onPress={() => Linking.openURL(news.url)}>
              <Text style={styles.readMore}>Read More</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <Text>No news available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',  
    padding: 10,
    margin: 20, 
    borderWidth: 1,  
    borderColor: '#000',  
    borderRadius: 10, 
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24, 
  },
  readMore: {
    fontSize: 12, 
    color: "#1e90ff", 
    textDecorationLine: "underline", 
    marginBottom: 10,
    textAlign: "right"
  }
});

export default HealthNews;
