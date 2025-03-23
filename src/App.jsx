import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const SavetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const togglefinished = () => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newtodos = todos.filter((item) => item.id !== id);
    setTodos(newtodos);
    SavetoLS();
  };

  const handleDelete = (e, id) => {
    let newtodos = todos.filter((item) => item.id !== id);
    setTodos(newtodos);
    SavetoLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    SavetoLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let Id = e.target.name;
    let index = todos.findIndex((item) => item.id === Id);
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos);
    SavetoLS();
  };

  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto bg-slate-400 p-5 my-9 rounded-xl md:min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-xl md:ml-48 ">iTask - Manage your todos at one place</h1>
        <div className="addtodo my-5">
          <h2 className="text-xl font-bold ml-1">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" placeholder="Enter your todo" className="md:w-1/2 rounded-full px-3 py-1 my-1" />
          <button onClick={handleAdd} disabled={todo.length <= 3} className="font-semibold text-sm disabled:bg-slate-800 bg-slate-800 hover:bg-slate-950 text-white p-3 py-1.5 mx-4 md:my-3 rounded-md">
            Add
          </button>
        </div>
        <input type="checkbox" onChange={togglefinished} className="mt-4" value={showFinished} /> Show Finished
        <h1 className="font-bold text-xl mt-5">Your Todos</h1>

        <div className="todos">
          {todos.length === 0 && <div className="m-5">No todos to display</div>}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo my-4 flex md:w-1/2 justify-between gap-2">
                <div className="flex gap-5">
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => handleEdit(e, item.id)} className="font-semibold text-base bg-slate-800 hover:bg-slate-950 text-white p-3 py-1.5 mx-1 rounded-md">
                    <FaEdit />
                  </button>
                  <button onClick={(e) => handleDelete(e, item.id)} className="font-semibold text-base bg-slate-800 hover:bg-slate-950 text-white p-3 py-1.5 mx-1 rounded-md">
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
