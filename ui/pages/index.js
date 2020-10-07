import Head from 'next/head'
import styles from '../styles/index.module.css';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Switch from '@material-ui/core/Switch';
import { Fragment } from 'react';

const Home = (props)=> {

  console.info(props);

  const {profile} = props;

  return (
    <div className={styles.mainPage}>
      <Head>
        <title>MiCrop - System Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
      <h2>MiCrop Admin Panel</h2>
      
      
      <Card className={styles.rackCards}>
        <List>

          {profile.racks.map(rack=>{
            return(
              <Fragment>

                 {rack.name}

                <ListItem>

                  <List className={styles.manualControls}>
                    {rack.controls.map(control=>{
                      return(

                        <ListItem>
                          <div>
                            <label>{control.name}</label>
                            <Switch color="primary" defaultChecked={control.poweredOn}></Switch>
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

Home.getInitialProps = async(ctx)=>{
  const profileId = '00000000-0000-0000-0000-000000000000';
  const profile = {
    racks:[
      {
        name:"rack 1",
        controls:[
          {
            type:"plug",
            name: "Top Light",
            poweredOn:true
          },
          {
            type:"plug",
            name: "Top Drain",
            poweredOn:false
          },
          {
            type:"plug",
            name: "Bottom Light",
            poweredOn:true
          },
          {
            type:"plug",
            name: "Bottom Drain",
            poweredOn:false
          },
          {
            type:"plug",
            name: "Pump",
            poweredOn:false
          }
        ]
      }
    ]
  };

  return{
    profile
  }
}

export default Home;
