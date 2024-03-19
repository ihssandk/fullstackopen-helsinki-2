const BlogForm = ({
    addBlog,
    title,
    author,
    url,
    handleTitle,
    handleAuthor,
    handleUrl

}) => 

 (
    <div>
      <h2> create new</h2>
      <form onSubmit={addBlog}>
        <label>title
          <input 
          value={title}
          onChange ={handleTitle}/>
        </label>
        <br />
        <label>author
          <input
          value={author}
          onChange ={handleAuthor} />
        </label>
          <br />
        <label>url
          <input 
          value={url}
          onChange ={handleUrl} />
        </label>
        <br />
        <button type="submit">create</button>
      </form>  
    </div>
  )

  export default BlogForm