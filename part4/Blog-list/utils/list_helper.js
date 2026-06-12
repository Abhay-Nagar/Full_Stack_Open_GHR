const _ = require('lodash')

const dummy = () => {

  return 1

}

const totalLikes = (blogs) => {

  const total = blogs.reduce((sum, blog) => sum + blog.likes ,0)
  return total
}

const favouriteBlog = (blogs) => {

  const favourite = blogs.reduce((fav , blog) => {
    if (blog.likes>=fav.likes){

      return blog
    }
    return fav
  },{ likes: 0 } )

  return favourite
}

const mostBlogs = (blogs) => {

  const most =Object.entries(_.countBy(blogs, 'author')).reduce((most , author) => {

    if (author[1]>=most[1]){

      return author
    }
    return most
  },[0,0] )


  console.log('this is mostBlogs:', most)
  return {
    author: most[0],
    blogs: most[1],
  }
}

const mostLikes = (blogs) => {

  if (blogs.length === 0) {
    return null
  }

  const authorLikes = Object.entries(blogs.reduce((sum, blog) => {
    sum[blog.author] = (sum[blog.author] || 0) + blog.likes
    return sum
  },{}))

  const maxLikes = _.maxBy(authorLikes, author => author[1])
  return {
    author: maxLikes[0],
    likes: maxLikes[1]
  }

}

module.exports = {
  dummy , totalLikes , favouriteBlog, mostBlogs, mostLikes
}