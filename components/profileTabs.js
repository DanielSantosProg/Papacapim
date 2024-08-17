// components/Tabs.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ProfileTabs = () => {
  const [selectedTab, setSelectedTab] = useState("Posts");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, selectedTab === "Posts" && styles.selectedTab]}
        onPress={() => setSelectedTab("Posts")}
      >
        <Text
          style={[
            styles.tabText,
            selectedTab === "Posts" && styles.selectedTabText,
          ]}
        >
          Posts
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, selectedTab === "Respostas" && styles.selectedTab]}
        onPress={() => setSelectedTab("Respostas")}
      >
        <Text
          style={[
            styles.tabText,
            selectedTab === "Respostas" && styles.selectedTabText,
          ]}
        >
          Respostas
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#76ABAE",
  },
  tabText: {
    fontSize: 16,
    fontFamily: "Kameron-Regular",
    color: "#A5A5A5",
  },
  selectedTabText: {
    color: "#EEE",
    fontFamily: "Kameron-Bold",
  },
});

export default ProfileTabs;
