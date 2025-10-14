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

test ('dark mode', async ({page}) => {
  await page.goto("https://ler.ecordel.com.br")

  await page.locator('[aria-label="Alterar esquema de cores"]').click()

  await expect(page.locator('button').nth(0)).toHaveAttribute('class', /css-670439/)

})

test('usuário logado com sucesso', async ({page}) => {
  await page.goto("https://ler.ecordel.com.br")

  const botao = page.locator('button', {
    hasText:"Login"
  })

  await botao.click()

  await expect(page).toHaveURL("https://ler.ecordel.com.br/login")

  await page.locator('[id = "username"]').fill(process.env.USER_NAME)
  await page.locator('[id = "password"]').fill(process.env.PASSWORD)

  const botaoLogin = page.locator('button', {
    hasText:"Sign In"
  })

  await botaoLogin.click()

  const botaoMenu = page.locator('button', {
    hasText:"Revisão de Cordéis"
  })

  await expect(botaoMenu).toBeVisible()

})

test('usuário insere credenciais erradas', async ({page}) => {
  await page.goto("https://ler.ecordel.com.br")

  const botao = page.locator('button', {
    hasText:"Login"
  })

  await botao.click()

  await expect(page).toHaveURL("https://ler.ecordel.com.br/login")

  await page.locator('[id = "username"]').fill('ana')
  await page.locator('[id = "password"]').fill('_2_3ad2')

  const botaoLogin = page.locator('button', {
    hasText:"Sign In"
  })

  await botaoLogin.click()

  const credenciaisInvalidas = page.locator('div.MuiAlert-message', {
   hasText:"credenciais inválidas"
  })

  await expect(credenciaisInvalidas).toBeVisible();
  
})