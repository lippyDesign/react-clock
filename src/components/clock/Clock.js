import React, { Component } from 'react';
import moment from 'moment';

import ClockSection from '../clockSection/ClockSection';
import Arrow from '../arrow/Arrow';
import Digital from '../digital/Digital';

class App extends Component {
    constructor() {
        super();
        this.state = {
            timerType: 'standard',
            millisecondsElapsed: 0,
            timerId: null
        }
        this.handleSize = this.handleSize.bind(this)
        this.timer = this.timer.bind(this)
    }

    componentDidMount() {
        this.handleSize();
        window.addEventListener('resize', this.handleSize);
        var intervalId = setInterval(this.timer, 1000);
        this.setState({intervalId});
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleSize);
        clearInterval(this.state.intervalId);
    }

    timer() {
        this.setState({ currentSeconds: moment().get('second') });
    }

    handleSize(event) {
        const contHeight = document.getElementById('cont').clientHeight;
        const contWidth = document.getElementById('cont').clientWidth;
        this.setState({ contHeight, contWidth });
    }

    getClockSections() {
        const { contHeight, contWidth } = this.state;

        const clockSectionArray = [];

        for (let i = 0; i <= 59; i++) {
            if (i + 15 > 59) {
                const j = i - 60;
                let hourValue = (j + 15) / 5
                if (hourValue === 0) {
                    hourValue = 12;
                }
                clockSectionArray.push({ minAndSecValue: j + 15, hourValue });
            } else {
                const hourValue = (i + 15) / 5
                clockSectionArray.push({ minAndSecValue: i + 15, hourValue });
            }
        }

        let radius = this.state.contHeight / 2.1;
        let angle = 0;
        const step = (2*Math.PI) / clockSectionArray.length;

        clockSectionArray.forEach(item => {

            let left = Math.round(contWidth/2 + radius * Math.cos(angle) - 15);
            let top = Math.round(contHeight/2 + radius * Math.sin(angle) - 15);

            item.left = left;
            item.top = top;

            angle += step;
        });

        return clockSectionArray.map(({ minAndSecValue, hourValue, left, top }) => (
            <ClockSection
                key={minAndSecValue}
                minAndSecValue={minAndSecValue}
                hourValue={hourValue}
                left={left}
                top={top}
                timerType={this.state.timerType}
            />)
        );
    }

    getTime() {
        return {
            hours: moment().get('hour'),
            minutes: moment().get('minute'),
            seconds: moment().get('second')
        };
    }

    startTimer() {
        
        if (!this.state.paused && !this.state.timerId) {
            const timerId = setInterval( () => {
                this.setState({millisecondsElapsed: this.state.millisecondsElapsed + 10, paused : false})
            }, 10);
            this.setState({timerId})
        } else if (this.state.paused) {
            const timerId = setInterval( () => {
                this.setState({millisecondsElapsed: this.state.millisecondsElapsed + 10, paused : false})
            }, 10);
            this.setState({timerId})
        }
        
    }

    stopTimer() {
        if (!this.state.paused) {
            this.setState({paused : true});
            clearInterval(this.state.timerId);
        } else {
            this.setState({paused : false, millisecondsElapsed : 0});
            clearInterval(this.state.timerId);
            this.setState({timerId: null})
        }
    }

    render() {
        let clockType = '';
        if (this.state.timerType !== 'timer') {
            clockType = <div>
                <Digital timerType={this.state.timerType} />
                <div id="center"></div>
                <Arrow arrowType="secondsArrow" width={this.state.contHeight / 2.1} time={this.getTime()} />
                <Arrow arrowType="minutesArrow" width={this.state.contHeight / 2.1} time={this.getTime()} />
                <Arrow arrowType="hoursArrow" width={this.state.contHeight / 2.6} time={this.getTime()} />
            </div>;
        } else {
            clockType = <div className="timerSection">
                <button onClick={this.startTimer.bind(this)}>
                    {this.state.millisecondsElapsed ? 'RESUME' : 'START'}
                </button>
                <button className="stopButton" onClick={this.stopTimer.bind(this)}>
                    {this.state.paused ? 'CLEAR' : 'PAUSE'}
                </button>
                <Digital timerType={this.state.timerType} millisecondsElapsed={this.state.millisecondsElapsed}/>
                <div id="center"></div>
                <Arrow arrowType="timerArrow" width={this.state.contHeight / 2.1} time={(this.state.millisecondsElapsed)} />
            </div>;
        }

        return <main>
            <div id="cont">
                <h1>THE CLOCK</h1>
                <div className="buttonWrapper">
                    <button
                        className={this.state.timerType === "standard" ? "activeButton" : ""}
                        onClick={() => this.setState({timerType: 'standard'})}>Standard</button>
                    <button
                        className={this.state.timerType === "military" ? "activeButton" : ""}
                        onClick={() => this.setState({timerType: 'military'})}>Military</button>
                    <button 
                        className={this.state.timerType === "timer" ? "activeButton" : ""}
                        onClick={() => this.setState({timerType: 'timer'})}>Stopwatch</button>
                </div>
                {this.state.contHeight ? this.getClockSections() : ''}
                {clockType}
            </div>
        </main>;
    }
}

export default App;