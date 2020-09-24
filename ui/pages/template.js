import Head from 'next/head';
import {useRouter} from 'next/router';
import Cookies from 'cookies';

const auth = require('../providers/auth');

function Template(props){
    
    const {authCookie, redirectLocation} = props;

    const router = useRouter();
    const path = router.asPath;

    const userInfo = auth.authenticateUser(authCookie, path);
    console.info(userInfo);
    
    if(! userInfo.authenticated)
    {
        console.info(`redirecting to ${redirectLocation}`);
        try{
           // window.location = redirectLocation;
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
                    background-color: #efefef;
                    height:100%;
                    margin-top:10px;
                }

                .layout {
                    padding-top:10px;
                    height:100%;
                    display:grid;
                    align-items:center;
                    justify-content:center;
                }

                .main-container{
                    padding:45px;
                    background:#fefefe;
                    border:solid 1px #bebebe;
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