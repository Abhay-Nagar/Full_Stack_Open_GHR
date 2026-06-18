const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, loginWithApi, createBlogWithApi } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Abhay Nagar',
        username: 'anagar',
        password: 'anagar'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    

    await expect(page.getByRole('heading', { name: 'login form' })).toBeVisible()

    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()

    await expect(page.getByRole('textbox').first()).toBeVisible()
    await expect(page.getByRole('textbox').nth(1)).toBeVisible()

    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

   describe('Login', () => {
    
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      // ...
      await loginWith(page, 'mluukkai', 'wrong')
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'blog by playwright', 'Playwright', 'urlToPlaywright' )
      const blog = page.locator('.blog').filter({hasText: 'blog by playwright Playwright',})
      await expect(blog).toBeVisible()
  
    })

    test('new blog can be liked', async ({ page }) => {
      await createBlog(page, 'blog by playwright', 'Playwright', 'urlToPlaywright' )
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1like')).toBeVisible()
  
    })

    test('make sure person who made blog can delete blog', async ({ page }) => {
      await createBlog(page, 'blog by playwright', 'Playwright', 'urlToPlaywright' )
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'delete' }).click()
      
      await expect(page.locator('.blog').filter({hasText: 'blog by playwright Playwright',})).not.toBeVisible()
  
    })

  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('make sure person who did not make blog cannot delete', async ({ page }) => {
      await createBlog(page, 'blog by playwright', 'Playwright', 'urlToPlaywright' )
      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'anagar', 'anagar')
      await page.getByRole('button', { name: 'view' }).click()
      await expect( page.getByRole('button', { name: 'delete' })).not.toBeVisible()
  
    })
  })

  describe('With multiple blogs', () => {
  beforeEach(async ({ page, request }) => {
    const user = await loginWithApi(request, 'mluukkai', 'salainen')

    await createBlogWithApi(request, user.token, {
      title: 'fifth_blog',
      author: 'test author',
      url: 'test-url-5',
      likes: 3,
    })

    await createBlogWithApi(request, user.token, {
      title: 'second_blog',
      author: 'test author',
      url: 'test-url-2',
      likes: 17,
    })

    await createBlogWithApi(request, user.token, {
      title: 'fourth_blog',
      author: 'test author',
      url: 'test-url-4',
      likes: 9,
    })

    await createBlogWithApi(request, user.token, {
      title: 'first_blog',
      author: 'test author',
      url: 'test-url-1',
      likes: 25,
    })

    await createBlogWithApi(request, user.token, {
      title: 'third_blog',
      author: 'test author',
      url: 'test-url-3',
      likes: 12,
    })

    await page.goto('/')
    await loginWith(page, 'mluukkai', 'salainen')
  })

  test('blogs are ordered from most likes to least likes', async ({ page }) => {
    const blogs = page.locator('.blog')

    await expect(blogs.nth(0)).toContainText('first_blog')
    await expect(blogs.nth(1)).toContainText('second_blog')
    await expect(blogs.nth(2)).toContainText('third_blog')
    await expect(blogs.nth(3)).toContainText('fourth_blog')
    await expect(blogs.nth(4)).toContainText('fifth_blog')
  })
})


  

})