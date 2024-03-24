/* eslint-disable linebreak-style */
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('5.13', async () => {
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('type a blog post title')
  const authorInput = screen.getByPlaceholderText('who is the author?')
  const urlInput = screen.getByPlaceholderText('add link to the post?')
  const sendButton = screen.getByText('create')

  await userEvent.type(titleInput, 'Testing a form...')
  await userEvent.type(authorInput, 'tester')
  await userEvent.type(urlInput, 'https://test.com')
  await userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing a form...')
  expect(createBlog.mock.calls[0][0].author).toBe('tester')
  expect(createBlog.mock.calls[0][0].url).toBe('https://test.com')

  console.log(createBlog.mock.calls)
})