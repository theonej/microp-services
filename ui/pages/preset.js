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
import { useState, setState } from 'react';

const fetch = require('node-fetch');

const auth = require('../providers/auth');

const Home = (props) => {

  const [profile, setProfile] = useState(props.profile);

  console.info(props);


  const onPresetSelected = async (deviceId, presetId) => {
    let uri = `/api/preset/${presetId}?deviceId=${deviceId}&email=${encodeURIComponent(profile.userInfo.email)}`;

    console.info('sending preset request');
    let result = await fetch(uri, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile.devices[0].children)
    });

    console.info('sent preset request');

    const status = await result.json();

    window.location = "./manual";
  }

  return (
    <div className={styles.mainPage}>
      <Head>
        <title>MiCrop - System Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.controlList}>
        <List>

          {profile.devices.map(device => {
            return (
              <Fragment>

                <ListItem>

                  <List className={styles.toggleList}>

                    <div className={styles.manualControls}>
                      <ListItem className={styles.toggleButtonContainer}>
                        <div className={styles.buttonContainer}>
                          <ToggleButton
                            value="check"
                            onChange={() => { onPresetSelected(device.deviceId, 'all-off') }}
                            className={styles.toggleButton}
                          >
                            <label className={styles.buttonHeader}>All Off</label>
                          </ToggleButton>
                        </div>
                      </ListItem>
                    </div>

                    <div className={styles.manualControls}>
                      <ListItem className={styles.toggleButtonContainer}>
                        <div className={styles.buttonContainer}>
                          <ToggleButton
                            value="check"
                            onChange={() => { onPresetSelected(device.deviceId, 'flood-top') }}
                            className={styles.toggleButton}
                          >
                            <label className={styles.buttonHeader}>Flood Top Tray</label>
                          </ToggleButton>
                        </div>
                      </ListItem>
                    </div>

                    <div className={styles.manualControls}>
                      <ListItem className={styles.toggleButtonContainer}>
                        <div className={styles.buttonContainer}>
                          <ToggleButton
                            value="check"
                            onChange={() => { onPresetSelected(device.deviceId, 'drain-top') }}
                            className={styles.toggleButton}
                          >
                            <label className={styles.buttonHeader}>Drain Top Tray</label>
                          </ToggleButton>
                        </div>
                      </ListItem>
                    </div>

                    <div className={styles.manualControls}>
                      <ListItem className={styles.toggleButtonContainer}>
                        <div className={styles.buttonContainer}>
                          <ToggleButton
                            value="check"
                            onChange={() => { onPresetSelected(device.deviceId, 'flood-bottom') }}
                            className={styles.toggleButton}
                          >
                            <label className={styles.buttonHeader}>Flood Bottom Tray</label>
                          </ToggleButton>
                        </div>
                      </ListItem>
                    </div>

                    <div className={styles.manualControls}>
                      <ListItem className={styles.toggleButtonContainer}>
                        <div className={styles.buttonContainer}>
                          <ToggleButton
                            value="check"
                            onChange={() => { onPresetSelected(device.deviceId, 'drain-bottom') }}
                            className={styles.toggleButton}
                          >
                            <label className={styles.buttonHeader}>Drain Bottom Tray</label>
                          </ToggleButton>
                        </div>
                      </ListItem>
                    </div>

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
    userInfo: {}
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
