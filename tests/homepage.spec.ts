import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://ler.ecordel.com.br');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/e-cordel/);
});

test('input test', async ({ page }) => {
  await page.goto('https://ler.ecordel.com.br');

  //selecionar o input
  const input = page.locator('input[placeholder="Pesquisar cordel"]')

  //Digita no input
  await input.fill("Oração da Menina Benigna")

  const title = page.locator('span', {
    hasText: 'Oração da Menina Benigna'
  })

  await expect(title).toBeVisible()
  

});
