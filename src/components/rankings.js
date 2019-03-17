import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import InfoTable from '../components/infoTable';
import SellerTable from '../components/sellerTable';
import '../App.css';
import { colorPicker } from '../utils';
import { Doughnut } from 'react-chartjs-2';

export default class Rankings extends React.Component {
  state = { info: [], top: [], serverSelect: "Velika", chartInfo:{} }
  componentDidMount(){
    fetch('/db/serverinfo')
      .then(d => d.json())
      .then(info => {
        this.setState({ info });
        this.setState({
          chartInfo: {
            datasets:[{
              data: info.map(info => {return info.sales}),
              backgroundColor: info.map(element => {return colorPicker().c}),
              borderColor: "#232934"
            }],
            labels: info.map(info => {return info.server})
         }
        })
    })
    fetch(`/db/topN`)
      .then(data => data.json())
      .then(top => { this.setState( { top })
    })
  }
  changeServer(event) {
    this.setState({serverSelect: event.target.value});
  }

  render() {
    let filteredTop = this.state.top.filter(
      (server) => {
        return server.server.indexOf(this.state.serverSelect) !== -1;
      }
    );
    return (
      <div>
        <br />
        <Container className="content">
          <Row>
            <Col align="center">
              <h2>Server Ranking</h2>
              <br/>
              <Doughnut data={this.state.chartInfo} width={200} height={150} options={{maintainAspectRatio: true, layout: {padding: {bottom: 50}}}}/>
              <InfoTable info={this.state.info}/>
            </Col>
            <Col align="center">
              <h2>Seller Ranking</h2>
              <br/>
              <SellerTable filteredTop={filteredTop} changeServer={this.changeServer.bind(this)}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
