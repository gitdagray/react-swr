import { addTodo, updateTodo, deleteTodo } from "../api/todosApi"

export const addMutation = async (newTodo, todos) => {
    const added = await addTodo(newTodo)
    return [...todos, added].sort((a, b) => b.id - a.id)
}

export const addTodoOptions = (newTodo, todos) => {
    return {
        optimisticData: [...todos, newTodo]
            .sort((a, b) => b.id - a.id),
        rollbackOnError: true,
        populateCache: true,
        revalidate: false
    }
}

export const updateMutation = async (updatedTodo, todos) => {
    const updated = await updateTodo(updatedTodo)
    const prevTodos = todos.filter(todo => {
        return todo.id !== updatedTodo.id
    })
    return [...prevTodos, updated]
        .sort((a, b) => b.id - a.id)
}

export const updateTodoOptions = (updatedTodo, todos) => {
    return {
        optimisticData: () => {
            const prevTodos = todos.filter(todo => {
                return todo.id !== updatedTodo.id
            })
            return [...prevTodos, updatedTodo]
                .sort((a, b) => b.id - a.id)
        },
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
    }
}

export const deleteMutation = async ({ id }, todos) => {
    await deleteTodo({ id })
    return todos.filter(todo => {
        return todo.id !== id
    })
}

export const deleteTodoOptions = ({ id }, todos) => {
    return {
        optimisticData: () => {
            return todos.filter(todo => {
                return todo.id !== id
            })
        },
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
    }
}