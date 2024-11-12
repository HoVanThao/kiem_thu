
const register = async (page, firstName, lastName, country, phone, email, password) => {
    await page.goto('https://phptravels.net/signup');

    try {
        await page.fill('#firstname', firstName);
        await page.fill('#last_name', lastName);

        await page.waitForSelector('select[name="phone_country_code"]');
        await page.selectOption('select[name="phone_country_code"]', {
            value: String(country),
        });

        await page.locator('#phone').fill(String(phone));
        await page.fill('#user_email', email);
        await page.fill('#password', password);

        await page.evaluate(() => {
            const submitButton = document.getElementById("submitBTN");
            if (submitButton) {
                submitButton.removeAttribute("disabled");
            }
        });


        await page.click("#submitBTN");

        await page.waitForURL('https://phptravels.net/signup_success', { timeout: 1000 });
        // Đợi trang tải lại và tìm thông báo thành công
        await page.waitForSelector('.rounded.border.p-3.text-center.pt-5.pb-5.bg-light', { timeout: 1000 });

        // Kiểm tra nếu thông báo thành công xuất hiện
        const isRegistrationSuccess = await page.isVisible('.rounded.border.p-3.text-center.pt-5.pb-5.bg-light');

        return isRegistrationSuccess;

    } catch (error) {
        return false;
    }
};

export default register;