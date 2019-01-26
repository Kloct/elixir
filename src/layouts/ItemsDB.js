import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ItemSearchForm from '../components/itemSearchForm';
import '../App.css';
import { formatString } from '../utils';

export default class ItemsDB extends React.Component {
  state = { items:[] }

  itemSearch(search){
    fetch('/db/itemSearch', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ search })
    })
    .then(data => data.json())
    .then(items => {
      this.setState({ items });
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
            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>tooltip</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map(item =>
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.string}</td>
                    <td dangerouslySetInnerHTML={{__html: formatString(item.toolTip)}} />
                  </tr>
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>

    );
  }
}
