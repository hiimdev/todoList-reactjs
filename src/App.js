import React, { Component } from 'react';

// className
import classNames from 'classnames';

// components
import Input from './components/Input';
// import TrafficLight from './components/TrafficLight';

// Font Awesomeicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faCircle } from '@fortawesome/free-solid-svg-icons';

// react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// style
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: '',
            todoItems: [
                {
                    title: 'go to work',
                    isComplete: true,
                },
                {
                    title: 'go to school',
                    isComplete: false,
                },
                {
                    title: 'go to bed',
                    isComplete: false,
                },
            ],
        };

        // this.onKeyUp = this.onKeyUp.bind(this);
    }

    handleTodoComplete = (item) => {
        const { todoItems } = this.state;
        const isComplete = item.isComplete;

        this.setState({
            todoItems: todoItems.map((i) =>
                i === item ? { ...i, isComplete: !isComplete } : { ...i },
            ),
        });
    };

    handleAddTodo = (event) => {
        // Enter key
        if (event.keyCode === 13) {
            let text = event.target.value;
            text = text.trim();
            if (!text) {
                toast.error('Missing require!');
                return;
            }

            this.setState({
                newItem: '',
                todoItems: [
                    ...this.state.todoItems,
                    { title: text, isComplete: false },
                ],
            });
            toast.success('Success!');
        }
    };

    handleChangeInput = (event) => {
        this.setState({
            newItem: event.target.value,
        });
    };

    handleCheckAll = () => {
        const { todoItems } = this.state;

        this.setState({
            todoItems: todoItems.map((i) =>
                i.isComplete
                    ? { ...i, isComplete: !i.isComplete }
                    : { ...i, isComplete: !i.isComplete },
            ),
        });
    };

    handleDeleteTodo = (item) => {
        const { todoItems } = this.state;
        const index = todoItems.indexOf(item);

        this.setState({
            todoItems: [
                ...todoItems.slice(0, index),
                ...todoItems.slice(index + 1),
            ],
        });
        toast.success('Delete successfully!!');
    };

    render() {
        const { todoItems, newItem } = this.state;

        return (
            <div className="App">
                <div className="container">
                    <div className="wrap">
                        <div className="icon-check">
                            <FontAwesomeIcon
                                icon={faCheck}
                                onClick={() => this.handleCheckAll()}
                            />
                        </div>
                        <Input
                            value={newItem}
                            onChange={(event) => this.handleChangeInput(event)}
                            onKeyUp={(event) => this.handleAddTodo(event)}
                        />
                    </div>

                    {todoItems.length > 0 &&
                        todoItems.map((item, index) => (
                            <div className="wrap" key={index}>
                                <div
                                    onClick={() =>
                                        this.handleTodoComplete(item)
                                    }
                                    className={classNames(
                                        'icon',
                                        'icon-circle',
                                        {
                                            'icon-active': !item.isComplete,
                                        },
                                    )}
                                >
                                    <FontAwesomeIcon icon={faCircle} />
                                </div>
                                <div
                                    onClick={() =>
                                        this.handleTodoComplete(item)
                                    }
                                    className={classNames(
                                        'icon',
                                        'icon-circle',
                                        {
                                            'icon-active': item.isComplete,
                                        },
                                    )}
                                >
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                </div>

                                <div
                                    className={classNames('todoItem', {
                                        itemComplete: item.isComplete,
                                    })}
                                >
                                    <p>{item.title}</p>

                                    <div className="icon icon-del">
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            onClick={() =>
                                                this.handleDeleteTodo(item)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                    {todoItems.length === 0 && (
                        <p className="item-null">Nothing here!!!</p>
                    )}
                </div>

                {/* <TrafficLight /> */}

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        );
    }
}

export default App;
