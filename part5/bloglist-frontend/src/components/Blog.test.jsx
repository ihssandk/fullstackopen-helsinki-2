/* eslint-disable linebreak-style */
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

// test('renders content', () => {
//   const blog = {
//     title: 'Component testing is done with react-testing-library',
//     author: 'tester',
//     likes : 10,
//     url : 'test.net'
//   }

//   const { container } = render(<Blog blog={blog}/>)
//   screen.debug()

//   const div = container.querySelector('.blog')
//   expect(div).toHaveTextContent(
//     'Component testing is done with react-testing-library')
// })

// test('clicking the button calls event handler once', async () => {
//   const blog = {
//     title: 'Component testing is done with react-testing-library',
//     author: 'tester',
//     likes : 10,
//     url : 'test.net'
//   }

//   const mockHandler = vi.fn()
//   render(
//     <Blog blog={blog} likeBlog={mockHandler} />  )

//   const user = userEvent.setup()
//   const button = screen.getByText('like')
//   await user.click(button)
//   expect(mockHandler.mock.calls).toHaveLength(1)})

test('5.13', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'tester',
    likes : 10,
    url : 'test.net'
  }

  const { container } = render(<Blog blog={blog}/>)
  screen.debug()

  const div = container.querySelector('.blog-title')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library')

  expect(div).not.toHaveTextContent('10')
  expect(div).not.toHaveTextContent('test.net')
})

test('5.14', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'tester',
    likes : 10,
    url : 'test.net'
  }

  render( <Blog blog={blog} />)

  const buttons = screen.queryByText('view')
  const button = buttons[0]
  userEvent.click(button)


  screen.debug()

  const likes = screen.getByText('10' , { exact: false })
  expect(likes).toBeDefined()
  const url = screen.getByText('test.net' , { exact: false })
  expect(url).toBeDefined()

})

test('5.15', async () => {
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
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)})
