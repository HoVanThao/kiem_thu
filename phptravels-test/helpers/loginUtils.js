const login = async (page, email, password) => {
    await page.goto('https://phptravels.net/login');
    await page.locator('#email').type(email);
    await page.locator('#password').type(password);
    await page.click('button:has-text("Login")');
    await page.waitForURL('https://phptravels.net/dashboard', { timeout: 5000 }); // Chờ URL thay đổi thành dashboard
    await page.waitForSelector('.author-content', { timeout: 2000 });
    return await page.isVisible('.author-content'); // Kiểm tra xem phần tử author-content có hiển thị không
};

export default login;
