import React, { Component } from 'react';
import logo from "./logo.png";



class Banner extends Component {
  render() {
    return(
      <div class="pageheader form-control">
        <img src={logo} alt="Vinmonoholikern"/>
        <h3>Vinmonopol søk</h3>
      </div>
    );
  }
}

export default Banner;
