import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {QRreader, QRscanner} from 'react-native-qr-scanner';
// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';

export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reader: {
        message: null,
        data: null,
      },
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <QRscanner
          onRead={this.onRead}
          renderBottomView={this.bottomView}
          flashMode={this.state.flashMode}
          zoom={this.state.zoom}
          finderY={50}
        />
        <TouchableOpacity
          onPress={() => {
            this.openPhoto();
          }}>
          <Text style={{marginTop: 20}}>
            Abre el álbum para identificar el código QR
          </Text>
        </TouchableOpacity>
        <View>
          {!this.state.reader ? (
            <Text>
              {!this.state.reader.message ? '' : `${this.state.reader.message}`}
            </Text>
          ) : (
            <Text>
              {!this.state.reader.message
                ? ''
                : `${this.state.reader.message}:${this.state.reader.data}`}
            </Text>
          )}
        </View>
      </View>
    );
  }

  bottomView = () => {
    return (
      <View
        style={{flex: 1, flexDirection: 'row', backgroundColor: '#0000004D'}}>
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          onPress={() => this.setState({flashMode: !this.state.flashMode})}>
          <Text style={{color: '#fff'}}>点我开启/关闭手电筒</Text>
        </TouchableOpacity>
      </View>
    );
  };
  onRead = res => {
    console.log(res);
  };

  openPhoto() {
    console.log('ImagePicker');
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          if (response.uri) {
            var path = response.path;
            if (!path) {
              path = response.uri;
            }
            QRreader(path)
              .then(data => {
                this.setState({
                  reader: {
                    message: 'Reconocimiento exitoso',
                    data: data,
                  },
                });
                // Borrar automáticamente después de diez segundos
                setTimeout(() => {
                  this.setState({
                    reader: {
                      message: null,
                      data: null,
                    },
                  });
                }, 10000);
              })
              .catch(err => {
                this.setState({
                  reader: {
                    message: 'reconocimiento fallido',
                    data: null,
                  },
                });
              });
          }
        }
      },
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
