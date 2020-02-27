import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import DataFormMarket from '../components/dataFormMarket';
import '../App.css';
import MarketTable from '../components/marketTable';
import WithLoading from '../components/WithLoading';
import { quantile } from 'd3';

const MarketTableWithLoading = WithLoading(MarketTable);

export default class Market extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      treeLoading:false, 
      treeNull:true,
      topNLoading:false,
      topNNull:true,
      marketData: {
        marketTree: {},
        topN: {}
      }
    }
  }
  //filters recevied
  filtersSubmitted(filters){
    //started loading
    this.setState({
      treeNull:false,
      treeLoading:true,
      topNNull:false,
      topNLoading:true,
      marketData: {
        marketTree: {},
        topN: {}
      }
    });
    // API Call
    fetch('/db/marketTable', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters)
    })
    .then(data => data.json())
    //done loading
    .then(data => {
      this.setState(Object.assign(this.state, {
        treeLoading:false, 
        treeNull:false,
        marketData: {
          filters,
          marketTree: data.marketTree,
          quantities: data.quantities.map(hour=>[new Date(hour[0]*1000), hour[1]]),
          totals: data.totals,
          topSellers: data.topSellers.map(seller=>[seller.name, seller.total]),
          topItems: data.topItems.map(item=>[item.string, {v: item.total, f: `<font color="gold">${Math.round(item.total).toLocaleString()}g</font>`}, item.quantity])
        }
      }));
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
          <MarketTableWithLoading isLoading={this.state.treeLoading} isnull={this.state.treeNull} marketData={this.state.marketData}/>
        </Container>
      </Container>
    );
  }
}
