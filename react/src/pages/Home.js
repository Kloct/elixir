import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Carousel from '../components/carousel';
import HomeMedia from '../components/homeMedia';
import Rankings from '../components/rankings';
import '../App.css';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Container className="content-home">
          <Row>
            <Col align="center">
              <br /><br />
              
              <Carousel />
              <br/>
            </Col>
          </Row>
          <Container className="content">
            <Row>
              <Col>
                <HomeMedia icon="fa fa-bar-chart" heading="Item Statistics" content="Track the value of a particular item over time. Use historical market trends to ensure you're getting the most from every sale"/>
              </Col>
              <Col>
                <HomeMedia icon="fa fa-cubes" heading="Market Composition" content="See the total composition of a server's market divided into segments over a period of time."/>
              </Col>
            </Row>
            <Row>
              <Col>
                <HomeMedia icon="fa fa-trophy" heading="Leaderboards" content="View the top sellers on your server and drill down to find out how they make their money."/>
              </Col>
              <Col>
                <HomeMedia icon="fa fa-server" heading="Ongoing Development" content="New features are being added all the time! View the Change Log stay updated on future changes."/>
              </Col>
            </Row>
          </Container>
            <Row>
              <Col>
                <Rankings />
              </Col>
            </Row>
        </Container>
      </div>


    );
  }
}
