import React from 'react';
import '../App.css';

import { Doughnut, Line } from 'react-chartjs-2';

export default class BrokerAnalytics extends React.Component {
  
  render() {
    return (
      <div>
        <Doughnut data={this.props.dataTable.topSellers} />
        <Line data={this.props.dataTable.PdQ} />
        <Line data={this.props.dataTable.QoT} />
        <h4>Value: {Math.round(this.props.dataTable.marketInfo.itemValue/10000).toLocaleString()}</h4>
        <h4>{Math.round((this.props.dataTable.marketInfo.itemValue/this.props.dataTable.marketInfo.totalValue)*10000)/100}% of total market</h4>
      </div>
    );
  }
}
