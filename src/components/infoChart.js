import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default class InfoChart extends React.Component {
  render() {
    return (
			<div>
				<Doughnut data={this.props.chartInfo}/>
				
			</div>
    );
  }
}
