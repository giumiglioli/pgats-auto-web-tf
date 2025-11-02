import { faker } from '@faker-js/faker';

export function getTimestamp() {
    return new Date().getTime();
}

export function getRandomEmail() {
    return `qagmtester-${getTimestamp()}@testing.com`;
}

export function getRandomBirthday() {
    const day = String(Math.floor(Math.random() * 28) + 1); // 1-28 to avoid issue on February month
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[Math.floor(Math.random() * months.length)];
    const year = String(Math.floor(Math.random() * (2004 - 1950 + 1)) + 1950); // 1950-2004

    return { day, month, year };
}

export function getRandomGender() {
    const genders = ['Mr', 'Mrs'];
    const index = Math.floor(Math.random() * genders.length);
    return genders[index];
}

export function getRandomPhone() {
    return faker.phone.number('###########'); // 11 digits
}