import Spinner from 'react-spinner-material';
import React, { Component } from 'react';

export default class Loader extends Component {
  render() {
  return (
      <div style={{position:"fixed", left:"45%", top:"40%"}}>
        <Spinner radius={120} color={"blue"} stroke={5} visible={true} />
      </div>
    );
  }
}