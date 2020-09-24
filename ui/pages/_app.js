import '../styles/globals.css'
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import App, { Container } from 'next/app';
import Template from './template';
import Cookies from 'cookies';

class MicropAdmin extends App {
    
    render() {


        const { Component, pageProps } = this.props;

        return (
            
            <React.Fragment>
                <Template {...this.props}>
                    <Component {...pageProps} />
                </Template>
            </React.Fragment>
        )
    }
}

MicropAdmin.getInitialProps = async ({ Component, router, ctx }) => {
    const pageProps = await Component.getInitialProps(ctx);
    const { req, res } = ctx;

    const cookies = new Cookies(req, res);
    const authCookie = cookies.get('microp-auth');

    const redirectLocation = process.env.REDIRECT_LOCATION;

    return {
        pageProps,
        authCookie,
        redirectLocation
    };
};
export default MicropAdmin