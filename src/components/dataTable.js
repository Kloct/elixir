import React from 'react';
import '../App.css';
import { Chart } from "react-google-charts";
import {Row, Col } from 'reactstrap';

export default class BrokerAnalytics extends React.Component {
  
  render() {
    console.log(this.props.dataTable.topSellersData)
    return (
      <div>
        <Row>
          <Col>
            <h1 align="center">{this.props.dataTable.filters.item}</h1>
            <p align="center">{this.props.dataTable.filters.startDate} - {this.props.dataTable.filters.endDate}</p>
          </Col>
          <Col>
            <h4 align="center">Average Price: <font color="gold">{this.props.dataTable.marketInfo.avgPrice.toLocaleString()}g</font></h4>
            <h6 align="center">Item Market Value: <font color="gold">{Math.round(this.props.dataTable.marketInfo.itemValue/10000).toLocaleString()}g</font></h6>
            <h6 align="center">{Math.round((this.props.dataTable.marketInfo.itemValue/this.props.dataTable.marketInfo.totalValue)*10000)/100}% of All Brokered Sales</h6>  
          </Col>
        </Row>
        <hr/>
        <Chart
          height="500px"
          chartType="LineChart"
          data={[['x', 'Price'], ...this.props.dataTable.PdQNew]}
          options={{
            chartArea: {width: '80%', height: '50%'},
            title: "Average Price Over Time",
            titleTextStyle: {color:'white', fontSize: 20},
            backgroundColor: '#232934',
            hAxis: {
              title: 'Time',
              titleTextStyle: {color: 'white'},
              textStyle: {color: 'white'},
              gridlines: { color: 'black' },
              slantedText: true,
              showTextEvery: 4
            },
            vAxis: {
              title: 'Price in Gold',
              titleTextStyle: {color: 'white'},
              textStyle: {color: 'white'},
              gridlines: { color: 'black' }
            },
            legend: {
              position: 'top',
              textStyle: {color: 'white'}
            }
          }}
        />
        <hr/>
        <Chart
          height="500px"
          chartType="PieChart"
          data={[["Player", "Quantity Sold"], ...this.props.dataTable.topSellersData]}
          options={{
            chartArea: {width: '80%', height: '80%'},
            title: "Top 10 Sellers",
            titleTextStyle: {color:'white', fontSize: 20},
            pieHole: 0.5,
            backgroundColor: '#232934',
            pieSliceBorderColor: '#232934',
            pieSliceText: 'none',
            legend: {position: 'left', textStyle:{color:'white'}},
            toolTip: {text: 'value'}
          }}
        />
        <hr/>
        <Chart
          height="500px"
          chartType="LineChart"
          data={[['x', 'Quantity'], ...this.props.dataTable.QoTNew]}
          options={{
            chartArea: {width: '80%', height: '50%'},
            title: "Average Quantity Sold Over Time",
            titleTextStyle: {color:'white', fontSize: 20},
            backgroundColor: '#232934',
            hAxis: {
              title: 'Time',
              titleTextStyle: {color: 'white'},
              textStyle: {color: 'white'},
              gridlines: { color: 'black' },
              slantedText: true,
              showTextEvery: 4
            },
            vAxis: {
              title: 'Quantity',
              titleTextStyle: {color: 'white'},
              textStyle: {color: 'white'},
              gridlines: { color: 'black' }
            },
            legend: {
              position: 'top',
              textStyle: {color: 'white'}
            }
          }}
        />
        
      </div>
    );
  }
}
