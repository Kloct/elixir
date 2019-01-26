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
                <HomeMedia icon="fa fa-database" heading="ItemsDB" content="Search for information on items in the game. Find where to get them and view their current value in the marketplace."/>
                <HomeMedia icon="fa fa-rss" heading="Remote Login (Comming Soon)" content="Log in to your characters remotely. Access the trade broker, chat with your friends, and claim your daily login rewards."/>
              </Col>
              <Col>
                <HomeMedia icon="fa fa-bar-chart" heading="Broker Tracking" content="See whose selling what and track the items that you want over time. Discover market trends and use them to further you economic pursuits!"/>
                <HomeMedia icon="fa fa-android" heading="App Integration (Comming Soon)" content="Search for items, monitor the trade broker and log in to your characters remotely all from the mobile app."/>
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
