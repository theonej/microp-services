import Head from 'next/head'
import styles from '../styles/index.module.css';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Switch from '@material-ui/core/Switch';
import { Fragment } from 'react';
import Cookies from 'cookies'
const fetch = require('node-fetch');

const auth = require('../providers/auth');

const Home = (props) => {

  const { profile } = props;
  console.info(props);

  return (
    <div className={styles.mainPage}>
      <Head>
        <title>MiCrop - System Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <h2>MiCrop Admin Panel</h2>


      <Card className={styles.rackCards}>
        <List>

          {profile.devices.map(device => {
            return (
              <Fragment>

                {device.alias}

                <ListItem>

                  <List className={styles.manualControls}>
                    {device.children.map(child => {
                      return (

                        <ListItem>
                          <div>
                            <label>{child.alias}</label>
                            <Switch color="primary" defaultChecked={child.state===1?true:false}></Switch>
                          </div>
                        </ListItem>

                      );
                    })}

                  </List>
                </ListItem>
              </Fragment>
            );
          })}

        </List>
      </Card>
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  const cookies = new Cookies(ctx.req, ctx.res)

  const authCookie = cookies.get('microp-auth');

  var profile = {
    devices:[]
  };

  if (authCookie) {
    const userInfo = auth.authenticateUser(authCookie);
    console.info(`user info: ${JSON.stringify(userInfo)}`);

    var uri = `http://${ctx.req.headers.host}/api/email/${encodeURIComponent(userInfo.email)}`;
    console.info(uri);

    const result = await fetch(uri, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const devices = await result.json();
    console.info(`devices: ${JSON.stringify(devices)}`);

    profile.devices = devices;
  }

  return {
    profile
  }
}

export default Home;
