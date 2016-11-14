import React from 'react';
import moment from 'moment';

export default props => {
    if (props.timerType === 'timer') {
        return <h2 id="timerSectionDigital">{moment().format('HH:mm:ss')}</h2>;
    }
    return <div>
        <h2>{props.timerType === "standard" ? moment().format('h:mm:ss a') : moment().format('HH:mm:ss')}</h2>
        <h3>{moment().format('ddd')}, {moment().format('MMM Do, YYYY')}</h3>
    </div>
};
