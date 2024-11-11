import { test, expect } from '@playwright/test';
import { getSheetData, writeTestResultLogin, writeTestResultRegister } from '../helpers/excelUtils.js';
import login from '../helpers/loginUtils.js';
import register from '../helpers/registerUtils.js';

// Kiểm thử chức năng Login
// test.describe('Login tests', () => {
//     const loginData = getSheetData('login');

//     loginData.forEach((row, index) => {
//         test(`Login test #${index + 1}`, async ({ page }) => {
//             const [email, password] = row;
//             let loginSuccess;

//             try {
//                 loginSuccess = await login(page, email, password);
//             } catch (error) {
//                 loginSuccess = false;
//             }


//             writeTestResultLogin('login', index, loginSuccess ? 'Passed' : 'Failed');
//             expect(loginSuccess).toBe(true);
//         });
//     });
// });

// Kiểm thử chức năng Register
test.describe('Register tests', () => {
    const registerData = getSheetData('register');

    registerData.forEach((row, index) => {
        test(`Register test #${index + 1}`, async ({ page }) => {
            const [firstName, lastName, country, phone, email, password] = row;
            let registerSuccess;

            try {
                registerSuccess = await register(page, firstName, lastName, country, phone, email, password);
            } catch (error) {
                registerSuccess = false;
            }
            writeTestResultRegister('register', index, registerSuccess ? 'Passed' : 'Failed');
            expect(registerSuccess).toBe(true);
        });
    });
});
