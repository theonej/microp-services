import styles from '../../../../styles/racks.module.css';

const rackProvider = require('../../../../providers/rackProvider');
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useState, setState } from 'react';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const RackDetails = (props) => {
    const { rack } = props;
    const [open, setOpen] = React.useState(false);

    let currentReadings = {};

    const onFieldChanged = (fieldName, value) => {
        currentReadings[fieldName] = value;
    };

    const saveReadings = async () => {
        currentReadings.created = new Date().toUTCString();

        console.info(currentReadings);

        rack.readings.push(currentReadings);

        await rackProvider.saveRack(rack);

        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <h1>Rack {rack.name}</h1>
            <h3>Trays</h3>
            {
                rack.trays.map((tray, index) => {
                    return (
                        <div key={`rack-${index}`}>
                            <h4>{tray.name}</h4>
                            <ul>


                                {
                                    tray.plants.map((plant, index) => {
                                        return (
                                            <li key={`plant-${index}`}>{plant}</li>
                                        )

                                    }
                                    )
                                }
                            </ul>

                        </div>
                    )
                })
            }

            <div className={styles.notes}>
                <div className={styles.inputGroup}>
                    <label>PH</label>
                    <input type="number" step="0.5" max="9" min="0" onChange={(e) => { onFieldChanged('PH', e.target.value) }}></input>
                </div>
                <div className={styles.inputGroup}>
                    <label>Temp</label>
                    <input type="number" step="0.5" max="255" min="0" onChange={(e) => { onFieldChanged('temperature', e.target.value) }}></input>
                </div>
                <div className={styles.inputGroup}>
                    <label>TDS (PPM)</label>
                    <input type="number" step="10" max="3000" min="0" onChange={(e) => { onFieldChanged('TDS', e.target.value) }}></input>
                </div>

                <h4>Notes</h4>
                <textarea rows="10" onChange={(e) => { onFieldChanged('notes', e.target.value) }}></textarea>


                <Button onClick={() => { saveReadings() }} color='primary'>Save</Button>
            </div>

            <div className={styles.history}>
                <TableContainer>
                    <Table className={styles.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>PH</TableCell>
                                <TableCell>Temp</TableCell>
                                <TableCell>TDS</TableCell>
                                <TableCell>Notes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rack.readings.map((reading, index) => (
                                <TableRow key={`reading-${index}`}>
                                    <TableCell align="right">{reading.created}</TableCell>
                                    <TableCell align="right">{reading.PH}</TableCell>
                                    <TableCell align="right">{reading.temperature}</TableCell>
                                    <TableCell align="right">{reading.TDS}</TableCell>
                                    <TableCell align="right">{reading.notes}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Rack Saved Successfully!
                </Alert>
            </Snackbar>
        </div>
    )
};

RackDetails.getInitialProps = async (ctx) => {
    const rack = await rackProvider.getRack(ctx);

    return {
        rack
    };
};

export default RackDetails;