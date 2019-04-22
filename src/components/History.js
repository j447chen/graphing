import React, {
    PureComponent
} from 'react';
// import {
//     Button,
//     Card,
//     Image,
//     Input,
//     Label,
//     Form,
//     Container,
//     Select,
//     Segment
// } from 'semantic-ui-react'
import './History.css'
import 'semantic-ui-css/semantic.min.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import HistoryEntries from './HistoryEntries';

class History extends PureComponent{
    constructor(props){
        super(props);
        this.myDiv = React.createRef()

    }
    render(){
        const displayList = this.props.historyList.map((obj) => (<HistoryEntries changeSelectedId={this.props.changeSelectedId} handleDelete={this.props.handleDelete} obj={obj}></HistoryEntries>))
        return (
            <React.Fragment>
            <div ref={this.myDiv} id="scrollableDiv" style={{ height: this.props.historyHeight, overflow: "auto" }} className="container"> 
            <InfiniteScroll dataLength="10" scrollableTarget="scrollableDiv">
                {displayList}
            </InfiniteScroll>
            </div>
            </React.Fragment>
        )
    }
}

export default History;