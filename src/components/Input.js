import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import './Input.css';
class Input extends Component {
    render() {
        return (
            <div className='wrap'>
                <div className='icon-check'>
                    <FontAwesomeIcon icon={solid('check')} />
                </div>
                <input
                    className='input'
                    type='text'
                    placeholder='What need to be done?'
                ></input>
            </div>
        );
    }
}

export default Input;
