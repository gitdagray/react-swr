export const addTodoOptions = (newTodo) => {
    return {
        // optimistic data displays until we populate cache
        // param is previous data
        optimisticData: (todos) => [...todos, newTodo]
            .sort((a, b) => b.id - a.id),
        rollbackOnError: true,
        populateCache: (added, todos) => [...todos, added]
            .sort((a, b) => b.id - a.id),
        revalidate: false
    }
}

export const updateTodoOptions = (updatedTodo) => {
    return {
        // optimistic data displays until we populate cache
        // param is previous data
        optimisticData: (todos) => {
            const prevTodos = todos.filter(todo => {
                return todo.id !== updatedTodo.id
            })
            return [...prevTodos, updatedTodo]
                .sort((a, b) => b.id - a.id)
        },
        rollbackOnError: true,
        // response from API request is 1st param
        // previous data is 2nd param
        populateCache: (updated, todos) => {
            const prevTodos = todos.filter(todo => {
                return todo.id !== updatedTodo.id
            })
            return [...prevTodos, updated]
                .sort((a, b) => b.id - a.id)
        },
        revalidate: false,
    }
}

export const deleteTodoOptions = ({ id }) => {
    return {
        // optimistic data displays until we populate cache
        // param is previous data
        optimisticData: (todos) => {
            return todos.filter(todo => {
                return todo.id !== id
            })
        },
        rollbackOnError: true,
        // response from API request is 1st param
        // previous data is 2nd param
        populateCache: (emptyResponseObj, todos) => {
            return todos.filter(todo => {
                return todo.id !== id
            })
        },
        revalidate: false,
    }
}