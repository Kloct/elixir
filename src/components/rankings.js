import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import InfoTable from '../components/infoTable';
import SellerTable from '../components/sellerTable';
import '../App.css';
import { colorPicker } from '../utils';
import { Chart } from 'react-google-charts';
import WithLoading from './WithLoading';

const SellerTableWithLoading = WithLoading(SellerTable);
const InfoTableWithLoading = WithLoading(InfoTable);
const ChartWithLoading = WithLoading(Chart);

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
          chartInfo: [
            ["Server", "Sales"], 
            ...info.map(info=>[info.server, info.sales])
          ]
        })
        this.setState({ serverInfoLoading:false })
        console.log(colorPicker())
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
              <ChartWithLoading
                isLoading={this.state.topNLoading}
                height="500px"
                chartType="PieChart"
                data={this.state.chartInfo}
                options={{
                  chartArea: {width: '80%', height: '80%'},
                  pieHole: 0.5,
                  backgroundColor: '#232934',
                  pieSliceBorderColor: '#232934',
                  pieSliceText: 'none',
                  legend: {position: 'top', textStyle:{color:'white'}},
                  toolTip: {text: 'value'}
                }}
              />
              <InfoTableWithLoading isLoading={this.state.serverInfoLoading} info={this.state.info}/>
              <br/>
              <p>*** Data updated hourly ***</p>
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
