import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders title and author, but not url or likes by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'some author',
    likes: 15,
    url: 'somefancyurl',
    user: {
      username: 'hamper',
      name: 'Hamper Man',
    },
  }

  const user = {
    username: 'hamper',
  }

  render(
    <Blog
      blog={blog}
      user={user}
      updateBlogs={() => {}}
      deleteBlog={() => {}}
    />
  )

  const element = screen.getByText(`${blog.title} ${blog.author}`)
  expect(element).toBeDefined()

  expect(screen.queryByText(`likes ${blog.likes}`)).toBeNull()
  expect(screen.queryByText(blog.url)).toBeNull()
})

test('after clicking the button, children are displayed', async () => {


  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'some author',
    likes: 15,
    url: 'somefancyurl',
    user: {
      username: 'hamper',
      name: 'Hamper Man',
    },
  }

  const user = {
    username: 'hamper',
  }

  render(
    <Blog
      blog={blog}
      user={user}
      updateBlogs={() => {}}
      deleteBlog={() => {}}
    />
  )

  const person = userEvent.setup()
  const button = screen.getByText('view')
  await person.click(button)

  const element = screen.getByText(`likes ${blog.likes}`)
  expect(element).toBeDefined()
  const element1 = screen.getByText(blog.url)
  expect(element1).toBeDefined()


})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'some author',
    likes: 15,
    url: 'somefancyurl',
    user: {
      username: 'hamper',
      name: 'Hamper Man',
    },
  }

  const user = {
    username: 'hamper',
  }

  const mockHandler = vi.fn()

  render(
    <Blog
      blog={blog}
      user={user}
      updateBlogs={mockHandler}
      deleteBlog={() => {}}
    />
  )
  const person = userEvent.setup()
  const button = screen.getByText('view')
  await person.click(button)
  const button2 = screen.getByText('like')
  await person.click(button2)


  expect(mockHandler.mock.calls).toHaveLength(1)
})
