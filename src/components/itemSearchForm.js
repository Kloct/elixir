import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

export default class ItemSearchForm extends React.Component {
  state = { search: "" }
  handleSubmit(event){
    event.preventDefault();
    this.props.itemSearch(this.state.search);
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} inline>
        <FormGroup>
          <Input
            type="search"
            placeholder="search item by id or name"
            value={this.state.search}
            onChange={e => this.setState({ search: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          {' '}
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}
