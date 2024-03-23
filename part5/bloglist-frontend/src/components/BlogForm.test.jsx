/* eslint-disable linebreak-style */
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={addBlog} />)

  const input = screen.getByPlaceholderText('type a blog post title')
  const sendButton = screen.getByText('create')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].content).toBe('testing a form...')

  console.log(addBlog.mock.calls)
})