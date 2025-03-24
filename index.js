// una app que entra en una pagina web 
// genera un usuario y envia un formulario

const puppeteer = require('puppeteer');

function generateRandomString(length, chars) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

function generateRandomUsername() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    return generateRandomString(6, letters) + generateRandomString(3, numbers);
}

function generateRandomPassword() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    return generateRandomString(12, chars);
}

(async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
    const page = await browser.newPage();

    await page.goto('https://www.saucedemo.com', { waitUntil: 'load' });

    const randomUsername = generateRandomUsername();
    const randomEmail = `${randomUsername}@gmail.com`;
    const randomPassword = generateRandomPassword();

    await page.waitForSelector('#username');
    await page.waitForSelector('#email');
    await page.waitForSelector('#password');
    await page.waitForSelector('#confirm_password');
    await page.waitForSelector('#submit');

    await page.type('#username', randomUsername);
    await page.type('#email', randomEmail);
    await page.type('#password', randomPassword);
    await page.type('#confirm_password', randomPassword);

    await page.click('#submit');

    // Va esperar a que la página cambie después de enviar el formulario.
    await page.waitForNavigation();

    console.log(`Usuario registrado: ${randomUsername} - ${randomEmail} - ${randomPassword}`);
    // Usuario registrado: qwerty12 - qwerty12@gmail.com - Ab3!xY@fL9

    await browser.close();
})();

