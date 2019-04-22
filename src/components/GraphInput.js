import React, {
    Component
} from 'react';
import {
    Form,
    Input,
} from 'semantic-ui-react'
import './GraphInput.css'
import 'semantic-ui-css/semantic.min.css'
const math = require('mathjs')
window.d3 = require('d3')
const functionPlot = require('function-plot')

class GraphInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mathFunction: "",
            minX: -50, //default values
            maxX: 50,
            minY: -100,
            maxY: 100,
            rangeXError: false,
            rangeYError: false,
            functionError: false,
            axisFocus: "X"
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleFunc = this.handleFunc.bind(this);
        this.handleInvalidInterval = this.handleInvalidInterval.bind(this);
        this.handleLabel = this.handleLabel.bind(this);
        this.functionChecker = this.functionChecker.bind(this);
        //console.log(math.eval("2fds"));
    }
    functionChecker(){
        const trig = ["sin", "cos", "tan", "cot", "sec", "csc"];
    
        return true;
    }

  //obj = {mathFunc: "", minX: "", maxX: "", minY: "", maxY: "", id: ""}
    handleClick(event) {
        event.preventDefault();
        //rangecheck
        if (this.state.maxX <= this.state.minX){
            this.setState({
                rangeXError: true,
            })
            return;
        }
        else if (this.state.maxY <= this.state.minY){
            this.setState({
                rangeYError: true,
            })
            return;
        }
        else if (this.functionChecker() === "false"){
            this.setState({
                functionError: true,
            })
            return;
        }
        else {
            this.setState({
                rangeXError : false,
                rangeYError : false,
                functionError : false,
            }, () => this.props.updateList({mathFunc: this.state.mathFunction, minX: this.state.minX, maxX: this.state.maxX, minY: this.state.minY, maxY: this.state.maxY})) 
        }  
    }

    handleFunc(event) {
        event.preventDefault();
        this.setState({
            mathFunction: event.target.value,
        });
    }

    handleInvalidInterval = name => event => {
        event.preventDefault();
        this.setState({
            [name]: event.target.value,
        })
    }

    handleLabel = (changeTo) => event => {
        event.preventDefault();
        this.setState((state, props) => ({
            axisFocus: changeTo,
        }));
    }
    render() {
        const errorPrompt = this.state.rangeXError || this.state.rangeYError || this.state.functionError ?
         <div class="ui negative message">
                Please Check Function and/or X,Y Axis Ranges
        </div>  : null;
        
      const displayAxis = this.state.axisFocus === "X" ? (
                                <div class="field">
                                <label>
                                    <label class="ui label gray" onClick={this.handleLabel("X")}> X-Axis </label>
                                    <label onClick={this.handleLabel("Y")}> Y-Axis </label>
                                </label>
                            <div class = "two fields">
                                <div class="field">
                                    <div class = "ui labeled input">
                                        <div class = "ui basic label">
                                        [
                                        </div>
                                        <input onChange={this.handleInvalidInterval("minX")} type="text" placeholder={this.state.minX} id="minX"
                                            value={this.state.minX}></input>
                                    </div>
                                </div>
                                ,
                                <div class = "field">
                                    <div class = "ui labeled right input">
                                        <input onChange={this.handleInvalidInterval("maxX")} type="text" placeholder={this.state.maxX} id="maxX"
                                            value={this.state.maxX}></input>
                                        <div class = "ui basic label">
                                        ]
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ) :
                        <div class="field">
                        <label>
                            <label onClick={this.handleLabel("X")}> X-Axis </label>
                            <label class="ui label gray" onClick={this.handleLabel("Y")}> Y-Axis </label>
                        </label>
                       <div class = "two fields">
                           <div class="field">
                               <div class = "ui labeled input">
                                   <div class = "ui basic label">
                                   [
                                   </div>
                                   <input onChange={this.handleInvalidInterval("minY")} type="text" placeholder={this.state.minY} id="minY"
                                    value={this.state.minY}></input>
                               </div>
                           </div>
                           ,
                           <div class = "field">
                               <div class = "ui labeled input">
                                   <input onChange={this.handleInvalidInterval("maxY")}  type="text" placeholder={this.state.maxY} id="maxY"
                                        value={this.state.maxY}></input>
                                   <div class = "ui basic label">
                                   ]
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
        return ( 
            <div className="form">
                <Form className = 'ui'>
                {/* Function Input */}
                < div className = "field">
                    <label> Function </label> 
                    <div className = "ui labeled input">
                        <div className = "ui basic label">
                        Y = 
                        </div>
                        <input onChange = {
                        this.handleFunc
                        }
                        type = "text"
                        name = "first-name"
                        placeholder = "try sin(x) ..." />
                    </div>
                </div> 
                    
                {/* XY-Axis Input */}
                {displayAxis}
                
                {/* Submit Button  */}
                <button onClick = {
                    this.handleClick
                    }
                    class = "ui button"
                    type = "submit"> Graph </button> 

                {/* End */}
                </Form>
                {errorPrompt}
            </div>
        )
    }
}

export default GraphInput;

