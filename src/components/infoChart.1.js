import React from 'react';
import { Doughnut } from 'react-chartjs-2';

var options = {
	//Boolean - Whether we should show a stroke on each segment
	segmentShowStroke : true,

	//String - The colour of each segment stroke
	segmentStrokeColor : "#232934",

	//Number - The width of each segment stroke
	segmentStrokeWidth : 2,

	//Number - The percentage of the chart that we cut out of the middle
	percentageInnerCutout : 50, // This is 0 for Pie charts

	//Number - Amount of animation steps
	animationSteps : 100,

	//String - Animation easing effect
	animationEasing : "easeOutBounce",

	//Boolean - Whether we animate the rotation of the Doughnut
	animateRotate : true,

	//Boolean - Whether we animate scaling the Doughnut from the centre
	animateScale : false,
}
export default class InfoChart extends React.Component {
  render() {
    return (
			<Doughnut data={this.props.chartInfo} options={options} width="250" height="320"/>
    );
  }
}
