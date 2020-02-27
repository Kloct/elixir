import React from 'react';
import { Row, Col, Input, Form, FormGroup, Label, Button } from 'reactstrap';
import '../App.css';

export default class DataFormSellers extends React.Component {
  state = {
    server: 'Velika',
    player: '',
    startDate:'',
    endDate:''
  }
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }
  render() {
    return (
    <Form onSubmit={this.handleSubmit}><Row>
        <Col>
          <FormGroup>
            <Label for="player">Player</Label>
            <Input name="player" id="player" type="search" placeholder="enter a players name" value={this.state.player} onChange={e => this.handleChange(e)}/>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="server">Server</Label>
            <Input type="select" name="server" id="server" value={this.state.server} onChange={e => this.handleChange(e)}>
              <option>Velika</option>
              <option>Kaiator</option>
            </Input>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup row>
            <Label for="startDate" sm={2}>Start</Label>
            <Col sm={9}>
              <Input type="date" id="startDate" name="startDate" value={this.state.startDate} onChange={e => this.handleChange(e)}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="startDate" sm={2}>End</Label>
            <Col sm={9}>
              <Input type="date"id="endDate" name="endDate" value={this.state.endDate} onChange={e => this.handleChange(e)}/>
            </Col>
          </FormGroup>
        </Col>
        <Col xs="auto">
          <Button onClick={e => this.handleSubmit(e)}>Apply Filters</Button>
        </Col>
    </Row></Form>
    );
  }
}
