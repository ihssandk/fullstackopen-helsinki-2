const { test,describe, expect ,beforeEach } = require('@playwright/test')
const { loginWith , createBlog } = require('./helper')

// 5.17
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
    await page.goto('/')
  })
    
    // 5.18
    describe('Login', () => {
      test('succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
        await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
      })
      
      test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'wrong')
        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('Incorrect username or password')
      })
    })

  // 5.19
    describe('when logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
      })
      test('a new blog can be created', async ({ page }) => {
        await createBlog(page,'test','tester','test.com', true)
      }) 
    })  
  })