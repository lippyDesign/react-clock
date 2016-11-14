import React from 'react';
import moment from 'moment';

export default props => {
    return <div>
        <h2>{props.timerType === "standard" ? moment().format('h:mm:ss a') : moment().format('HH:mm:ss')}</h2>
        <h3>{moment().format('ddd')}, {moment().format('MMM Do, YYYY')}</h3>
    </div>
};