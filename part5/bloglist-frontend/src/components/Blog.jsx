const Blog = ({blog ,likeBlog , deleteBlog, userId}) =>{

return(
  <div>
    {blog.url} 
    <div>likes : {blog.likes} 
    <button
      type='button'
      onClick={likeBlog}>like</button>
    </div>
    { userId == blog.user?.id && (
      <button onClick={deleteBlog} style={{background:'#0ed2ff'}}>remove</button>
    )}
  </div>  
)}

export default Blog