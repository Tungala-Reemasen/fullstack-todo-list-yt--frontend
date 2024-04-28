import React, { useEffect, useState } from "react";
import ToDo from "./ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "../utils/HandleApi";

function Form() {
    const [toDo, setToDo] = useState([]);
    const [text, setText] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [toDoId, setToDoId] = useState("");

    useEffect(() => {
        fetchToDoList();
    }, []);

    const fetchToDoList = async () => {
        try {
            const todos = await getAllToDo();
            if (Array.isArray(todos)) { // Check if todos is an array
                setToDo(todos);
            } else {
                console.error("Error fetching to-do list: Invalid data format");
            }
        } catch (error) {
            console.error("Error fetching to-do list:", error);
        }
    };

    const updateMode = (_id, text) => {
        setIsUpdating(true);
        setText(text);
        setToDoId(_id);
    };

    const handleAddOrUpdateToDo = async () => {
        if (isUpdating) {
            await updateToDo(toDoId, text);
        } else {
            await addToDo(text);
        }
        fetchToDoList(); // Refresh the to-do list after adding/updating
        setText(""); // Clear the input field
        setIsUpdating(false);
    };

    const handleDeleteToDo = async (_id) => { // Define deleteToDo function
        try {
            await deleteToDo(_id);
            fetchToDoList(); // Refresh the to-do list after deletion
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <h1>TODO LIST</h1>
                <div className="top">
                    <input
                        type="text"
                        placeholder="Add Todos..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div className="add" onClick={handleAddOrUpdateToDo}>
                        {isUpdating ? "Update" : "Add"}
                    </div>
                </div>
                <div className="list">
                    {toDo.map((item) => (
                        <ToDo
                            key={item._id}
                            text={item.text}
                            updateMode={() => updateMode(item._id, item.text)}
                            deleteToDo={() => handleDeleteToDo(item._id)} // Pass _id to handleDeleteToDo
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Form;
