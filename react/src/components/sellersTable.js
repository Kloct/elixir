import React from 'react';
import '../App.css';
import { Chart } from "react-google-charts";
import {Row, Col } from 'reactstrap';

export default class SellersTable extends React.Component {
  
  render() {
    return (
      <div>
        <Row>
          <Col>
            <h1 align="center">{this.props.sellersData.filters.name}</h1>
            <h6 align="center">{this.props.sellersData.filters.startDate} - {this.props.sellersData.filters.endDate}</h6>
            <h6 align="center">Seller Rank: {this.props.sellersData.rank}</h6>
          </Col>
          <Col>
            <h4 align="center" style={{paddingTop: '20px'}}> Revenue: <font color="gold">{Math.round(this.props.sellersData.revenue).toLocaleString()}g</font></h4>
            <h6 align="center">({this.props.sellersData.percentage.toLocaleString()}% of total broker revenue)</h6>
          </Col>
        </Row>
        <hr/>
        <Chart
          chartType="Table"
          data={[
            [
              {type: 'string', label: 'Item'},
              {type: 'number', label: 'Total Gold'},
              {type: 'number', label: 'Total Sold'}
            ],
            ...this.props.sellersData.sellersItems
          ]}
          options={{
            page: 'enable',
            width: '100%',
            allowHtml: true,
            cssClassNames: {
              headerRow: 'dataTable',
              tableRow: 'dataTable',
              oddTableTow: 'dataTable',
              headerCell: 'dataTable',
              tableCell: 'dataTable'
            }
          }}
        />
        <hr/>
        <Chart
          height="1000px"
          chartType="TreeMap"
          data={this.props.sellersData.sellersTree}
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
            background: '#232934',
            generateTooltip: (row, size, value) => {
              return (
                `<div style="background:black; padding:10px; color:white; border-radius: 10px">
                Total Value: <font color="gold">${Math.round(size).toLocaleString()}g</font>
                </div>`
              )
            }
          }}
        />
        <hr/>
        <Chart
          height="500px"
          chartType="LineChart"
          data={[['x', 'Quantity'], ...this.props.sellersData.quantities]}
          options={{
            chartArea: {width: '80%', height: '50%'},
            title: "Activity",
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
      </div>
    );
  }
}
