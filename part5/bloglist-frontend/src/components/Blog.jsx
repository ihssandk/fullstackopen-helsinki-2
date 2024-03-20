const Blog = ({blog ,onclick}) =>{

return(
  <div>
    {blog.url} 
    <div>likes : {blog.likes} 
    <button
      type='button'
      onClick={onclick}>like</button>
    </div>
    
  </div>  
)}

export default Blog