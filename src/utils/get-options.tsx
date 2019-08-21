import React from 'react';

// renderer for options elements
const getOption = (option: number): JSX.Element => {
    const value = option < 10 ? `0${option}` : `${option}`;
    return (<option value={value} key={+value}>{value}</option>);
}; 

const getOptions = (num: number): JSX.Element[] => {
    const res = [];
    for(let i = 0; i < num; i++){
        res.push(getOption(i));
    }
    return res;
};

export default getOptions;