import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://ler.ecordel.com.br');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/e-cordel/);
});

test('input test', async ({ page }) => {
  await page.goto('https://ler.ecordel.com.br')

  //selecionar o input
  const input = page.locator('input[placeholder="Pesquisar cordel"]')

  //Digita no input
  await input.fill("Oração da Menina Benigna")

  const title = page.locator('span', {
    hasText: 'Oração da Menina Benigna'
  })

  await expect(title).toBeVisible()
  

});

//teste navegar para um cordel 
test('navegar por um cordel', async ({page}) =>{
  //acessar a página ler.ecordel.com.br
  await page.goto('https://ler.ecordel.com.br')

  //selecionar o input
  const input = page.locator('input[placeholder="Pesquisar cordel"]')

  //Digita no input
  await input.fill("Oração da Menina Benigna")

  const title = page.locator('span', {
    hasText: 'Oração da Menina Benigna'
  })
  await expect(title).toBeVisible()

  //clicar em um cordel
  await page.locator('button:text("Visualizar")').click()

  const cordel = page.locator('h3', {
    hasText: 'Oração da Menina Benigna'
  })

  await expect(cordel).toBeVisible()
})

test ('testar botao visualizar site', async ({page}) => {
  await page.goto("https://ler.ecordel.com.br")

  const botao = page.locator('button', {
    hasText:"Visite nosso site"
  })
  
  await botao.click()

  await expect(page).toHaveURL("https://ecordel.com.br/")

  const titulo = page.locator('h2:has-text("Cordel Para Todos")')

  await expect(titulo).toBeVisible()
})
