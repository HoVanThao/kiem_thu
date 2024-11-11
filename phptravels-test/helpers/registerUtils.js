const register = async (page, firstName, lastName, country, phone, email, password) => {

    await page.goto('https://phptravels.net/signup');
    await page.locator('#firstname').type(firstName);
    await page.locator('#last_name').type(lastName);

    // Chờ dropdown hiển thị
    await page.waitForSelector('select[name="phone_country_code"]');

    // Lấy giá trị value tương ứng với label
    const countryValue = await page.evaluate((country) => {
        const selectElement = document.querySelector('select[name="phone_country_code"]');
        const options = Array.from(selectElement.options);
        const option = options.find(opt => opt.label === country);
        return option ? option.value : null;
    }, country);

    if (countryValue) {
        await page.locator('select[name="phone_country_code"]').selectOption({ value: countryValue });
    } else {
        throw new Error(`Country "${country}" not found in the dropdown`);
    }


    await page.locator('#phone').type(phone);
    await page.locator('#user_email').type(email);
    await page.locator('#password').type(password);


    // Tích vào ô "I'm not a robot"
    await page.waitForSelector('.g-recaptcha');
    await page.evaluate(() => {
        const recaptcha = document.querySelector('.g-recaptcha');
        if (recaptcha) {
            const checkbox = recaptcha.shadowRoot.querySelector('.recaptcha-checkbox-border');
            if (checkbox) {
                checkbox.click();
            }
        }
    });

    // Chờ một chút để reCAPTCHA xử lý
    await page.waitForTimeout(3000);

    await page.click('button:has-text("Signup")');

    await page.waitForURL('https://phptravels.net/signup_success', { timeout: 5000 });

    await page.waitForSelector('.rounded.border.p-3.text-center.pt-5.pb-5.bg-light', { timeout: 3000 });

    const registerSuccess = await page.isVisible('.rounded.border.p-3.text-center.pt-5.pb-5.bg-light');

    return registerSuccess;
}



// const register = async (page, firstName, lastName, country, phone, email, password) => {
//     await page.goto('https://phptravels.net/signup');
//     await page.waitForTimeout(2000); // Chờ 2 giây để quan sát

//     await page.locator('#firstname').type(firstName);
//     await page.waitForTimeout(1000); // Chờ 1 giây để quan sát

//     await page.locator('#last_name').type(lastName);
//     await page.waitForTimeout(1000); // Chờ 1 giây để quan sát

//     // Chờ dropdown hiển thị
//     await page.waitForSelector('#signup > div > div > div > div.row > div:nth-child(1) > div > div', { timeout: 5000 });
//     await page.selectOption('#phone_country_code', { label: country });
//     await page.waitForTimeout(1000); // Chờ 1 giây để quan sát

//     await page.locator('#phone').type(phone);
//     await page.waitForTimeout(1000); // Chờ 1 giây để quan sát

//     await page.locator('#user_email').type(email);
//     await page.waitForTimeout(1000); // Chờ 1 giây để quan sát

//     await page.locator('#password').type(password);
//     await page.waitForTimeout(1000); // Chờ 1 giây để quan sát

//     await page.click('button:has-text("Signup")');
//     await page.waitForTimeout(2000); // Chờ 2 giây để quan sát

//     // Chờ URL thay đổi thành URL của trang dashboard
//     await page.waitForURL('https://phptravels.net/signup_success', { timeout: 5000 });
//     await page.waitForSelector('.rounded .border .p-3 .text-center .pt-5 .pb-5 .bg-light', { timeout: 3000 });
//     await page.waitForTimeout(2000); // Chờ 2 giây để quan sát

//     const registerSuccess = await page.isVisible('.rounded .border .p-3 .text-center .pt-5 .pb-5 .bg-light');
//     return registerSuccess;
// };

export default register;