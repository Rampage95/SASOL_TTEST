/*
*
    This component serves as a layout for the different pages. 
*
*/

import React from "react";
import Router from "./Router";
import Paper from '@mui/material/Paper';
import '../App.css';

export default function AppContainer() {
    return (
        <Paper className="container" elevation={6}>
            <Router />
        </Paper>
    );
}