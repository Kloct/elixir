import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../App.css';
export default class ItemWindow extends React.Component {

  render() {
    return (
      <Container class="item-window">
        <Row>
          <Col>Item Name</Col>
        </Row>
        <Row>
          <Col>Logo</Col>
        </Row>
          <hr />
        <Row>
          <Col>Tooltip</Col>
        </Row>
        <hr />
        <Row>
          
        </Row>
      </Container>
    );
  }
}
