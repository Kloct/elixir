import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import DataFormMarket from '../components/dataFormMarket';
import '../App.css';
import MarketTable from '../components/marketTable';
import WithLoading from '../components/WithLoading';

const MarketTableWithLoading = WithLoading(MarketTable);

export default class Market extends React.Component {
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
    fetch('/db/marketTree', {
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
        dataTable: {
          filters,
          marketTree: data
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
          <DataFormMarket onSubmit={filters => this.filtersSubmitted(filters)}/>
        </Container>
        <br />
        <Container className="content">
          <MarketTableWithLoading isLoading={this.state.loading} isnull={this.state.isnull} dataTable={this.state.dataTable}/>
        </Container>
      </Container>
    );
  }
}
