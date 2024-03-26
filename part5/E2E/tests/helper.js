const {  expect } = require('@playwright/test')

const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }

const createBlog = async (page, title,author,url) => {
    await page.getByRole('button', { name: 'create new' }).click()
    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
    const blogDiv = await page.locator('.blog-title')
    await expect(blogDiv).toContainText(`${title} by ${author}`)
}
  export { loginWith, createBlog }