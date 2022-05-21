import React, { Component } from 'react';
import classNames from 'classnames';

import './TrafficLight.css';

const RED = 0;
const ORANGE = 1;
const GREEN = 2;

class TrafficLight extends Component {
    constructor() {
        super();
        this.state = {
            curColor: RED,
        };

        setInterval(() => {
            this.setState({
                curColor: this.getNextColor(this.state.curColor),
            });
        }, 1000);
    }

    getNextColor(color) {
        switch (color) {
            case RED:
                return ORANGE;
            case ORANGE:
                return GREEN;
            default:
                return RED;
        }
    }

    render() {
        const { curColor } = this.state;
        return (
            <div className='traffic-light'>
                <div
                    className={classNames('bulb', 'red', {
                        active: curColor === RED,
                    })}
                ></div>
                <div
                    className={classNames('bulb', 'orange', {
                        active: curColor === ORANGE,
                    })}
                ></div>
                <div
                    className={classNames('bulb', 'green', {
                        active: curColor === GREEN,
                    })}
                ></div>
            </div>
        );
    }
}

export default TrafficLight;
