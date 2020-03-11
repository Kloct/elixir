import React from 'react';
import '../App.css';

export default class InfoTable extends React.Component {
  render() {
    return (
      <div>
        <table class="dataTable">
          <thead class="dataTable">
            <tr class="dataTable">
              <th class="dataTable">Server</th>
              <th class="dataTable">Sales</th>
              <th class="dataTable">Market Value</th>
            </tr >
          </thead>
          <tbody class="dataTable">
            {this.props.info.map(server =>
              <tr class="dataTable" key={server.server}>
                <td class="dataTable" value={server.server}>{server.server}</td>
                <td class="dataTable">{server.sales.toLocaleString()}</td>
                <td class="dataTable"><font color="gold">{Math.round(server.value).toLocaleString()}g</font></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    )
  }
}
