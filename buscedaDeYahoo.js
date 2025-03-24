const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ 
        headless: false, 
        slowMo: 100,
        defaultViewport: null  
    });

    const page = await browser.newPage();
    await page.goto('https://espanol.yahoo.com', { waitUntil: 'load' });

    await page.waitForSelector('input[name="p"]');

    await page.type('input[name="p"]', 'invincible');

    await page.keyboard.press('Enter');

    await page.waitForNavigation();

    await browser.close();
})();

