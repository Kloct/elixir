import React from 'react';
import '../App.css';

export default class InfoTable extends React.Component {
  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Server</th>
              <th>Sales</th>
              <th>Market Value</th>
            </tr>
          </thead>
          <tbody>
            {this.props.info.map(server =>
              <tr key={server.server}>
                <td value={server.server}>{server.server}</td>
                <td>{server.sales.toLocaleString()}</td>
                <td>{Math.round(server.values).toLocaleString()}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    )
  }
}
