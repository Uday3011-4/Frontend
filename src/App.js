import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParkingBookingForm from './components/ParkingBookingForm';
import AdminDashboard from './components/AdminDashboard';

export const IP = "626a-2401-4900-60d6-175d-2801-164f-f472-2755.ngrok-free.app";

function Console() {
    const [data, setData] = useState('Waiting for data...');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://${IP}/data`);
                const data = await res.json();
                setData(data.sensorData);
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            }
        };

        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={{textAlign: 'center', padding: '50px'}}>
            <h1>ESP Data</h1>
            <p>{data}</p>
        </div>
    )
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ParkingBookingForm />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path='/console' element={<Console />} />
                <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
