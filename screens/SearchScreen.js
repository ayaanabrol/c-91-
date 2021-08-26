import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Header } from 'react-native-elements';
import { SearchBar } from 'react-native-elements';

export default class SearchScreen extends React.Component {
  state = {
    search: '',
    allDetails: [''],
    dataSource: [],
  };

  updateSearch = (search) => {
    this.setState({ search: search });
  };

  componentDidMount() {
    this.retrieveDetails();
  }

  retrieveDetails = () => {
    try {
      var allDetails = [];
      var details = db
        .collection('Details')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            allStories.push(doc.data());
            console.log('these are the details', allDetails);
          });
          this.setState({ allDetails: allDetails });
        });
    } catch (error) {
      console.log(error);
    }
  };

  SearchFilterFunction(text) {
    const newData = this.state.allDetails.filter((item) => {
      const itemData = item.BankName ? item.BankName.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ backgroundColor: 'white' }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'black',
              textAlign: 'center',
              color: 'white',
            }}>
            Bank Accounts
          </Text>

          <SearchBar
            placeholder="Type Here..."
            onChangeText={(text) => this.SearchFilterFunction(text)}
            onClear={(text) => this.SearchFilterFunction('')}
            value={this.state.search}
          />

          <FlatList
            data={
              this.state.search === ''
                ? this.state.allDetails
                : this.state.dataSource
            }
            renderItem={({ item }) => (
              <View style={{ borderBottomWidth: 2 }}>
                <View style={styles.itemContainer}>
                  <Text>Bank Name : {item.bankName}</Text>
                  <Text>Account No :{item.accountNo}</Text>
                  <Text>Bank Code :{item.bankCode}</Text>
                </View>
               
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: 'black',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  bankName: {
    fontSize: 32,
  },
  itemContainer: {
    height: 80,
    width: '100%',
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
