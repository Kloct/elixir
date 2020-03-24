import React from 'react';
import '../App.css';

export default class InfoTable extends React.Component {
  render() {
    return (
      <div>
        <table className="dataTable">
          <thead className="dataTable">
            <tr className="dataTable">
              <th className="dataTable">Server</th>
              <th className="dataTable">Sales</th>
              <th className="dataTable">Market Value</th>
            </tr >
          </thead>
          <tbody className="dataTable">
            {this.props.info.map(server =>
              <tr className="dataTable" key={server.server}>
                <td className="dataTable" value={server.server}>{server.server}</td>
                <td className="dataTable">{server.sales.toLocaleString()}</td>
                <td className="dataTable"><font color="gold">{Math.round(server.value).toLocaleString()}g</font></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    )
  }
}
