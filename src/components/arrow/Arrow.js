import React, { Component } from 'react';

export default class Arrow extends Component {

    componentDidMount() {
        this.updateTime();
    }

    componentWillUpdate() {
        this.updateTime();
    }

    updateTime() {
        if (this.props.arrowType === 'secondsArrow') {
            const arrow = document.getElementById(this.props.arrowType);
            arrow.style.transform = 'rotate('+ (this.props.time.seconds * 6 - 84) +'deg)';
        }
        if (this.props.arrowType === 'minutesArrow') {
            const arrow = document.getElementById(this.props.arrowType);
            arrow.style.transform = 'rotate('+ (this.props.time.minutes * 6 - 90) +'deg)';
        }
        if (this.props.arrowType === 'hoursArrow') {
            const arrow = document.getElementById(this.props.arrowType);
            arrow.style.transform = 'rotate('+ ( (this.props.time.hours * 30) + (0.5 * this.props.time.minutes) - 90) +'deg)';
        }
        if (this.props.arrowType === 'timerArrow') {
            const arrow = document.getElementById(this.props.arrowType);
            arrow.style.transform = 'rotate('+ ((this.props.time / 1000) * 6 - 90) +'deg)';
        }
    }

    render() {
        const width = this.props.width ? this.props.width : 1;
        return <div id={this.props.arrowType} style={{ width }}></div>
    }
};