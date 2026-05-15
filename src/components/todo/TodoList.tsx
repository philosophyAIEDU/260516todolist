import { useTodoStore } from '../../stores/todoStore';
export const TodoList = () => { const {todos,toggleTodo}=useTodoStore(); return <section><h2>Todo</h2>{todos.map((t)=><div key={t.id}><input type='checkbox' checked={t.done} onChange={()=>toggleTodo(t.id)}/>{t.text}</div>)}</section>; };
