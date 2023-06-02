// https://react-icons.github.io/react-icons/icons?name=md
import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.css';
import axios from 'axios';
import { FaPen } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import Swal from "sweetalert2";


//TodoUpdate는 TodoList에서 리스트 형태로 불러온 todoName을 상태변수로 이용해야 하기 때문에 TodoList.js 와 분리
//각 리스트 별 todoName과 id 를 props형태로 받아와 TodoUpdate.js에서 처리
function TodoUpdate(props) {
    const [todoName, setTodoName] = useState(props.todoName);
    const [todoId, setTodoId] = useState(props.todoId);

    const handlerChangeTodoName = e => setTodoName(e.target.value);

    //todoName 수정
    const handlerClickUpdate = () => {
        axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/ondayschedule/updatetodo/${props.todoId}`, { todoName })
            Swal.fire({
                text: "정상적으로 수정되었습니다.",
                confirmButtonColor: "#0096EB"
            })
            .then(function () {
                window.location.replace("/");
            })
            .catch(error => console.log(error));
    };
    //todo_delete_yn 을 Y로 수정
    const handlerDelete = () => {
        axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/ondayschedule/deletetodo/${props.todoId}`)
            Swal.fire({
                text: "TODO가 삭제되었습니다.",
                confirmButtonColor: "#0096EB"
            })
            .then(function () {
                window.location.replace("/");
            })
            .catch((error) => {
                Swal.fire(`삭제에 실패했습니다. (${error.message})`);
                return;
              });
    };

    return (
        <>
            <div className='text'>
                <input type="text" id="todoName" name="todoName" value={todoName} onChange={handlerChangeTodoName} required />
            </div>
            <div className="todo-button">
                <FaPen className='editButton' onClick={() => handlerClickUpdate(todoId)} />
                <div className="todo-button">
                    <AiOutlineClose className='deleteButton' onClick={() => handlerDelete(todoId)} />
                </div>
            </div>
        </>
    );
};

export default TodoUpdate;