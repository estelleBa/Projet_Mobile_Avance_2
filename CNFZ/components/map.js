import React from 'react';
import MapView from 'react-native-maps'
export default class map extends React.Component<Props> {
  render() {
    return (
      <MapView
        style={{flex: 1}}
        // region={{
        //   latitude: 48.901096047993114,
        //   longitude: 2.3261295373323474,
        //   latitudeDelta: 0.0122,
        //   longitudeDelta: 0.0121
        // }}
        showsUserLocation={true}
      />
    );
  }
}
// long=2.3261295373323474 lat=48.901096047993114
