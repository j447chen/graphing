import React, {
    Component
} from 'react';
import {
    Form,
} from 'semantic-ui-react'
import './GraphInput.css'
import 'semantic-ui-css/semantic.min.css'

class GraphInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mathFunction: "",
            minX: -50, //default values
            maxX: 50,
            minY: -100,
            maxY: 100,
            axisFocus: "X",
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleFunc = this.handleFunc.bind(this);
        this.handleInvalidInterval = this.handleInvalidInterval.bind(this);
        this.handleLabel = this.handleLabel.bind(this);
        this.getMinMax = this.getMinMax.bind(this);
    }
  //obj = {mathFunc: "", minX: "", maxX: "", minY: "", maxY: "", id: ""}
    handleClick(event) {
        event.preventDefault();
        console.log('submit click');
        this.props.updateList({mathFunc: this.state.mathFunction, minX: this.state.minX, maxX: this.state.maxX, minY: this.state.minY, maxY: this.state.maxY});
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
        // this.setState({
        //     [name]: event.target.value,
        // })
        this.setState((state, props) => ({
            axisFocus: changeTo,
        }));

    }
    getMinMax(axisFocus="X"){
        console.log("getminmax called");
        switch(axisFocus){
            case "X": 
                return ({
                    min: this.state.minX,
                    max: this.state.maxX,
                })
            case "Y": 
                return ({
                    min: this.state.minY,
                    max: this.state.maxY,
                })
            default:
                return ({
                    min: this.state.minX,
                    max: this.state.maxX,
                })
        }
    }
    render() {
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
                               <div class = "ui labeled right input">
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
                <Form class = 'ui'>
                {/* Function Input */}
                < div class = "field">
                    <label> Function </label> 
                    <div class = "ui labeled input">
                        <div class = "ui basic label">
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
            </div>
        )
    }
}

export default GraphInput;

