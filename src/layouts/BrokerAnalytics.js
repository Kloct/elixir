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
          filters,
          marketInfo: {
            itemValue: data.itemMarketValue[0].total,
            totalValue: data.marketValue[0].total,
            avgPrice: Math.round(data.sales.reduce((total, num)=> total + num.price , 0)/data.sales.length)
          },
          topSellersData: data.topN.map(data => [data.name, data.quantity]),
          PdQNew: data.sales.map(sale => [new Date(sale.time*1000), sale.price]),
          QoTNew: data.sales.map(sale => [new Date(sale.time*1000), sale.quantity])
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
          <DataTableWithLoading isLoading={this.state.loading} isnull={this.state.isnull} dataTable={this.state.dataTable}/>
        </Container>
      </Container>
    );
  }
}
