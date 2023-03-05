/*
*
    This component contains the ERROR 404 page.
    The ERROR 404 page is displayed when the user navigates to a wrong route (for exemple: http://localhost:3000/wrong_route). 
*
*/

import React from "react";
import '../App.css';
import Error404 from './assets/404.jpg';
import { Typography } from '@mui/material';

export default function PageNotFound() {

    return (
        <React.Fragment>
            <div className='title title-err-404'>
                <img className="img-err-404" src={Error404} alt="Error 404 broken robot" />
                <h1>
                    {'Oooops! You weren\'t supposed to see this'}
                </h1>
            </div>
            <div className='content content-err-404'>
                <Typography>
                    {'It looks like you\'ve reached a URL that doesn\'t exist. Please use '}
                    <a href="/">{'this link'}</a>
                    {' to find your way back to our amazing Product Catalog website.'}
                </Typography>
            </div>
        </React.Fragment >
    );
}