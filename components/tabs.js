// components/Tabs.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Tabs = ({ onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState("For You");

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, selectedTab === "For You" && styles.selectedTab]}
        onPress={() => {
          handleTabPress("For You");
        }}
      >
        <Text
          style={[
            styles.tabText,
            selectedTab === "For You" && styles.selectedTabText,
          ]}
        >
          Para você
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, selectedTab === "Following" && styles.selectedTab]}
        onPress={() => {
          handleTabPress("Following");
        }}
      >
        <Text
          style={[
            styles.tabText,
            selectedTab === "Following" && styles.selectedTabText,
          ]}
        >
          Seguindo
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

export default Tabs;
