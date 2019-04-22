import React from 'react';
// import { Button, Card, Image, Input, Label, Form } from 'semantic-ui-react'
import './GraphInput.css'
import 'semantic-ui-css/semantic.min.css'
import './ChartButtons.css'

const ChartButtons = (props) => (
        <div className="ui icon buttons right float" >
            <button className="ui button">
                <i className="expand icon"></i>
            </button>
            <button className="ui button">
                <i className="location arrow icon"></i>
            </button>
        </div>
);

export default ChartButtons;