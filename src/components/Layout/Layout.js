import React from 'react';

const layout = ( props ) => (
    <div>Toolbar, SideDrawer, BackDrop</div>
    <main>
        {props.children}
    </main>
);