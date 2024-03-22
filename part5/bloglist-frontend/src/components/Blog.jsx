/* eslint-disable linebreak-style */
const Blog = ({ blog,likeBlog,deleteBlog,user }) => {

  return(
    <div >
      {blog.url}
      <div>likes : {blog.likes}
        <button
          type='button'
          onClick={likeBlog}>like</button>
      </div>
      { user === blog.user?.username && (
        <button
          onClick={deleteBlog}
          style={{ background:'#0ed2ff' }}>remove</button>
      )}
    </div>
  )}

export default Blog