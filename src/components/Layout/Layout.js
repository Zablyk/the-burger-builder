import React from 'react';
import Aux from '../../hoc/..';

const layout = ( props ) => (
    <Aux>
    <div>Toolbar, SideDrawer, BackDrop</div>
    <main>
        {props.children}
    </main>
    </Aux>
);