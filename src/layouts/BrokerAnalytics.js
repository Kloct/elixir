import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import DataForm from '../components/dataForm';
import '../App.css';
import { colorPicker, formatDate } from '../utils';
import DataTable from '../components/dataTable';
import WithLoading from '../components/WithLoading';

const DataTableWithLoading = WithLoading(DataTable);

export default class BrokerAnalytics extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading:false, 
      isnull:true,
      dataTable:{}
    }
  }
  //filters recevied
  filtersSubmitted(filters){
    //started loading
    this.setState({
      isnull:false,
      loading:true,
      dataTable:{}
    });
    // API Call
    fetch('/db/itemSalesHistory', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters)
    })
    .then(data => data.json())
    //done loading
    .then(data => {
      this.setState({
        loading:false, 
        isnull:false,
        dataTable:{
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
          },
        }
      });
    });
  }
  
  render() {
    return (
      <Container className="content-home">
        <br /><br />
        <Container className="content">
          <h3>Filters</h3>
          <DataForm onSubmit={filters => this.filtersSubmitted(filters)}/>
        </Container>
        <br />
        <Container className="content">
        <Row>
          <Col>
            <DataTableWithLoading isLoading={this.state.loading} isnull={this.state.isnull} dataTable={this.state.dataTable}/>
          </Col>
        </Row>
        </Container>
      </Container>
    );
  }
}
