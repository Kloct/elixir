import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import DataForm from '../components/dataForm';
import '../App.css';
import { colorPicker, formatDate } from '../utils';
import { Doughnut, Line } from 'react-chartjs-2';

export default class BrokerAnalytics extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      PdQ: {
        datasets: [{
            data: []
        }],
        labels: []
      },
      QoT: {
        datasets: [{
          data: []
        }],
        labels: []
      },
      topSellers: {
        datasets: [{
          data: []
        }],
        labels: []
      },
      marketInfo:{
        itemValue: null,
        totalValue: null
      }
    }
  }

  getItemSalesHistory(filters){
    fetch('/db/itemSalesHistory', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters)
    })
    .then(data => data.json())
    .then(data => {
      this.setState({ 
        PdQ: {
          datasets: [{
            data: data.sales.map(data => {return data.price}),
            label: "Price/Quantity Over Time",
            backgroundColor: colorPicker().c
          }],
          labels: data.sales.map(data => {return formatDate(data.time)}),
        },
        QoT: {
          datasets: [{
            data: data.sales.map(data => {return data.quantity}),
            label: "Quantity Sold Over Time",
            backgroundColor: colorPicker().c
          }],
          labels: data.sales.map(data => {return formatDate(data.time)}),
        },
        topSellers: {
          datasets: [{
            data: data.topN.map(data => {return data.quantity}),
            backgroundColor: data.topN.map(element => {return colorPicker().c}),
            borderColor: '#232934'
          }],
          labels: data.topN.map(data => {return data.name}),
        },
        marketInfo: {
          itemValue: data.itemMarketValue[0].total,
          totalValue: data.marketValue[0].total
        }
      });
      console.log('state:')
      console.log(this.state);
    });
  }
  
  render() {
    return (
      <Container className="content-home">
        <br /><br />
        <Container className="content">
          <h3>Filters</h3>
          <DataForm onSubmit={filters => this.getItemSalesHistory(filters)}/>
        </Container>
        <br />
        <Container className="content">
        <Row>
          <Col>
            <Doughnut data={this.state.topSellers} />
            <Line data={this.state.PdQ} />
            <Line data={this.state.QoT} />
            <h4>Value: {Math.round(this.state.marketInfo.itemValue/10000).toLocaleString()}</h4>
            <h4>{Math.round((this.state.marketInfo.itemValue/this.state.marketInfo.totalValue)*10000)/100}% of total market</h4>
          </Col>
        </Row>
        </Container>
      </Container>
    );
  }
}
