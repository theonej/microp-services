import styles from '../../../../styles/racks.module.css';
const rackProvider = require('../../../../providers/rackProvider');

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

const Racks = (props) => {
    const { racks } = props;


    return (
        <div>
            <h1>Racks</h1>
            {
                racks.sort((a, b) => { return a.name > b.name }).map((rack) => {
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
                                                    tray.plants.map((plant) => {
                                                        return (
                                                            <li>{plant}</li>
                                                        )

                                                    }
                                                    )
                                                }
                                            </ul>

                                        </div>
                                    )
                                })
                            }

                            <Button onClick={() => { window.location = `/locations/${rack.locationId}/racks/${rack.rackId}` }} color='primary'>Show Details</Button>
                        </Card>
                    )
                })
            }
        </div>
    )
};

Racks.getInitialProps = async (ctx) => {

    const racks = await rackProvider.getRacks(ctx);

    console.info(`racks: ${JSON.stringify(racks)}`);

    return {
        racks
    }
};

export default Racks;
