import React, { Component } from 'react';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import './todoItem.css';

class TodoItem extends Component {
    render() {
        const { item, onClick } = this.props;
        return (
            <div className='wrap'>
                <div
                    onClick={onClick}
                    className={classNames('icon', 'icon-circle', {
                        'icon-active': !item.isComplete,
                    })}
                >
                    <FontAwesomeIcon icon={regular('circle')} />
                </div>
                <div
                    onClick={onClick}
                    className={classNames('icon', 'icon-circle', {
                        'icon-active': item.isComplete,
                    })}
                >
                    <FontAwesomeIcon icon={regular('circle-check')} />
                </div>

                <div
                    className={classNames('todoItem', {
                        itemComplete: item.isComplete,
                    })}
                >
                    <p>{item.title}</p>
                    <div className='icon icon-close'>
                        <FontAwesomeIcon icon={solid('xmark')} />
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoItem;
