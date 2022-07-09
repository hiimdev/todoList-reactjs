import React, {Component} from 'react';

// className
import classNames from 'classnames';

// components
import Input from './components/Input';
import TrafficLight from './components/TrafficLight';

// Font Awesomeicon
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faXmark} from '@fortawesome/free-solid-svg-icons';
import {faCircleCheck, faCircle} from '@fortawesome/free-solid-svg-icons';

// react-toastify
import {ToastContainer, toast} from 'react-toastify';
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
                    id: 1,
                    title: 'go to work',
                    isComplete: true,
                },
                {
                    id: 2,
                    title: 'go to school',
                    isComplete: false,
                },
                {
                    id: 3,
                    title: 'go to bed',
                    isComplete: false,
                },
            ],
            editTodo: {},
        };

        // this.onKeyUp = this.onKeyUp.bind(this);
    }

    // handle when todo complete
    handleTodoComplete = (item) => {
        const {todoItems} = this.state;
        const isComplete = item.isComplete;

        this.setState({
            todoItems: todoItems.map((i) =>
                i === item ? {...i, isComplete: !isComplete} : {...i},
            ),
        });
    };

    // handle add todo
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
                    {
                        id: Math.floor(Math.random() * 100000),
                        title: text,
                        isComplete: false,
                    },
                ],
            });
            toast.success('Success!');
        }
    };

    // handle on change
    handleChangeInput = (event) => {
        this.setState({
            newItem: event.target.value,
        });
    };

    //  handle check all
    handleCheckAll = () => {
        const {todoItems} = this.state;

        this.setState({
            todoItems: todoItems.map((i) =>
                !i.isComplete ? {...i, isComplete: true} : {...i},
            ),
        });
    };

    // handle delete
    handleDeleteTodo = (item) => {
        const {todoItems} = this.state;
        const index = todoItems.indexOf(item);

        this.setState({
            todoItems: [
                ...todoItems.slice(0, index),
                ...todoItems.slice(index + 1),
            ],
        });
        toast.success('Delete successfully!!');
    };

    // Edit todo
    // DB Click todo
    handleDBClickEditTodo = (item) => {
        const {todoItems} = this.state;

        this.setState({
            editTodo: item,
            todoItems: todoItems.map((i) =>
                i === item && i.isComplete
                    ? {...i, isComplete: !i.isComplete}
                    : {...i},
            ),
        });
    };

    // handle on change
    handleOnChangeEditTodo = (event) => {
        let editTodoCopy = this.state.editTodo;
        editTodoCopy.title = event.target.value;

        this.setState({
            editTodo: editTodoCopy,
        });
    };

    // handle update
    handleUpdateEditTodo = (event, item) => {
        const {todoItems, editTodo} = this.state;
        const isEmptyObj = Object.keys(editTodo).length === 0;
        // Enter key
        if (event.keyCode === 13) {
            let text = event.target.value;
            text = text.trim();
            if (!text) {
                toast.error('Missing require!');
                return;
            }
            if (isEmptyObj === false && editTodo.id === item.id) {
                let todoItemsCopy = [...todoItems];

                console.log(todoItemsCopy);

                const objIndex = todoItemsCopy.findIndex(
                    (i) => i.id === item.id,
                );

                todoItemsCopy[objIndex].title = editTodo.title;

                this.setState({
                    todoItems: todoItemsCopy,
                    editTodo: {},
                });
                toast.success('Update successful!');
                return;
            }
        }
    };

    // handle when blur input edit
    handleOnBlurInput = () => {
        this.setState({
            editTodo: {},
        });
    };

    render() {
        const {todoItems, newItem, editTodo} = this.state;

        let isEmptyObj = Object.keys(editTodo).length === 0;

        return (
            <div className='App'>
                <div className='container'>
                    <div className='wrap'>
                        <div className='icon-check'>
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
                            <div className='wrap' key={item.id}>
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
                                    {isEmptyObj === true ? (
                                        <p
                                            onDoubleClick={() =>
                                                this.handleDBClickEditTodo(item)
                                            }
                                        >
                                            {item.title}
                                        </p>
                                    ) : (
                                        <>
                                            {editTodo.id === item.id ? (
                                                <input
                                                    className='input-edit'
                                                    onChange={(event) =>
                                                        this.handleOnChangeEditTodo(
                                                            event,
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        this.handleOnBlurInput()
                                                    }
                                                    onKeyUp={(event) =>
                                                        this.handleUpdateEditTodo(
                                                            event,
                                                            item,
                                                        )
                                                    }
                                                    value={editTodo.title}
                                                ></input>
                                            ) : (
                                                <p
                                                    onDoubleClick={() =>
                                                        this.handleDBClickEditTodo(
                                                            item,
                                                        )
                                                    }
                                                >
                                                    {item.title}
                                                </p>
                                            )}
                                        </>
                                    )}

                                    <div className='icon icon-del'>
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
                        <p className='item-null'>Nothing here!!!</p>
                    )}
                </div>

                <TrafficLight />

                <ToastContainer
                    position='top-right'
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
