import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ItemSearchForm from '../components/itemSearchForm';
import '../App.css';
import WithLoading from '../components/WithLoading';
import ItemTable from '../components/itemTable';

const ItemTableWithLoading = WithLoading(ItemTable);

export default class ItemsDB extends React.Component {
  state = { items:[], loading:false, isnull:true}

  itemSearch(search){
    this.setState({
      items:[],
      loading:true,
      isnull:false
    })
    fetch('/db/itemSearch', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ search })
    })
    .then(data => data.json())
    .then(items => {
      this.setState({ 
        items:items,
        loading:false,
        isnull:false
       });
    })
  }
  render() {
    return (
      <Container className="content-home">
        <br /><br />
        <Row>
          <Col>
            <ItemSearchForm itemSearch={this.itemSearch.bind(this)}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <ItemTableWithLoading isLoading={this.state.loading} isnull={this.state.isnull} items={this.state.items}/>
          </Col>
        </Row>
      </Container>

    );
  }
}
