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
      sellersLoading:false,
      sellersNull:true,
      sellersData: {}
    }
  }
  //filters recevied
  filtersSubmitted(filters){
    //started loading
    this.setState({
      sellersNull:false,
      sellersLoading:true,
      sellersData: {}
    });
    console.log(filters)
    // API Call
    fetch('/db/sellerTable', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters)
    })
    .then(data => data.json())
    //done loading
    .then(data => {
      this.setState({
        sellersNull:false,
        sellersLoading:false,
        sellersData: {
          filters,
          revenue: data.revenue,
          rank: data.rank,
          percentage: data.percentage,
          sellersTree: data.sellersTree,
          sellersItems: data.sellersItems.map(item=>[item.string, {v: item.total, f: `<font color="gold">${Math.round(item.total).toLocaleString()}g</font>`}, item.quantity]),
          quantities: data.quantities.map(hour=>[new Date(hour[0]*1000), hour[1]])
        }
      });
      console.log(this.state)
    });
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
