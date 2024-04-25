import React, { useState } from 'react';
import { Button, Grid, MenuItem, TextField, Typography, makeStyles } from '@material-ui/core';
import { useSensorContext } from '../contexts/SensorDataContext';
import { SensorDataRequest, SensorType, } from '@skyfld-demo/api-interfaces';
import { validateHumidity, validateTemperature } from '@skyfld-demo/validation';
import { RequestState } from '../types';

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(2),
    },
}));

const SensorForm: React.FC = () => {
    const classes = useStyles();
    const { saveSensorData, requestState } = useSensorContext();

    const [formData, setFormData] = useState({
        type: SensorType.THERMISTORS,
        temperature: 0,
        humidity: 0,
    });

    const [errors, setErrors] = useState({
        temperature: '',
        humidity: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { type, temperature, humidity } = formData;

        // Validation
        const temperatureValid = validateTemperature(temperature);
        const humidityValid = validateHumidity(humidity);

        if (!temperatureValid) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                temperature: 'Temperature must be above -273 degree',
            }));
        }

        if (!humidityValid) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                humidity: 'Humidity must be between 0 and 100',
            }));
        }

        if (!humidityValid || !temperatureValid) {
            return;
        }
        setErrors({
            temperature: '',
            humidity: '',
        });

        const newSensorData = {
            type,
            temperature: temperature,
            humidity: humidity,
        } as SensorDataRequest;

        setFormData({
            type: SensorType.THERMISTORS,
            temperature: 0,
            humidity: 0,
        })

        saveSensorData(newSensorData);
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Add Sensor Data
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            select
                            variant="outlined"
                            fullWidth
                            label="Type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            {Object.values(SensorType).map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Temperature"
                            name="temperature"
                            type='number'
                            value={formData.temperature}
                            onChange={handleChange}
                            error={!!errors.temperature}
                            helperText={errors.temperature}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            type='number'
                            label="Humidity"
                            name="humidity"
                            value={formData.humidity}
                            onChange={handleChange}
                            error={!!errors.humidity}
                            helperText={errors.humidity}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button disabled={requestState === RequestState.Loading } type="submit" variant="contained" color="primary">
                            Add Data
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default SensorForm;
