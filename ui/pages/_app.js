import '../styles/globals.css'
import React from 'react';
import App, {Container} from 'next/app';
import Template from './template';

class MicropAdmin extends App {
    render(){
        const {Component, pageProps} = this.props;

        return(
            <Template>
                <Component {...pageProps}/>
            </Template>
        )
    }
}

export default MicropAdmin