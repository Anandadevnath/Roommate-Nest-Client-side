import { ThemeProvider } from 'next-themes';
import React from 'react';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;