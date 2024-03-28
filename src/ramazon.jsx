import React, { useState, useEffect } from 'react';

function RamadanCalendar() {
    const [days, setDays] = useState([
        "11 mart", "12 mart", "13 mart", "14 mart", "15 mart", "16 mart", "17 mart", "18 mart", "19 mart", "20 mart",
        "21 mart", "22 mart", "23 mart", "24 mart", "25 mart", "26 mart", "27 mart", "28 mart", "29 mart", "30 mart",
        "31 mart", "1 aprel", "2 aprel", "3 aprel", "4 aprel", "5 aprel", "6 aprel", "7 aprel", "8 aprel", "9 aprel"
    ]);

    const [saharlikVaqtlar, setSaharlikVaqtlar] = useState([
        "05:13", "05:12", "05:10", "05:08", "05:07", "05:05", "05:03", "05:01", "05:00", "04:58",
        "04:56", "04:54", "04:53", "04:51", "04:49", "04:47", "04:45", "04:44", "04:42", "04:40",
        "04:38", "04:36", "04:34", "04:33", "04:31", "04:29", "04:27", "04:25", "04:23", "04:22"
    ]);

    const [iftorlikVaqtlar, setIftorlikVaqtlar] = useState([
        "18:19", "18:20", "18:21", "18:22", "18:23", "18:24", "18:25", "18:27", "18:28", "18:29",
        "18:30", "18:31", "18:32", "18:33", "18:34", "18:35", "18:36", "18:37", "18:38", "18:39",
        "18:40", "18:42", "18:43", "18:44", "18:45", "18:46", "18:47", "18:48", "18:49", "18:50"
    ]);

    const [remainingTimes, setRemainingTimes] = useState(Array(days.length).fill(""));

    const calculateRemainingTime = (saharlik, iftorlik, dayIndex) => {
        const currentTime = new Date();
        const saharlikTime = new Date(`2024-03-${dayIndex + 11}T${saharlik}`);
        const iftorlikTime = new Date(`2024-03-${dayIndex + 11}T${iftorlik}`);
        let remainingTimeSeconds;
    
        if (currentTime < saharlikTime) {
            remainingTimeSeconds = Math.floor((saharlikTime - currentTime) / 1000);
        } else if (currentTime < iftorlikTime) {
            remainingTimeSeconds = Math.floor((iftorlikTime - currentTime) / 1000);
        } else {
            return "Utib ketdi";
        }
    
        const daysLeft = Math.floor(remainingTimeSeconds / (24 * 3600));
        const hoursLeft = Math.floor((remainingTimeSeconds % (24 * 3600)) / 3600);
        const minutesLeft = Math.floor((remainingTimeSeconds % 3600) / 60);
        const secondsLeft = Math.floor(remainingTimeSeconds % 60);
    
        return `${daysLeft} kun, ${hoursLeft} soat, ${minutesLeft} daqiqa, ${secondsLeft} soniya`;
    };
    

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedRemainingTimes = days.map((day, index) => {
                return calculateRemainingTime(saharlikVaqtlar[index], iftorlikVaqtlar[index], index);
            });
            setRemainingTimes(updatedRemainingTimes);
        }, 1000);

        return () => clearInterval(interval);
    }, []); // Empty dependency array to run effect only once

    return (
        <div className="container">
            <div className="header">RAMAZON Taqvimi</div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Sana</th>
                            <th>Saharlik</th>
                            <th>Iftorlik</th>
                            <th>Qolgan vaqt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {days.map((day, index) => (
                            <tr key={index} className={index === 4 ? 'odd' : index % 2 === 0 ? 'even' : 'odd'}>
                                <td>{day}</td>
                                <td>{saharlikVaqtlar[index]}</td>
                                <td>{iftorlikVaqtlar[index]}</td>
                                <td>{remainingTimes[index]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RamadanCalendar;
