import AddTodo from "./components/add-todo";
import {Todos} from "./components/todos";
import Navbar from "./components/navbar";
import "./custom.css"

const Page = () => {
    return (
      <main>
          
          <AddTodo />
          <Todos />
      </main>
    );
};

export default Page;