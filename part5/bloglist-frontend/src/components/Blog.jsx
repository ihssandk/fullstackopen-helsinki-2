const Blog = ({blog ,onclick , userId}) =>{

return(
  <div>
    {blog.url} 
    <div>likes : {blog.likes} 
    <button
      type='button'
      onClick={onclick}>like</button>
    </div>
    { userId === blog.user && (
      <button style={{background:'#0ed2ff'}}>remove</button>
    )}
  </div>  
)}

export default Blog