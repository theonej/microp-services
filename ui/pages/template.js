import Head from 'next/head';
import {useRouter} from 'next/router';

const auth = require('../providers/auth');

const Template = (props)=>{
    
    const {authCookie, redirectLocation} = props;
    
    const router = useRouter();
    const path = router.asPath;

    const userInfo = auth.authenticateUser(authCookie, path);
    console.info(userInfo);

    if(! userInfo.authenticated)
    {
        console.info(`redirecting to ${redirectLocation}`);
        try{
            window.location = redirectLocation;
        }catch(e){/*noop*/}
    }

    return(
        <div className="layout">
            <Head>
            </Head>
            <div className = "main-container">
                {props.children}
            </div>

            <style jsx global>{`
                #__next{
                    height:100%;
                }

                body, html{
                    font-family: "Proxima Nova", system-ui, sans-serif;
                    background-color: #fff;
                    height:100%;
                    margin-top:10px;
                }

                .my-card-content {
                    padding: 16px;
                  }

            `}</style>
        </div>
    )
}

Template.getInitialProps = async(ctx) =>{
    const {req, res} = ctx;

    const cookies = new Cookies(req, res);
    const authCookie = cookies.get('microp-auth');
    const redirectLocation = process.env.REDIRECT_LOCATION;
    
    return {
        authCookie,
        redirectLocation
    };
};

export default Template;