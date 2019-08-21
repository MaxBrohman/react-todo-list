import React from 'react';

import { IDateSpan } from '../../../typings/todo-list-item';

// rrenders either formatted date or nothing
const DateSpan = (props: IDateSpan): JSX.Element | null => {

    const { done, completionDate, date, hour, minutes } = props;

    let dateClasses = 'date-badge badge badge-pill float-right';
    let title: string;
    if(done){
        dateClasses += ' badge-success';
        title = 'task completion time';
        return (<span className={dateClasses} title={title}>{completionDate}</span>);
    }
    const dateStr = `${date}, ${hour}:${minutes}`;
    let expireDate = new Date(dateStr).toLocaleString();
    
    if(expireDate === 'Invalid Date') {
        return null;
    } else {
        // taking only a part of string with date, hours and minutes
        expireDate = expireDate.slice(0, expireDate.length - 3);
        if(new Date() > new Date(dateStr)) {
            dateClasses += ' badge-danger';
            title = 'expired!';
        } else {
            dateClasses += ' badge-warning';
            title = 'expires';
        }
        return (<span className={dateClasses} title={title}>{expireDate}</span>);
    }
};

export default DateSpan;