const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ 
        headless: false, 
        slowMo: 100,
        defaultViewport: null
    });

    try {
        const page = await browser.newPage();
        await page.goto('https://www.saucedemo.com/', { waitUntil: 'load' });

        await page.type('#user-name', 'standard_user');
        await page.type('#password', 'secret_sauce');
        await page.click('#login-button');

        await page.waitForSelector('.inventory_list');

        const items = await page.evaluate(() => {
            const products = document.querySelectorAll('.inventory_item');
            const data = [];
            
            products.forEach(product => {
                data.push({
                    name: product.querySelector('.inventory_item_name')?.innerText.trim() || '',
                    description: product.querySelector('.inventory_item_desc')?.innerText.trim() || '',
                    image: product.querySelector('.inventory_item_img img')?.src || '',
                    price: product.querySelector('.inventory_item_price')?.innerText.trim() || ''
                });
            });

            return data;
        });

        console.log(items);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
})();



