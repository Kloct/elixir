import React from 'react';
import '../App.css';

export default class SellerTable extends React.Component {
  render() {
    return (
      <div>
        <div>
          <button className="button" type="button" value="Velika" onClick={this.props.changeServer.bind(this)}>Velika</button>
          <button className="button" type="button" value="Kaiator" onClick={this.props.changeServer.bind(this)}>Kaiator</button>
        </div>
        <br />
        <table id="TopN">
          <thead>
            <tr>
              <th>Server</th>
              <th>Gold</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.filteredTop.map(server =>
              <tr>
                <td>{server.server}</td>
                <td>{Math.round(server.gold).toLocaleString()}</td>
                <td>{server.name}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}
