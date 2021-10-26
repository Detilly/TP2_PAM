import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = () => {
  return <View style={styles.header}>
    <Text style={styles.headerText}>Restaurant {"\n"} Liste des plats</Text>
  </View>
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: `#6495ed`,
    paddingTop: 25,
    paddingBottom: 5,
  },
  headerText: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Header;