import axios from 'axios';

const baseUrl = "https://fullstack-todo-list-yt-backend-2.onrender.com/todo/";

const getAllToDo = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error; // Re-throw the error to handle it in the caller function
    }
};

const addToDo = async (text, setText, setToDo) => {
    try {
        const response = await axios.post(`${baseUrl}save`, { text });
        if (setText) {
            setText(""); // Call setText only if it's defined
        }
        if (setToDo) {
            setToDo(prevState => [...prevState, response.data]); // Update the todo list
        }
    } catch (error) {
        console.error('Error adding todo:', error);
        throw error;
    }
};
;

const updateToDo = async (toDoId, text, setToDo, setText, setIsUpdating) => {
    try {
        await axios.put(`${baseUrl}${toDoId}`, { _id: toDoId, text });
        if (setText) {
            setText(""); // Call setText only if it's defined
        }
        if (setIsUpdating) {
            setIsUpdating(false); // Update setIsUpdating if it's defined
        }
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
};


const deleteToDo = async (_id) => {
    try {
        const response = await axios.delete(`${baseUrl}${_id}`, { _id });
        return response.data;
    } catch (error) {
        throw error;
    }
};




export { getAllToDo, addToDo, updateToDo, deleteToDo };
