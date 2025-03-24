const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ 
        headless: false, 
        slowMo: 100,
        defaultViewport: null  
    });

    const page = await browser.newPage();
    await page.goto('https://www.amazon.es/s?k=philips+1000+series&crid=5N8HCFRVCS2&qid=1742814219&sprefix=%2Caps%2C151&xpid=W1EbHEC_lEnvp&ref=sr_pg_1', { waitUntil: 'load' });

    await page.waitForSelector('.s-main-slot .s-result-list .s-search-results .sg-row');

    

    await page.waitForNavigation();

    await browser.close();
})();