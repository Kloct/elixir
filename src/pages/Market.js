import React from 'react';
import { Container } from 'reactstrap';
import DataFormMarket from '../components/dataFormMarket';
import '../App.css';
import MarketTable from '../components/marketTable';
import WithLoading from '../components/WithLoading';
import API from '../helpers/api';

const MarketTableWithLoading = WithLoading(MarketTable);

export default class Market extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      invalid:false,
      notFound:false,
      loading:false, 
      isnull:true,
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
      invalid:false,
      notFound:false,
      isnull:false,
      loading:true,
      marketData: {
        marketTree: {},
        topN: {}
      }
    });
    // API Call
    API.post('/db/marketTable', filters)
    //done loading
    .then(({ data }) => {
      if (data.invalid){
        this.setState({
          invalid: true,
          loading: false,
          isnull: true
        })
      } else if (data.notFound){
        this.setState({
          notFound: true,
          loading: false,
          isnull: true
        })
      } else {
        this.setState(Object.assign(this.state, {
          loading:false, 
          isnull:false,
          marketData: {
            filters,
            marketTree: data.marketTree,
            quantities: data.quantities.map(hour=>[new Date(hour[0]*1000), hour[1]]),
            totals: data.totals,
            topSellers: data.topSellers.map(seller=>[seller.name, seller.total]),
            topItems: data.topItems.map(item=>[item.string, {v: item.total, f: `<font color="gold">${Math.round(item.total).toLocaleString()}g</font>`}, item.quantity])
          }
        }));
      }
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
          {this.state.invalid?<em>Invalid Input!</em>:null}
          {this.state.notFound?<em>No Results Found</em>:null}
          <MarketTableWithLoading isLoading={this.state.loading} isnull={this.state.isnull} marketData={this.state.marketData}/>
        </Container>
      </Container>
    );
  }
}
