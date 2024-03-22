/* eslint-disable linebreak-style */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'me',
    url: 'testing-react.com',
    likes : 2,
    user : '65e8ae5136fbb1a0ad2c5170'
  }

  const mockHandler = vi.fn()
  render(
    <Blog blog={blog} likeBlog={mockHandler} />  )
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)

  render(<Blog blog={blog} />)

  screen.debug()
  const element = screen.getElementsByClassName('blog')
  const element2 = screen.getByText('testing-react.com')

  screen.debug(element2)
  expect(element).toBeDefined()
})