import React, {
    Component
} from 'react';
// import {
//     Button,
//     Card,
//     Image,
//     Input,
//     Label,
//     Form,
//     Container,
//     Checkbox
// } from 'semantic-ui-react'
import './HistoryEntries.css'
import 'semantic-ui-css/semantic.min.css'

class HistoryEntries extends Component {
    constructor(props){
        super(props);
        this.handleDeleteEntry = this.handleDeleteEntry.bind(this);
    }

    handleDeleteEntry(){
        this.props.handleDelete(this.props.obj);
    }

    render(){
    return (
        <div className="card-layout ui segment black"> 
            {/* <div className="functionInput"> */}
            <div class = "ui labeled input functionInput">
                        <div class = "ui basic label">
                        Y = 
                        </div>
                        <input 
                        type = "text"
                        name = "first-name"
                        value = {this.props.obj.mathFunc} />
                        <button class="ui icon button"> <i class="save outline icon"></i></button>
                    </div>
            {/* </div> */}
            <div className="button1">
            <label> Function </label> 
            </div>
            <div className="button2 basic ui icon buttons">
                    <button onClick={this.handleDeleteEntry}class="ui button"> <i class="times circle outline icon"></i></button>
            </div>
            {/* <div className="function2"></div> */}
        </div>
    )
    }
}

export default HistoryEntries;

// onClick={props.handleDelete(props.obj)}