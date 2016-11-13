import React from 'react';
import moment from 'moment';

export default props => {
    return <div>
        <h2>{moment().format('h:mm:ss a')}</h2>
        <h3>{moment().format('ddd')}, {moment().format('MMM Do, YYYY')}</h3>
    </div>
};

//HH:mm:ss