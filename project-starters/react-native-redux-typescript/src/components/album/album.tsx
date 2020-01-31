import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image
} from 'react-native';
import styles from './album.style';

type AlbumItems = {
  title: string;
  url: string;
  id: string;
};

interface AlbumState {
  items: AlbumItems[];
}
export default class Album extends React.Component<{}, AlbumState> {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          items: response.slice(1, 25)
        });
      });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {this.state.items
          && this.state.items.map((item) => (
            <View style={styles.itemContainer} key={item.id}>
              <Text style={styles.itemText}>{item.title}</Text>
              <Image source={{ uri: item.url }} style={{ height: 300, width: '100%' }} />
            </View>
          ))}
      </ScrollView>
    );
  }
}
