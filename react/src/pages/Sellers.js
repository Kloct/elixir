import React from 'react';
import { Container } from 'reactstrap';
import DataFormSellers from '../components/dataFormSellers';
import '../App.css';
import SellersTable from '../components/sellersTable';
import WithLoading from '../components/WithLoading';
import API from '../helpers/api';

const SellersTableWithLoading = WithLoading(SellersTable);

export default class Sellers extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      invalid:false,
      notFound:false,
      loading:false,
      isnull:true,
      sellersData: {},
      sellers: []
    }
  }
  componentDidMount(){
    API.get(`/db/sellerList`)
      .then(({ data: sellers }) => { 
        this.setState({ sellers })
    })
  }
  //filters recevied
  filtersSubmitted(filters){
    //started loading
    this.setState({
      invalid:false,
      notFound:false,
      isnull:false,
      loading:true,
      sellersData: {}
    });
    console.log(filters)
    // API Call
    API.post('/db/sellerTable', filters)
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
        this.setState({
          isnull:false,
          loading:false,
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
      }
    });
  }
  
  render() {
    return (
      <Container className="content-home">
        <br /><br />
        <Container className="content">
          <h3>Filters</h3>
          <DataFormSellers sellers={this.state.sellers} onSubmit={filters => this.filtersSubmitted(filters)}/>
        </Container>
        <br />
        <Container className="content">
          {this.state.invalid?<em>Invalid Input!</em>:null}
          {this.state.notFound?<em>No Results Found</em>:null}
          <SellersTableWithLoading isLoading={this.state.loading} isnull={this.state.isnull} sellersData={this.state.sellersData}/>
        </Container>
      </Container>
    );
  }
}
