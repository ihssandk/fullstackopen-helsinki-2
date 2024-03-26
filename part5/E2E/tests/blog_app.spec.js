const { test,describe, expect ,beforeEach } = require('@playwright/test')
const { loginWith , createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/testing/reset')
    await request.post('/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('/')
  })
    
    test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('blogs')
    await expect(locator).toBeVisible()

    })

    test('login succeeds', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
        await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')

        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('Incorrect username or password')
  })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
          await loginWith(page, 'mluukkai', 'salainen')
        })

      test('a new blog can be created', async ({ page }) => {
        await createBlog(page,'test','tester','test.com', true)
        })
        
      // test('blog can be toggled', async ({ page }) => {
      //   await page.getByRole('button', { name: 'view' }).click()
      //   await expect(page.getByText('hide')).toBeVisible()
      // })
    })  
})