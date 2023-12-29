import React from 'react'
import { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { Timezone } from '@browser-timezone/js';
import moment from 'moment-timezone';
// Step 2. Add Timezone
const timezoneOptions = ['UTC-0', 'UTC-5'];

// Step 4. Create json data for Timezone
const createTimezoneJson = (date, time, timezone) => {
    return { date, time, timezone };
};

// Step 1. Initialize React component
function TimeTable() {
    const [date, setDate] = useState(new Date());
    const [selectedTimezone, setSelectedTimezone] = useState(timezoneOptions[0]);
    const [jsonData, setJsonData] = useState([]);

    // Step 2. Timezone Select
    const handleTimezoneChange = (event) => {
        setSelectedTimezone(event.target.value);
    };

    // Step 4. Save Timezone Data
    const handleSaveTimezoneData = () => {
        const timeData = createTimezoneJson(
            moment(date).tz(selectedTimezone).format('YYYY-MM-DD'),
            moment(date).tz(selectedTimezone).format('HH:mm'),
            selectedTimezone
        );
        setJsonData([...jsonData, timeData]);
    };

    // Step 3. Render Swipe Buttons
    const nextButton = () => {
        const nextWeek = moment(date).add(1, 'week');
        return (
            <div>
                <button id='next' onClick={() => setDate(nextWeek.toDate())}>Next Week</button>
            </div>
        );
    };

    const previousButton = () => {
        const prevWeek = moment(date).subtract(1, 'week');
        return (
            <div>
                <button id='prev' onClick={() => setDate(prevWeek.toDate())}>Previous Week</button>
            </div>
        );
    };

    // Step 4. Render Working Hours Checkboxes
    const renderWorkingHoursCheckboxes = () => {
        const startTime = moment('08:00', 'HH:mm');
        const endTime = moment('23:00', 'HH:mm');

        const hours = [];
        while (startTime <= endTime) {
            hours.push(startTime.format('HH:mm'));
            startTime.add(30, 'minute');
        }

        return (
            <div>
                {hours.map((hour) => (
                    <div id='hour' key={hour}>
                        <input type="checkbox" id={hour} name={hour} />
                        <label htmlFor={hour}>{hour}</label>
                    </div>
                ))}
            </div>
        );
    }
    return (
        <div className='container'>

            <div className="parentContainer">
                <div className="date">
                    {previousButton()}
                    <p>{date.toLocaleDateString()}</p>
                    {nextButton()}
                </div>
                <div className="timeZone">
                    <h3>Timezone</h3>
                    <select value={selectedTimezone} onChange={handleTimezoneChange}>
                        {timezoneOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="weekTable">
                    <table>
                        <tr>
                            <th>Mon</th>
                            <td>{renderWorkingHoursCheckboxes()}</td>
                        </tr>
                        <tr>
                            <th>Mon</th>
                            <td>{renderWorkingHoursCheckboxes()}</td>
                        </tr>
                        <tr>
                            <th>Tue</th>
                            <td>{renderWorkingHoursCheckboxes()}</td>
                        </tr>
                        <tr>
                            <th>Wed</th>
                            <td>{renderWorkingHoursCheckboxes()}</td>
                        </tr>
                        <tr>
                            <th>Thu</th>
                            <td>{renderWorkingHoursCheckboxes()}</td>
                        </tr>
                        <tr>
                            <th>Fri</th>
                            <td>{renderWorkingHoursCheckboxes()}</td>
                        </tr>
                    </table>

                </div>
                <button onClick={handleSaveTimezoneData}>Save Timezone Data</button>
                <h2>Json Data</h2>
                <pre>{JSON.stringify(jsonData, null, 2)}</pre>
            </div>

        </div>
    )
}

export default TimeTable
