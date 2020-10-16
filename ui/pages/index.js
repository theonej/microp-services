import Head from 'next/head'
import styles from '../styles/index.module.css';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Switch from '@material-ui/core/Switch';
import ToggleButton from '@material-ui/lab/ToggleButton';
import CheckIcon from '@material-ui/icons/AddBox';
import { Fragment } from 'react';
import Cookies from 'cookies'
const fetch = require('node-fetch');

const auth = require('../providers/auth');

const Home = (props) => {

  const { profile } = props;
  console.info(props);

  const onSwitchToggled = async (deviceId, child) => {
    child.state = child.state == 1 ? 0 : 1;
    
    console.info(`device: ${deviceId}`);
    console.info(`child: ${JSON.stringify(child)}`);

    const uri = `/api/device/${deviceId}?email=${encodeURIComponent(profile.userInfo.email)}`;
    console.info(`email uri: ${uri}`);

    const result = await fetch(uri, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(child)
    });

    console.info(`set device status result: ${JSON.stringify(result)}`);
    const status = await result.json();
    console.info(`set device status result: ${JSON.stringify(status)}`);
  }

  return (
    <div className={styles.mainPage}>
      <Head>
        <title>MiCrop - System Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <h2>MiCrop Admin Panel</h2>


      <div className={styles.plugList}>
        <List>

          {profile.devices.map(device => {
            return (
              <Fragment>

                {device.alias}

                <ListItem>

                  <List>
                    {device.children.map(child => {
                      return (
                        <div className={styles.manualControls}>
                          <ListItem className={styles.toggleButtonContainer}>
                            <div>
                              <label className={styles.buttonHeader}>{child.alias}</label>
                              <ToggleButton
                                value="check"
                                defaultSelected={child.state === 1 ? true : false}
                                onChange={()=>{onSwitchToggled(device.deviceId, child)}}
                                className={styles.toggleButton}
                              >
                                <CheckIcon className={styles.checkIcon} fontSize="large" />
                              </ToggleButton>
                            </div>
                          </ListItem>
                        </div>
                      );
                    })}

                  </List>
                </ListItem>
              </Fragment>
            );
          })}

        </List>
      </div>
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  const cookies = new Cookies(ctx.req, ctx.res)

  const authCookie = cookies.get('microp-auth');

  var profile = {
    devices: [],
    userInfo:{}
  };

  if (authCookie) {
    const userInfo = auth.authenticateUser(authCookie);
    profile.userInfo = userInfo;
    console.info(`user info: ${JSON.stringify(userInfo)}`);

    var host = ctx.req.headers.host === 'backend' ? '0.0.0.0' : ctx.req.headers.host;

    var uri = `http://${host}/api/email/${encodeURIComponent(userInfo.email)}`;
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
