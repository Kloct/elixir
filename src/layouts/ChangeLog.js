import React from 'react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';
import sourceChangeLog from '../posts/changelog.md'
import sourceIssues from '../posts/issues.md'



export default class ChangeLog extends React.Component {
  state = {
    changelog: null,
    issues: null,
    activeTab: '1'
  }

  componentDidMount() {
    fetch(sourceChangeLog)
      .then(res => res.text())
      .then(changelog => this.setState((state)=>({ ...state, changelog })))
      .catch((err)=> console.error(err))
    fetch(sourceIssues)
      .then(res => res.text())
      .then(issues => this.setState((state)=>({ ...state, issues })))
      .catch((err)=> console.error(err))
  }
  render() {
    const { issues, changelog, activeTab } = this.state
    return (
      <Container className="content-home">
        <br /><br />
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={()=>this.setState({activeTab: '1' })}
              >
                Change Log
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={()=>this.setState({activeTab: '2' })}
              >
                Issues
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Container className="content">
                <ReactMarkdown source={changelog} />
              </Container>
            </TabPane>
            <TabPane tabId="2">
              <Container className="content">
                <ReactMarkdown source={issues} />
              </Container>
            </TabPane>
          </TabContent>
        
      </Container>
      );
  }
}
