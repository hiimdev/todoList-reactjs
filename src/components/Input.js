import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import './Input.css';
class Input extends Component {
    render() {
        const { onKeyUp, value, onChange } = this.props;
        return (
            <div className='wrap'>
                <div className='icon-check'>
                    <FontAwesomeIcon icon={solid('check')} />
                </div>
                <input
                    className='input'
                    type='text'
                    onKeyUp={onKeyUp}
                    onChange={onChange}
                    value={value}
                    placeholder='What need to be done?'
                ></input>
            </div>
        );
    }
}

export default Input;
