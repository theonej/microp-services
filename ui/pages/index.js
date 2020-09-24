import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home = (props)=> {

  console.info(props);

  const {profile} = props;

  return (
    <div className={styles.container}>
      <Head>
        <title>MiCrop - System Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Login
        </h1>
        
        <ul>
          {
            profile.name
          }
        </ul>
        
      </main>

    </div>
  )
}

Home.getInitialProps = async(ctx)=>{
  const profileId = '00000000-0000-0000-0000-000000000000';
  const profile = [];

  return{
    profile
  }
}

export default Home;
