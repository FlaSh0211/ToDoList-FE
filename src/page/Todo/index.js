import React from 'react';
import { Route } from 'react-router-dom';
import Todolist from './container/Todolist';

const TodoComponent = ()=> {
    return (
        <>
            <Route path="/todolist" component= { Todolist } />
        </>
    )
}

export default TodoComponent;