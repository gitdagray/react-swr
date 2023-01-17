import axios from "axios"

const todosApi = axios.create({
    baseURL: "http://localhost:3500"
})

export const todosUrlEndpoint = '/todos'

export const getTodos = async () => {
    const response = await todosApi.get(todosUrlEndpoint)
    return response.data
}

export const addTodo = async ({ userId, title, completed }) => {
    const response = await todosApi.post(todosUrlEndpoint, { userId, title, completed })
    return response.data
}

export const updateTodo = async (todo) => {
    await delay()
    const response = await todosApi.patch(`${todosUrlEndpoint}/${todo.id}`, todo)
    return response.data
}

export const deleteTodo = async ({ id }) => {
    await delay()
    return await todosApi.delete(`${todosUrlEndpoint}/${id}`, id)
}