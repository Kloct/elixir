import React from 'react';
import { Media } from 'reactstrap';
import '../App.css';

export default class HomeMedia extends React.Component {
  render() {
    return (
      <div>
        <Media style={{padding:'20px'}}>
          <Media left>
            <i className={this.props.icon} style={{fontSize: '70px', color:'white', paddingRight:'20px'}}></i>
          </Media>
          <Media body>
            <Media heading>
              {this.props.heading}
            </Media>
            {this.props.content}
          </Media>
        </Media>
      </div>


    );
  }
}
