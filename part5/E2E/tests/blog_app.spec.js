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
      await request.post('/api/users', {
        data: {
          name: 'additional tester',
          username: 'tester',
          password: 'test'
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
          const blogDiv =  page.locator('.blog-title')
          await expect(blogDiv).toContainText(`test by tester`)
        }) 
        
// 5.20
    test('blog can be liked', async ({ page }) => {   
      await createBlog(page,'test','tester','test.com', true)
      await page.getByText('view').click()
      await page.getByText('like').click()
      await expect(page.getByText('likes : 1')).toBeVisible()
    })
  
// 5.21    
    test('blog can be deleted', async ({ page }) => {
      await createBlog(page, 'test', 'tester', 'test.com', true)
      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', async dialog => { await dialog.accept()  })
      await page.getByRole('button', { name: 'remove' }).click()
      await page.goto('/')
      await expect(page.getByText('test by tester')).not.toBeVisible() 
      })

// 5.22 
    test('blog cannot be deleted by user who didnt create it', async ({ page  }) => {
      await createBlog(page, 'test', 'tester', 'test.com', true)
      await page.getByRole('button', { name: 'logout' }).click()  
      await loginWith(page, 'tester', 'test')
      await expect(page.getByText('additional tester logged-in')).toBeVisible() 
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('remove')).not.toBeVisible()  
    })
})

//5.23
test('blogs are listed by number of likes in descending order ', async({page}) => {
  await loginWith(page, 'mluukkai', 'salainen');
  await createBlog(page,'test0','tester0','test0.com', true)
  await createBlog(page,'test1','tester1','test1.com', true)
  await createBlog(page,'test2','tester2','test2.com', true)

  await page.getByText('test2 by tester2').getByRole('button').click()
  await page.getByRole('button', {name : 'like'}).click({timeout : 2000})
  await page.getByRole('button', {name : 'like'}).click()
  await page.getByRole('button' , {name : 'hide'}).click()

  await page.getByText('test1 by tester1view').getByRole('button').click()
  await page.getByRole('button' , {name : 'like'}).click()
  await page.getByRole('button' , {name : 'hide'}).click()

  const blogTitles = await page.$$eval('.blog-title', elements => elements.map(el => el.textContent));
  expect(blogTitles[0]).toBe('test2 by tester2')
  expect(blogTitles[1]).toBe('test1 by tester1')
  expect(blogTitles[2]).toBe('test0 by tester0')
})

})