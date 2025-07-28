import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono()

app.post('/api/v1/signup', async (c) => {
  const body = await c.req.json()
  console.log(body)
  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
  await prisma.user.create({
    data: {
      name: body.name,
      password: body.password,
      email: body.email
    }
  })
  return c.json({
    message: "User Created"
  })
})

app.post('/api/v1/signin', async (c, next) => {
  if(c.req.header("Authorization")){
    console.log("Entering Authorized Route")
    await next()
  }
  else{
    return c.json({
      message: "User not Authorized"
    })
  }
})
app.post('/api/v1/createTodo', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/v1/getTodo', (c) => {
  return c.text('Hello Hono!')
})

export default app

