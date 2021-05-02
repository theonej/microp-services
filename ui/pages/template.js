import Head from 'next/head';
import { useRouter } from 'next/router';
const Cookies = require('js-cookie');
import HomeIcon from '@material-ui/icons/Home';

const auth = require('../providers/auth');

const Template = (props) => {

    const { authCookie, redirectLocation } = props;

    const router = useRouter();
    const path = router.asPath;

    const userInfo = auth.authenticateUser(authCookie, path);
    console.info(userInfo);

    if (!userInfo || !userInfo.authenticated) {
        console.info(`redirecting to ${redirectLocation}`);
        try {
            window.location = redirectLocation;
        } catch (e) {/*noop*/ }
    }

    return (
        <div className="layout">
            <Head>

            </Head>
            <div className="header">
                <a href="./">
                    <img className="header-image" src="/logoTomato.png"></img>
                </a>

            </div>

            <div className="main-container">
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

                .header{
                    padding:10px;
                }

                .header-label{
                    padding:10px;
                }


                .header-image{
                    height:35px;
                }

            `}</style>
        </div>
    )
}

Template.getInitialProps = async (ctx) => {
    const { req, res } = ctx;

    const authCookie = Cookies.get('microp-auth');
    const redirectLocation = process.env.REDIRECT_LOCATION;

    return {
        authCookie,
        redirectLocation
    };
};

export default Template;