import React from 'react';

import classes from './BuildControl';

const buildControl = (props) => (
    <div className={classes.buildControl}>
        <div className={classes.Label}>{props.label}</div>
        <botton className={classes.Less}>Less</botton>
        <botton className={classes.More}>More</botton>
    </div>
);

export default buildControl;