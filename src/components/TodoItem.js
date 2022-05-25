import React, { Component } from 'react';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircle } from '@fortawesome/free-solid-svg-icons';

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
                    <FontAwesomeIcon icon={faCircle} />
                </div>
                <div
                    onClick={onClick}
                    className={classNames('icon', 'icon-circle', {
                        'icon-active': item.isComplete,
                    })}
                >
                    <FontAwesomeIcon icon={faCircleCheck} />
                </div>

                <div
                    className={classNames('todoItem', {
                        itemComplete: item.isComplete,
                    })}
                >
                    <p>{item.title}</p>

                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default TodoItem;
