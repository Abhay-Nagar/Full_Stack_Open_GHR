import { useState } from 'react'





const Blogform = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    setTitle('')
    setAuthor('')
    setUrl('')
    createBlog({ title, author, url })
  }

  return(
    <form onSubmit={handleCreate}>
      <div>
        <div>
          <label>
            title
            <input type="text" value={title} onChange={({ target }) => setTitle(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            author
            <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            url
            <input type="text" value={url} onChange={({ target }) => setUrl(target.value)}/>
          </label>
        </div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

export default Blogform