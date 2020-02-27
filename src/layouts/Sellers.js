import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import DataFormSellers from '../components/dataFormSellers';
import '../App.css';
import SellersTable from '../components/sellersTable';
import WithLoading from '../components/WithLoading';

const SellersTableWithLoading = WithLoading(SellersTable);

export default class Sellers extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sellerLoading:false,
      sellerNull:true,
      sellerData: {
        marketTree: {},
        topN: {}
      }
    }
  }
  //filters recevied
  filtersSubmitted(filters){
    //started loading
    this.setState({
      sellersNull:false,
      sellersLoading:true,
      sellersData: {
        filters
      }
    });
    console.log(this.state)
    this.setState({
      sellersLoading:false,
      sellersNull:false

    })
    // API Call
    /*fetch('/db/marketTree', {
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
    });*/
  }
  
  render() {
    return (
      <Container className="content-home">
        <br /><br />
        <Container className="content">
          <h3>Filters</h3>
          <DataFormSellers onSubmit={filters => this.filtersSubmitted(filters)}/>
        </Container>
        <br />
        <Container className="content">
          <SellersTableWithLoading isLoading={this.state.sellersLoading} isnull={this.state.sellersNull} sellersData={this.state.sellersData}/>
        </Container>
      </Container>
    );
  }
}
