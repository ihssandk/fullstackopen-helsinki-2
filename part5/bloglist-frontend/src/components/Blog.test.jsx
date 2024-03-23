/* eslint-disable linebreak-style */
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'tester',
    likes : 10,
    url : 'test.net'
  }

  const { container } = render(<Blog blog={blog}/>)
  screen.debug()

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library')
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'tester',
    likes : 10,
    url : 'test.net'
  }

  const mockHandler = vi.fn()
  render(
    <Blog blog={blog} likeBlog={mockHandler} />  )

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)})