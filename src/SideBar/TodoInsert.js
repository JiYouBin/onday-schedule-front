// https://react-icons.github.io/react-icons/icons?name=md
import { useState } from 'react';
import { BsPatchPlusFill } from 'react-icons/bs';
import './TodoInsert.css';
import axios from 'axios';
import Swal from "sweetalert2";

function TodoInsert() {
  const [todoName, setTodoName] = useState('');
  const handlerChange = e => setTodoName(e.target.value);
  const handlerSubmit = e => {
    e.preventDefault();
    setTodoName('');
    // todo 작성
    axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/ondayschedule/inserttodo`, { todoName })
    Swal.fire({
      text: "새로운 TODO가 등록되었습니다! (◍•ᴗ•◍)❤",
      confirmButtonColor: "#0096EB"
    })
      .then(function () {
        window.location.replace("/");
      })
      .catch((error) => {
        Swal.fire(`TODO 등록에 실패했습니다... ‧₊˚(✘﹏✘) (${error.message})`);
        return;
      });
  };

  return (
    <form className="TodoInsert" onSubmit={handlerSubmit}>
      <input type="text" placeholder="할 일을 추가해보세요!" value={todoName} onChange={handlerChange} required />
      <button className='todosubmit' type="submit"><BsPatchPlusFill className='todosubmitBtn' /></button>
    </form>
  );
};

export default TodoInsert;
