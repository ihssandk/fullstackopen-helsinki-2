const Blog = ({ blog }) => (

  <div>
    
    {blog.url} 
    
    <div>
    likes : {blog.likes} 
    <button>like</button>
    </div>
    {blog.author}
  </div>  
)

export default Blog