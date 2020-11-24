import Head from 'next/head'
import styles from '../styles/index.module.css';
import { withStyles } from '@material-ui/core/styles';
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


const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 100,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(74px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#fc0317',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const Home = (props) => {

  const [profile, setProfile] = useState(props.profile);
  //const { profile} =props;
  console.info(props);

  const updateDevices = async () => {
    const uri = `/api/email/${encodeURIComponent(profile.userInfo.email)}`;
    console.info(uri);

    const result = await fetch(uri, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const devices = await result.json();
    profile.devices = devices;
    console.info(JSON.stringify(profile));

    setProfile(Object.assign({}, profile));
  }

  const onSwitchToggled = async (deviceId, child) => {
    child.state = child.state == 1 ? 0 : 1;

    console.info(`device: ${deviceId}`);
    console.info(`child: ${JSON.stringify(child)}`);

    let uri = `/api/device/${deviceId}?email=${encodeURIComponent(profile.userInfo.email)}`;

    let result = await fetch(uri, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(child)
    });

    const status = await result.json();

    await updateDevices();
  }

  setTimeout(updateDevices, 5000);
  
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

                    {device.children.map(child => {
                      return (
                        <div className={styles.manualControls}>
                          <ListItem className={styles.toggleButtonContainer}>
                            <div className={styles.buttonContainer}>
                              <label className={styles.buttonHeader}>{child.alias}</label>
                              <IOSSwitch
                                value="check"
                                defaultChecked={child.state == 1 ? true : false}
                                onChange={() => { onSwitchToggled(device.deviceId, child) }}
                                className={styles.toggleSwitch}
                                color="primary"
                              >
                                <CheckIcon className={styles.checkIcon} fontSize="large" />
                              </IOSSwitch>
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
