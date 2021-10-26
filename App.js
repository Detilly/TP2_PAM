import * as React from 'react';
import { Text, View, StyleSheet, Button, TextInput, Image, ScrollView, Modal } from 'react-native';
import Header from "./components/Header";

class ItemView extends React.Component {
  deleteItem = () => {
    const id = this.props.item.id;
    this.props.deleteItem(id);
  };

  render() {
    const { name, price, url } = this.props.item;
    return (
      <View>
      <View style={styles.itemContainer}>
        <Image source={{ uri: url }} style={{ width: '100%', height: 150 }} />
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemPrice}>{price}</Text>
        <Button color= "#ff4500" title={"Supprimer"} onPress={this.deleteItem} />
      </View>
      </View>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemName: '',
      itemPrice: '',
      itemUrl: '',
      showAddModal: false,
    };
  }

  addItem = () => {
    const { itemName, itemPrice, itemUrl } = this.state;
    const id = new Date().getUTCMilliseconds();

    const newItem = {
      id: id,
      url: itemUrl,
      name: itemName,
      price: itemPrice+"$"
    };

    this.setState((prevState) => ({
      items: [...prevState.items, newItem],
    }));
    this.closeModal();
  };

  deleteItem = (idToDelete) => {
    this.setState((prevState) => ({
      items: prevState.items.filter((item) => item.id !== idToDelete),
    }));
  };

  renderItemForm = () => {
    return (
      <View style={styles.itemForm}>
        <TextInput
          placeholder="Nom"
          style={styles.input}
          value={this.state.itemName}
          onChangeText={(text) => {
            this.setState({ itemName: text });
          }}
        />
        <TextInput
          placeholder="Prix"
          style={styles.input}
          value={this.state.itemPrice}
          onChangeText={(text) => {
            this.setState({ itemPrice: text });
          }}
        />
        <TextInput
          placeholder="URL"
          style={styles.input}
          value={this.state.itemUrl}
          onChangeText={(text) => {
            this.setState({ itemUrl: text });
          }} 
        /> 
        <Button title="Ajouter" onPress= {this.addItem} />
      </View>
    ); 
  };

  showModal = () => {
    this.setState({ showAddModal: true });
  }

  closeModal = () => {
    this.setState({ showAddModal: false });
  }

  render() {
    return (
      <>
      <Header />
      <View style={styles.container}>
        <Button title="Ajouter" onPress={this.showModal} />
        <Modal
          visible={this.state.showAddModal}
          animationType="slide"
          transparent={false}
        >
          <View style={styles.modalContainer}>{this.renderItemForm()}</View>
        </Modal>
        <ScrollView>
          {this.state.items.map((item) => (
            <ItemView key={item.id} item={item} deleteItem={this.deleteItem} />
          ))}
        </ScrollView>
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
  itemForm: {
    margin: 16,
  },
  itemContainer: {
    marginVertical: 25,
  },
  itemName: {
    fontSize: 20,
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 16,
    marginVertical: 4,
  },
  modalContainer: {
    justifyContent: 'center',
    borderColor: "black",
    borderWidth: 1,
    marginVertical: 64,
    marginHorizontal: 16,
  }
});
