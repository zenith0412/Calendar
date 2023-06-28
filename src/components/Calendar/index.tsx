import React from 'react';
import './calendar.css';

interface CalendarProps {
    date: Date;
}

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const Calendar: React.FC<CalendarProps> = ({ date }) => {
    const calendarMatrix = React.useMemo(() => getCalendarMatrix(date), [date]);

    const isSelectedDate = (dateToCheck: Date): boolean => {
        return (
            dateToCheck.getDate() === date.getDate() &&
            dateToCheck.getMonth() === date.getMonth() &&
            dateToCheck.getFullYear() === date.getFullYear()
        );
    };

    return (
        <table className="calendar">
            <thead>
                <tr>
                    <th colSpan={7}>
                        {date.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                    </th>
                </tr>
                <tr>
                    {daysOfWeek.map((day) => (
                        <th key={day}>{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {calendarMatrix.map((week, rowIndex) => (
                    <tr key={rowIndex}>
                        {week.map((day, colIndex) => (
                            <td
                                key={colIndex}
                                className={isSelectedDate(day) ? 'highlight' : ''}
                            >
                                {day.getDate()}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const getCalendarMatrix = (date: Date): Date[][] => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();

    const daysInMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();

    let calendarMatrix: Date[][] = [[]];
    let row = 0;
    let col = firstDayOfWeek;

    for (let day = 1; day <= daysInMonth; day++) {
        if (col > 6) {
            col = 0;
            row++;
            calendarMatrix[row] = [];
        }

        const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
        calendarMatrix[row][col] = currentDate;

        col++;
    }

    return calendarMatrix;
};

export default Calendar;
