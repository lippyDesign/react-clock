import React from 'react';

export default props => {
    const { left, top, hourValue } = props;
    return <div className="number" style={{ left, top }}>
        {Number.isInteger(hourValue) ? hourValue : '.'}
    </div>
};