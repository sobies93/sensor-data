import React from 'react';
import { Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { SensorData } from '@skyfld-demo/api-interfaces';

interface Props {
    sensorData: SensorData[];
}

const SensorDashboard: React.FC<Props> = ({ sensorData }) => {
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Sensor Data Dashboard
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Temperature</TableCell>
                            <TableCell>Humidity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sensorData.map((sensor) => (
                            <TableRow key={sensor.id}>
                                <TableCell>{sensor.id}</TableCell>
                                <TableCell>{sensor.type}</TableCell>
                                <TableCell>{sensor.temperature}</TableCell>
                                <TableCell>{sensor.humidity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SensorDashboard;
