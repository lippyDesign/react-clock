import React from 'react';
import moment from 'moment';

export default props => {
    if (props.timerType === 'timer') {
        const mil = props.millisecondsElapsed ? (props.millisecondsElapsed / 10).toString().slice(-2) : '00'
        return <h2 id="timerSectionDigital">
            {moment('2000-01-01 00:00:00').add(props.millisecondsElapsed).format('HH:mm:ss')}:{mil}
        </h2>;
    }
    return <div>
        <h2>{props.timerType === "standard" ? moment().format('h:mm:ss a') : moment().format('HH:mm:ss')}</h2>
        <h3>{moment().format('ddd')}, {moment().format('MMM Do, YYYY')}</h3>
    </div>
};
