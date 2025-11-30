import { readBody } from "h3"
import getDB from "../../lib/db"


interface Todo {
    id: number
    title: string
    completed: boolean
    created_at?: string
}

export default defineEventHandler(async (event) => {
    const db = getDB()
    const method = event.method

    // READ all todos
    if (method === 'GET') {
        const todos = await db<Todo>('todos').select('*').orderBy('id', 'desc')
        return todos
    }

    // CREATE a new todo
    if (method === 'POST') {
        const body = await readBody<{ title: string }>(event)
        const [todo] = await db('todos')
            .insert({ title: body.title, completed: false })
            .returning('*')
        return todo
    }

    // UPDATE a todo
    if (method === 'PUT') {
        const body = await readBody<Todo>(event)
        const [updated] = await db('todos')
            .where({ id: body.id })
            .update(
                {
                    title: body.title,
                    completed: body.completed
                }
            )
            .returning('*')
        return updated
    }

    // DELETE a todo
    if (method === 'DELETE') {
        const body = await readBody<{ id: number }>(event)
        await db('todos').where({ id: body.id }).del()
        return { success: true }
    }
})