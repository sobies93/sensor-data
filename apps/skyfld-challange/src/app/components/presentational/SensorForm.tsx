import React, { useState } from 'react';
import { Button, Grid, MenuItem, TextField, Typography, makeStyles } from '@material-ui/core';
import { SensorType } from '@skyfld-demo/api-interfaces';
import { FormErrors, RequestState } from '../../types';

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(2),
    },
}));

interface Props {
    onSubmit: (formData: any) => void;
    requestState: RequestState;
    errors: FormErrors;
}

const SensorForm: React.FC<Props> = ({ onSubmit, requestState, errors }) => {
    const classes = useStyles();
    const initialFormData = {
        type: SensorType.THERMISTORS,
        temperature: '0',
        humidity: '0',
    }
    const [formData, setFormData] = useState(initialFormData);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
        // TODO should clear data only after successful submit
        setFormData(initialFormData);
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
                            type="number"
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
                            type="number"
                            label="Humidity"
                            name="humidity"
                            value={formData.humidity}
                            onChange={handleChange}
                            error={!!errors.humidity}
                            helperText={errors.humidity}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button disabled={requestState === RequestState.Loading} type="submit" variant="contained" color="primary">
                            Add Data
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default SensorForm;
