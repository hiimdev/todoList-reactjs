import React, { Component } from 'react';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import './Input.css';
class Input extends Component {
    constructor(props) {
        super(props);

        this.inputElement = React.createRef();
    }

    componentDidMount() {
        this.inputElement.current.focus();
    }

    render() {
        const { onKeyUp, value, onChange } = this.props;
        return (
            <div className='wrap'>
                <input
                    className='input'
                    type='text'
                    onKeyUp={onKeyUp}
                    onChange={onChange}
                    value={value}
                    ref={this.inputElement}
                    placeholder='What need to be done?'
                ></input>
            </div>
        );
    }
}

export default Input;
