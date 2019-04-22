import d3 from "d3";
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './Graph.css'
import dimensionCalculator from './../utilities/dimensionCalculator'
window.d3 = d3;


const functionPlot = require("function-plot");
let graph = null;

class Graph extends Component {
    constructor(props){
        super(props);
        this.initializeChart = this.initializeChart.bind(this);
        this.graphToDisplay = this.graphToDisplay.bind(this);
    }

    componentDidMount(){
        console.log("initalizeChart")
        this.initializeChart(600,600);
        this.initializeChart(dimensionCalculator().width,dimensionCalculator().height);
    }
    // ((window.innerWidth - (2*16) - (3*10))*2/3)*0.90
    //                 <Graph historyList={this.state.historyList} compareIds={this.state.compareIds}
    // compareOn={this.state.compareOn} selectedId={this.state.selectedId}></Graph>
    
    graphToDisplay(){
        if (this.props.compareOn){
            const newData = this.props.compareIds.map((obj) => ({fn:obj.mathFunc}));
            return ({
                data: newData,
                axis: {minX: -200, maxX: 200, minY: -200, maxY: 200}
            })
        }
        if (this.props.selectedId !== null){
            const obj = this.props.selectedId;
            return ({
                data: [{fn: obj.mathFunc}],
                axis: {minX: obj.minX, maxX: obj.maxX, minY: obj.minY, maxY: obj.maxY},
            })
        }
        const firstObj = this.props.historyList[0];
        return ({
            data: [{fn: firstObj.mathFunc}],
            axis: {minX: firstObj.minX, maxX: firstObj.maxX, minY: firstObj.minY, maxY: firstObj.maxY},
        })
    }

    componentWillReceiveProps(newProps){
        console.log(newProps)
        console.log('received props');
        // if (this.props.selectedId !== newProps.selectedId || this.props.compareOn != newProps.compareOn || this.props.historyList.length != this.props.historyList.length 
        //     || this.props.historyList[0] != newProps.historyList[0]){
            const graphObj = this.graphToDisplay();
            this.initializeChart(newProps.width, newProps.height, graphObj);
            graph.draw();
        
    }
    
    initializeChart(width, height, graphObj={data: [{fn: "x^3"}], axis: {minX: "-50", maxX: "50", minY:"-50", maxY:"50"}}){
    // if (graphObj === null){return;}

    let el = ReactDOM.findDOMNode(this.refs.myChart)
    console.log(el);
    graph = functionPlot({
      target: el,
      width: width,
      height: height,
      yAxis: { domain: [graphObj.axis.minY, graphObj.axis.maxY] },
      xAxis: {domain: [graphObj.axis.minX,graphObj.axis.maxX]},
      tip: {
        renderer: function() {}
      },
      grid: true,
      font: 12,
      data: graphObj.data,
    })
  }
    render(){
        return (
            <div className='graph' ref="myChart" > </div>
        )
    }
}

export default Graph;