import React from 'react';

export default props => {
    const { left, top, hourValue, timerType, minAndSecValue } = props;
    if (timerType === 'timer') {
        return <div className="number smallNumber" style={{ left, top }}>
            {minAndSecValue % 2 ? '.' : minAndSecValue}
        </div>
    }
    return <div className="number" style={{ left, top }}>
        {Number.isInteger(hourValue) ? hourValue : '.'}
    </div>
};