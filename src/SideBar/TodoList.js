import { useEffect, useState } from 'react';
import './TodoListItem.css';
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import axios from 'axios';
import TodoUpdate from './TodoUpdate';

function TodoList() {

    const [todoList, setTodoList] = useState([]);

    //완료한 일 체크
    const handlerCheck = (todoId) => () => {
        axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/ondayschedule/completetodocheck/${todoId}`, { todoId })
            .then(response => {
                setTodoList(prevList => prevList.map(todo => {
                    if (todo.todoId === todoId) {
                        return { ...todo, todoComplete: true };
                    } else {
                        return todo;
                    }
                }));
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }

    //완료한 일 체크해제
    const handlerUncheck = (todoId) => () => {
        axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/ondayschedule/completetodouncheck/${todoId}`, { todoId })
            .then(response => {
                setTodoList(prevList => prevList.map(todo => {
                    if (todo.todoId === todoId) {
                        return { ...todo, todoComplete: false };
                    } else {
                        return todo;
                    }
                }));
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }

    //todo 테이블 리스트 get
    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/ondayschedule/todo`)
            .then(response => {
                setTodoList(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            {todoList && todoList.map((todo, index) => (
                <div className="TodoList" key={index}>
                    {todo.id}
                    <div className='TodoContainer'>
                        <div className='Todo-box'></div>
                        <div className="TodoListItem">
                            <div className='checkBox'>
                                {todo.todoComplete == true ?
                                    <FaCheckCircle className='checkBoxbutton' onClick={handlerUncheck(todo.todoId)} />
                                    : <FaRegCircle className='checkBoxbutton' onClick={handlerCheck(todo.todoId)} />}
                            </div>
                            {/* TodoUpdate는 TodoList에서 리스트 형태로 불러온 todoName을 상태변수로 이용해야 하기 때문에 TodoList.js 와 분리 */}
                            <TodoUpdate todoName={todo.todoName} todoId={todo.todoId}></TodoUpdate>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default TodoList;
