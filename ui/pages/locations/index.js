const locationProvider = require('../../providers/locationProvider');
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import styles from '../../styles/locations.module.css';

const Locations = (props) => {
    const { locations } = props;

    return (
        <div>
            <h1>Locations</h1>
            {
                locations.map((location, index) => {
                    return (
                        <Card className={styles.borderedDiv}>
                            <div key={`location-${index}`}>
                                <h2>{location.name}</h2>
                                <h3>{location.numberOfRacks} racks</h3>
                                <Button onClick={()=>{window.location=`/locations/${location.locationId}/racks`}} color='primary'>Show Racks</Button>
                            </div>
                        </Card>
                    )
                })
            }
        </div>
    )
};

Locations.getInitialProps = async (ctx) => {
    const locations = await locationProvider.getLocations(ctx);

    return {
        locations
    };
};

export default Locations;