// import logo from './logo.svg';
import React, { Component } from 'react';

import TodoItem from './components/TodoItem';
import Input from './components/Input';

import './App.css';
import './components/todoItem.css';
// import TrafficLight from './components/TrafficLight';

class App extends Component {
    constructor() {
        super();
        this.state = {
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
    }

    onItemClicked(item) {
        return () => {
            const { todoItems } = this.state;
            const isComplete = item.isComplete;

            this.setState({
                todoItems: todoItems.map((i) =>
                    // i !== item ? { ...i } : { ...i, isComplete: !isComplete },
                    i === item ? { ...i, isComplete: !isComplete } : { ...i },
                ),
            });
        };
    }

    render() {
        const { todoItems } = this.state;
        return (
            <div className='App'>
                <div className='container'>
                    <Input />
                    {todoItems.length > 0 &&
                        todoItems.map((item, index) => (
                            <TodoItem
                                key={index}
                                item={item}
                                onClick={this.onItemClicked(item)}
                            />
                        ))}

                    {todoItems.length === 0 && 'Nothing here'}
                    {/* <TrafficLight /> */}
                </div>
            </div>
        );
    }
}

export default App;
