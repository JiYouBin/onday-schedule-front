import Title from '../Title/Title';
import EventInsert from './EventInsert';
import './SideTemplate.css';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';
import EventList from './EventList';

function SideTemplate() {

    return (
        <>
            <div className="Side">
                <div className='Event'>
                    <EventInsert />
                    <div className="EventList">
                        <EventList />
                    </div>
                </div>
                <div className='Todo'>
                    <div className="todo-title">오늘의 TODO</div>
                    <div className='todoInsert'>
                        <TodoInsert />
                    </div>
                    <div className='todoList'>
                        <TodoList />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideTemplate;