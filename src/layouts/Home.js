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
          <div className="content">
            <Row>
              <Col>
                <HomeMedia icon="fa fa-bar-chart" heading="Broker Analytics" content="See whose selling what and track the items that you want over time. Discover market trends and use them to further you economic pursuits!"/>
                <HomeMedia icon="fa fa-trophy" heading="Leaderboards" content="View which server has the greatest market value and which players are the most active on the trade broker."/>
              </Col>
              <Col>
                <HomeMedia icon="fa fa-database" heading="Item Database" content="Search for information on items in the game. Find where to get them and view their current value in the marketplace."/>
                <HomeMedia icon="fa fa-server" heading="Still More to Come!" content="This site is still in the early stages of development and there are many more features to come. Visit the Heaven's Elixir Discord to learn more."/>
              </Col>
            </Row>
          </div>
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
