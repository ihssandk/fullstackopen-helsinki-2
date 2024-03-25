const { test,describe, expect ,beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('http://localhost:5173')
  })
    
    test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('blogs')
    await expect(locator).toBeVisible()

    })
    test('login succeeds', async ({ page }) => {
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByTestId('username').fill('mluukkai')
            await page.getByTestId('password').fill('salainen')
            await page.getByRole('button', { name: 'login' }).click()
        })
      test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'create new' }).click()
        await page.getByTestId('title').fill('test blog')
        await page.getByTestId('author').fill('tester')
        await page.getByTestId('url').fill('test.com')
        await page.getByRole('button', { name: 'create' }).click()
        await expect(page.getByText('a new blog test blog by tester')).toBeVisible()
        })
    })  
})