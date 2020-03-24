import React from 'react';
import { Container} from 'reactstrap';
import DataForm from '../components/dataForm';
import '../App.css';
import DataTable from '../components/dataTable';
import WithLoading from '../components/WithLoading';
import API from '../helpers/api'

const DataTableWithLoading = WithLoading(DataTable);

export default class Items extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      notFound:false,
      invalid:false,
      loading:false,
      isnull:true,
      dataTable:{},
      items: []
    }
  }
  componentDidMount(){
    API.get(`/db/itemList`)
      .then(({ data: items }) => { 
        this.setState({ items })
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
      dataTable:{}
    });
    // API Call
    API.post('/db/itemSalesHistory', filters)
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
      }
    });
  }
  
  render() {
    return (
      <Container className="content-home">
        <br /><br />
        <Container className="content">
          <h3>Filters</h3>
          <DataForm items={this.state.items} onSubmit={filters => this.filtersSubmitted(filters)}/>
        </Container>
        <br />
        <Container className="content">
          {this.state.invalid?<em>Invalid Input!</em>:null}
          {this.state.notFound?<em>No Results Found</em>:null}
          <DataTableWithLoading isLoading={this.state.loading} isnull={this.state.isnull} dataTable={this.state.dataTable}/>
        </Container>
      </Container>
    );
  }
}
