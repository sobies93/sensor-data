import React, { useState } from 'react';
import SensorForm from './../presentational/SensorForm';
import { useSensorContext } from '../../contexts/SensorDataContext';
import { SensorDataRequest } from '@skyfld-demo/api-interfaces';
import { validateHumidity, validateTemperature } from '@skyfld-demo/validation';
import { FormErrors } from '../../types';

const SensorFormContainer: React.FC = () => {
    const { saveSensorData, requestState } = useSensorContext();
    
    const [errors, setErrors] = useState<FormErrors>({
        temperature: '',
        humidity: '',
    });

    const handleSubmit = async (formData: any) => {
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

        if (!temperatureValid || !humidityValid) {
            return;
        }

        const newSensorData = {
            type,
            temperature: parseFloat(temperature),
            humidity: parseFloat(humidity),
        } as SensorDataRequest;

        return await saveSensorData(newSensorData);
    };

    return <SensorForm onSubmit={handleSubmit} requestState={requestState} errors={errors}/>;
};

export default SensorFormContainer;
