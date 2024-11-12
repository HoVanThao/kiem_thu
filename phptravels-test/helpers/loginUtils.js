const login = async (page, email, password) => {
    await page.goto('https://phptravels.net/login');
    await page.fill('#email', email);
    await page.fill('#password', password);
    await page.click('button:has-text("Login")');

    try {
        await page.waitForURL('https://phptravels.net/dashboard', { timeout: 1000 });
        await page.waitForSelector('.author-content', { timeout: 1000 });
        return await page.isVisible('.author-content');;
    } catch {
        return false;
    }
};

export default login;
