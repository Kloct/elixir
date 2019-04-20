import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import InfoTable from '../components/infoTable';
import SellerTable from '../components/sellerTable';
import '../App.css';
import { colorPicker } from '../utils';
import { Doughnut } from 'react-chartjs-2';
import WithLoading from './WithLoading';

const SellerTableWithLoading = WithLoading(SellerTable);
const InfoTableWithLoading = WithLoading(InfoTable);

export default class Rankings extends React.Component {
  state = { info: [], top: [], serverSelect: "Velika", chartInfo:{}, serverInfoLoading:false, topNLoading:false}
  componentDidMount(){
    this.setState({ serverInfoLoading:true })
    this.setState({ topNLoading:true })
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
        this.setState({ serverInfoLoading:false })
        console.log(this.state)
    })
    fetch(`/db/topN`)
      .then(data => data.json())
      .then(top => { 
        this.setState({ top })
        this.setState({ topNLoading:false })
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
              <InfoTableWithLoading isLoading={this.state.serverInfoLoading} info={this.state.info}/>
            </Col>
            <Col align="center">
              <h2>Seller Ranking</h2>
              <br/>
              <SellerTableWithLoading isLoading={this.state.topNLoading} filteredTop={filteredTop} changeServer={this.changeServer.bind(this)}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
