import React from 'react';
// import { Button, Card, Image, Input, Label, Form } from 'semantic-ui-react'
import './GraphInput.css'
import 'semantic-ui-css/semantic.min.css'
import './ChartButtons.css'

const ChartButtons = (props) => (
        <div class="ui icon buttons">
            <button class="ui button">
                <i class="expand icon"></i>
            </button>
            <button class="ui button">
                <i class="location arrow icon"></i>
            </button>
        </div>
);

export default ChartButtons;