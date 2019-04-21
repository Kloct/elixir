import React from 'react';
import '../App.css';
import { formatString } from '../utils';

export default class ItemsDB extends React.Component {
  state = { items:this.props.items}
  render() {
    return (
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
    );
  }
}
