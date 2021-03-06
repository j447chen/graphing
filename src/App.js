import React, { Component } from 'react';
import './App.css';
import Graph from './components/Graph'
import d3 from "d3";
import GraphInput from './components/GraphInput'
import ChartButtons from './components/ChartButtons';
import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-css/semantic.css'
import dimensionCalculator from './utilities/dimensionCalculator'
import History from './components/History'
import historyHeightCalculator from './utilities/historyHeightCalculator'

window.d3 = d3;
let shortid = require('shortid');

const sample_data = [{id: "rtGWCXEiL", mathFunc: "sin(2x)", maxX: 50, maxY:100, minX:"-100", minY:-100},
                    {id: "rtweXdfL", mathFunc: "cos(x)", maxX: 50, maxY:100, minX:"-100", minY:-100},
                    {id: "rtGWdfdfiL", mathFunc: "tan(0.5)", maxX: 50, maxY:100, minX:"-100", minY:-100},
                    {id: "rfGassEiL", mathFunc: "x^2+2x+3", maxX: 50, maxY:100, minX:"-100", minY:-100},
                    {id: "irikqiL", mathFunc: "x^3+33", maxX: 50, maxY:100, minX:"-100", minY:-100},
                    {id: "rtofoqmwiL", mathFunc: "x^293", maxX: 50, maxY:100, minX:"-100", minY:-100},
                    {id: "rtGgkqweiL", mathFunc: "x^29", maxX: 50, maxY:100, minX:"-100", minY:-100},
                    {id: "rfdkkqweiL", mathFunc: "sin(x)+cos(x)+23", maxX: 50, maxY:100, minX:"-100", minY:-100}];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      height: 200, 
      width: 200,
      mathFunc: "x^4",
      minX: -50,
      maxX: 50,
      historyHeight: 0,
      historyList : sample_data,
      compareOn : false,
      compareIds : [],
      selectedId : null,
    };

    this.initialScreenWidth = window.innerHeight;
    this.myDiv = React.createRef()
    this.updateDimensions = this.updateDimensions.bind(this);
    this.updateList = this.updateList.bind(this);
    this.changeSelectedId = this.changeSelectedId.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    console.log(this.state.height);
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
  }
  //obj = {mathFunc: "", minX: "", maxX: "", minY: "", maxY: "", id: ""}
  updateList(obj){
    const objWithid = {...obj, id: shortid.generate()};
    console.log("update list called with objwithid = " + objWithid)
    this.setState((state,props) => ({
      historyList: [objWithid,...state.historyList],
      selectedId: null,
      compareIds: [objWithid],
    }),() => this.updateDimensions());
  }

  changeSelectedId(obj){
    this.setState({
        selectedId : obj,
        compareIds: [obj] 
    });
  }

  updateDimensions() {
    this.setState({
      height: dimensionCalculator().height,
      width: dimensionCalculator().width,
      historyHeight: this.state.historyHeight === 0 ? this.myDiv.current.offsetHeight : historyHeightCalculator(this.initialScreenWidth, this.myDiv.current.offsetHeight)
    });
  }

  handleDelete(obj){
    const newList = this.state.historyList.filter(item => item.id !== obj.id);
    this.setState({
      historyList: newList,
    }, () => this.updateDimensions());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const graph = this.state.historyList.length > 0 ?  <Graph historyList={this.state.historyList} compareIds={this.state.compareIds}
    compareOn={this.state.compareOn} width={this.state.width} height={this.state.height} selectedId={this.state.selectedId}></Graph> : null; 

    return (
      <div  className="wrapper">
        <div  className="wrapper-chart">
          <div ref="Chart" className="chart1"> 
              {graph}
          </div>
          <div className="items-button"> 
            <ChartButtons></ChartButtons>
          </div>
        </div>
        <div className="wrapper-sidebar">
          <div className="sidebar-input">
              <GraphInput refresh={this.updateDimensions} updateList={this.updateList}></GraphInput>
          </div> 
          <div className="compare-button">
      {/* <button class="ui right floated button"> Some Action</button> */}
          {/* <div class="ui label">Compare</div> */}
          </div>
          <div ref={this.myDiv} className="sidebar-history">
              <History changeSelectedId={this.changeSelectedId} handleDelete={this.handleDelete} historyHeight={this.state.historyHeight} historyList={this.state.historyList}></History>
          </div>
        </div>
    </div>
    );
  }
}

export default App;
