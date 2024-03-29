import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import InfoTable from '../components/infoTable';
import SellerTable from '../components/sellerTable';
import '../App.css';
import { Chart } from 'react-google-charts';
import WithLoading from './WithLoading';
import API from '../helpers/api'

const InfoTableWithLoading = WithLoading(InfoTable);
const ChartWithLoading = WithLoading(Chart);

export default class Rankings extends React.Component {
  state = { info: [], top: [], serverSelect: "Velika", chartInfo:{}, serverInfoLoading:false, topNLoading:false}
  componentDidMount(){
    this.setState({ serverInfoLoading:true })
    this.setState({ topNLoading:true })
    API.get('/db/serverinfo')
      .then(({ data: info }) => {
        console.log(info)
        this.setState({ info });
        this.setState({
          chartInfo: [
            ["Server", "Sales"], 
            ...info.map(info=>[info.server, info.sales])
          ]
        })
        this.setState({ serverInfoLoading:false })
      })
      .catch(err=>(
        console.error(err)
      ))
    API.get(`/db/topN`)
      .then(({ data: top }) => { 
        this.setState({ top })
        this.setState({ topNLoading:false })
      })
  }

  render() {
    return (
      <div>
        <br />
        <Container className="content">
          <Row>
            <Col align="center">
              <h3 style={{align:'center'}}>Server Statistics</h3>
              <br/>
              <ChartWithLoading
                isLoading={this.state.serverInfoLoading}
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
              <h3 style={{align:'center'}}>Top Sellers</h3>
              <br/>
              <SellerTable data={this.state.top}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
