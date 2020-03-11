import React from 'react';
import '../App.css';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

export default class SellerTable extends React.Component {
  state = {
    activeTab: 'Velika'
  }
  render() {
    let filteredTop = this.props.data.filter(
      (server) => {
        return server.server.indexOf(this.state.activeTab) !== -1;
      }
    );
    const { activeTab } = this.state
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink 
            className={classnames({ sellers: this.state.activeTab === 'Velika' })}
            onClick={()=>this.setState({activeTab: 'Velika' })}
          >
            Velika
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ sellers: this.state.activeTab === 'Kaiator' })}
              onClick={()=>this.setState({activeTab: 'Kaiator' })}
            >
              Kaiator
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId='Velika'>
            <table class="dataTable" style={{boarderTopLeftRadius: 'none'}} id="TopN">
              <thead>
                <tr class="dataTable">
                  <th class="dataTable">Character</th>
                  <th class="dataTable">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {filteredTop.map(server =>
                  <tr class="dataTable">
                    <td class="dataTable">{server.name}</td>
                    <td class="dataTable"><font color="gold">{Math.round(server.gold).toLocaleString()}g</font></td>
                  </tr>
                )}
              </tbody>
            </table>
          </TabPane>
          <TabPane tabId='Kaiator'>
            <table class="dataTable" id="TopN">
              <thead>
                <tr class="dataTable">
                  <th class="dataTable">Character</th>
                  <th class="dataTable">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {filteredTop.map(server =>
                  <tr class="dataTable">
                    <td class="dataTable">{server.name}</td>
                    <td class="dataTable"><font color="gold">{Math.round(server.gold).toLocaleString()}g</font></td>
                  </tr>
                )}
              </tbody>
            </table>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}
