import React from 'react';
import { Row, Col, Input, Form, FormGroup, Label, Button } from 'reactstrap';
import '../App.css';

export default class DataForm extends React.Component {
  state = {
    server: 'Velika',
    item: '',
    startDate:'',
    endDate:'',
    activeSuggestion: 0,
    suggestions: [],
    showSuggestions: false
  }
    
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if(e.target.name==="item"){
      if(e.target.value.length === 0){
        this.setState({ suggestions: null })
      } else {
        this.setState({
          activeSuggestion: 0,
          suggestions: this.props.items.filter(item=>item.toLowerCase().includes(e.target.value.toLowerCase())).slice(0, 10),
          showSuggestions: true
        })
      }
    }
  }
  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      suggestions: [],
      showSuggestions: false,
      item: e.currentTarget.innerText
    });
  }
  onKeyDown = e => {
    const { activeSuggestion, suggestions } = this.state;
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        item: suggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) return;
      this.setState({ activeSuggestion: activeSuggestion -1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion -1 === suggestions.length) return
      this.setState({ activeSuggestion: activeSuggestion +1 });
    }
  }
  handleSubmit = e => {
    let { server, item, startDate, endDate } = this.state
    if(!this.props.items.includes(item)) return
    else if (item === '' || startDate === '' || endDate === '') return // TODO add message for this
    e.preventDefault();
    this.props.onSubmit({ server, name: item, startDate, endDate })
    this.setState({showSuggestions:false})
  }
  render() {
    const {
      handleChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        suggestions,
        showSuggestions,
        item
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && item) {
      if (suggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions"type="none">
            {suggestions.map((item, index) => {
              let className;
              if (index === activeSuggestion) {
                className="suggestion-active"
              }

              return (
                <li
                  className={className}
                  key={item}
                  onClick={onClick}
                >
                  {item}
                </li>
              )
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>Item "{item}" not found</em>
          </div>
        )
      }
    }
    return (
    <Form onSubmit={this.handleSubmit}><Row>
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
          <FormGroup>
            <Label for="item">Item</Label>
            <Input
              name="item"
              id="item"
              type="search"
              placeholder="search item by name"
              value={item}
              onChange={handleChange}
              onKeyDown={onKeyDown}
            />
            {suggestionsListComponent}
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
