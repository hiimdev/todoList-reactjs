import React, { Component } from 'react';

import TodoItem from './components/TodoItem';
import Input from './components/Input';
import TrafficLight from './components/TrafficLight';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

// react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import './components/Input.css';
import './components/todoItem.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: '',
            todoItems: [
                // {
                //     title: 'go to work',
                //     isComplete: true,
                // },
                // {
                //     title: 'go to school',
                //     isComplete: false,
                // },
                // {
                //     title: 'go to bed',
                //     isComplete: false,
                // },
            ],
        };

        this.onKeyUp = this.onKeyUp.bind(this);
        this.onChange = this.onChange.bind(this);

        this.checkedAll = this.checkedAll.bind(this);
    }

    onItemClicked(item) {
        return () => {
            const { todoItems } = this.state;
            const isComplete = item.isComplete;

            this.setState({
                todoItems: todoItems.map((i) =>
                    i === item ? { ...i, isComplete: !isComplete } : { ...i },
                ),
            });
            toast.success('Wow so easy!');
        };
    }

    onKeyUp(event) {
        // Enter key
        if (event.keyCode === 13) {
            let text = event.target.value;
            if (!text) {
                toast.error('Missing require!');
                return;
            }
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
    }

    onChange(event) {
        this.setState({
            newItem: event.target.value,
        });
    }

    checkedAll() {
        const { todoItems } = this.state;

        this.setState({
            todoItems: todoItems.map((i) =>
                i.isComplete
                    ? { ...i, isComplete: !i.isComplete }
                    : { ...i, isComplete: !i.isComplete },
            ),
        });
    }

    delItem(item) {
        return () => {
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
    }

    render() {
        const { todoItems, newItem } = this.state;

        return (
            <div className="App">
                <div className="container">
                    <div className="wrap">
                        <div className="icon-check">
                            <FontAwesomeIcon
                                icon={faCheck}
                                onClick={this.checkedAll}
                            />
                        </div>
                        <Input
                            value={newItem}
                            onChange={this.onChange}
                            onKeyUp={this.onKeyUp}
                        />
                    </div>

                    {todoItems.length > 0 &&
                        todoItems.map((item, index) => (
                            <TodoItem
                                key={index}
                                item={item}
                                onClick={this.onItemClicked(item)}
                            >
                                <div className="icon icon-del">
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        onClick={this.delItem(item)}
                                    />
                                </div>
                            </TodoItem>
                        ))}

                    {todoItems.length === 0 && (
                        <p className="item-null">Nothing here!!!</p>
                    )}
                </div>
                <TrafficLight />
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
