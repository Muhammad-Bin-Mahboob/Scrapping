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
    await page.goto('https://www.saucedemo.com/', { waitUntil: 'load' });

    // Iniciar sesión
    await page.type('#user-name', 'standard_user');
    await page.type('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.waitForSelector('.inventory_list');

    // Extraer datos de productos
    const items = await page.evaluate(() => {
        const products = document.querySelectorAll('.inventory_item');
        return Array.from(products).map(product => {
            return {
                name: product.querySelector('.inventory_item_name')?.innerText || '',
                description: product.querySelector('.inventory_item_desc')?.innerText || '',
                image: product.querySelector('.inventory_item_img img')?.src || '',
                price: product.querySelector('.inventory_item_price')?.innerText || ''
            };
        });
    });

    console.log(items);

    await browser.close();
})();


