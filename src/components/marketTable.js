import React from 'react';
import '../App.css';
import { Chart } from "react-google-charts";
import {Row, Col } from 'reactstrap';

export default class MarketTable extends React.Component {
  
  render() {
    console.log(this.props.marketData)
    return (
      <div>
        <Row>
          <Col>
            <h1 align="center">{this.props.marketData.filters.server}</h1>
            <p align="center">{this.props.marketData.filters.startDate} - {this.props.marketData.filters.endDate}</p>
          </Col>
          <Col>
            <h4 align="center">Market Value: <font color="gold">{Math.round(this.props.marketData.totals.total).toLocaleString()}g</font></h4>
            <h6 align="center">Number of Transactions: {this.props.marketData.totals.listings.toLocaleString()}</h6>
          </Col>
        </Row>
        <hr/>
        <Chart
          height="1000px"
          chartType="TreeMap"
          data={this.props.marketData.marketTree}
          options={{
            maxDepth: 1,
            maxPostDepth: 2,
            fontFamily: 'sans-serif',
            fontSide: '20',
            minHighlightColor: '#8c6bb1',
            midHighlightColor: '#9ebcda',
            maxHighlightColor: '#edf8fb',
            minColor: '#009688',
            midColor: '#f7f7f7',
            maxColor: '#ee8100',
            headerColor: '#ffffff', 
            background: '#232934'
          }}
        />
        <hr/>
        <Chart
          chartType="Table"
          data={[
            [
              {type: 'string', label: 'Item'},
              {type: 'number', label: 'Total Gold'},
              {type: 'number', label: 'Total Sold'}
            ],
            ...this.props.marketData.topItems
          ]}
          options={{
            page: 'enable',
            width: '100%',
            allowHtml: true,
            cssClassNames: {
              headerRow: 'DataTable',
              tableRow: 'DataTable',
              oddTableTow: 'DataTable',
              headerCell: 'DataTable',
              tableCell: 'DataTable'
            }
          }}
        />
        <hr/>
        <Chart
          height="500px"
          chartType="LineChart"
          data={[['x', 'Quantity'], ...this.props.marketData.quantities]}
          options={{
            chartArea: {width: '80%', height: '50%'},
            title: "Transactions Over Time",
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
              title: 'Number of Transactions',
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
          data={[["Player", "Revenue"], ...this.props.marketData.topSellers]}
          options={{
            chartArea: {width: '80%', height: '80%'},
            title: `Top Sellers of ${this.props.marketData.filters.server} (${this.props.marketData.filters.startDate} - ${this.props.marketData.filters.endDate})`,
            titleTextStyle: {color:'white', fontSize: 20},
            pieHole: 0.5,
            backgroundColor: '#232934',
            pieSliceBorderColor: '#232934',
            pieSliceText: 'none',
            legend: {position: 'left', textStyle:{color:'white'}},
            toolTip: {text: 'value'}
          }}
        />
      </div>
    );
  }
}
