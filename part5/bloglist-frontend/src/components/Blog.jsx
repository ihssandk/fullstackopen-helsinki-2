/* eslint-disable linebreak-style */
import Togglable from './Togglable'
import { useRef } from 'react'
const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const blogInfoRef = useRef()

  return (
    <div className='blog' style={{ border: '1px dotted rgba(0, 0, 0, 1)', padding: '5px', marginBottom: '5px' }}>
      <Togglable
        sectionTitle={`${blog.title} by ${blog.author}`}
        buttonLabel='view'
        cancelLabel='hide'
        ref={blogInfoRef}
        className="blog-title"
      >
        <div>
          <div className="blog-title">{blog.title} by {blog.author}</div>
          {blog.url}
          <div>likes : {blog.likes}
            <button type='button' onClick={likeBlog}>like</button>
          </div>
          {user === blog.user?.username && (
            <button onClick={deleteBlog} style={{ background: '#0ed2ff' }}>remove</button>
          )}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog