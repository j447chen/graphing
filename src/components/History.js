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

    componentDidMount () {
        console.log("HEIIIIIIGHHHHT" + this.myDiv.current.offsetHeight)
      }

    render(){
        const displayList = this.props.historyList.map((obj) => (<HistoryEntries handleDelete={this.props.handleDelete} obj={obj}></HistoryEntries>))
        return (
            <React.Fragment>
            <div ref={this.myDiv} id="scrollableDiv" style={{ height: this.props.historyHeight, overflow: "auto" }} className="container"> 
            <InfiniteScroll dataLength="10" scrollableTarget="scrollableDiv">
                {displayList}
                {/* <HistoryEntries></HistoryEntries>
                <HistoryEntries></HistoryEntries>
                <HistoryEntries></HistoryEntries>
                <HistoryEntries></HistoryEntries>
                <HistoryEntries></HistoryEntries>
                <HistoryEntries></HistoryEntries> */}
            </InfiniteScroll>
            </div>
            </React.Fragment>
        )
    }

}

export default History;