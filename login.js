// una app que entra en una pagina web 
// genera un usuario y envia un formulario

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ 
        headless: false, 
        slowMo: 100,
        defaultViewport: false
    });

    const page = await browser.newPage();
    await page.goto('https://www.saucedemo.com', { waitUntil: 'load' });

    await page.waitForSelector('#user-name');
    await page.waitForSelector('#password');
    await page.waitForSelector('#login-button');

    await page.type('#user-name', 'standard_user');
    await page.type('#password', 'secret_sauce');

    await page.click('#login-button');

    // Espera un elemento específico después del login
    await page.waitForSelector('.inventory_list'); 

    console.log('Inicio de sesión exitoso');

    await browser.close();
})();
