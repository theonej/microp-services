import styles from '../../styles/racks.module.css';

import Card from '@material-ui/core/Card';
const fetch = require('node-fetch');

const Racks = (props) => {
    const { racks } = props;


    return (
        <div>
            <h1>Racks</h1>
            {
                racks.map((rack) => {
                    return (
                        <Card className={styles.borderedDiv}>
                            <h2>{rack.name}</h2>
                            <label>{rack.location}</label>
                            <h3>Trays</h3>
                            {
                                rack.trays.map((tray) => {
                                    return (
                                        <div>
                                            <h4>{tray.name}</h4>
                                            <ul>


                                                {
                                                    tray.plantTypes.map((plantType) => {
                                                        return (
                                                            <li>{plantType}</li>
                                                        )

                                                    }
                                                    )

                                                }
                                            </ul>

                                        </div>
                                    )
                                })
                            }
                        </Card>
                    )
                })
            }
        </div>
    )
};

Racks.getInitialProps = async (ctx) => {

    var host = ctx.req.headers.host === 'backend' ? '0.0.0.0' : ctx.req.headers.host;

    var uri = `http://${host}/api/rack/`;
    console.info(uri);

    const result = await fetch(uri, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const racks = await result.json();
    console.info(`racks: ${JSON.stringify(racks)}`);

    return {
        racks
    }
};

export default Racks;
