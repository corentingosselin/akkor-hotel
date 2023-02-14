
/**
 * 
 * @param password 1 lowercase char, 1 uppercase char, 1 number, 1 special char (!@#\$%\^&\*), 8 chars min
 * @returns 
 */
export function isPasswordSecure(password: string) {
    const passwordRegex = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'
    );
    return passwordRegex.test(password);
}

export function isEmailValid(email: string) {
    const emailRegex = new RegExp(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    );
    return emailRegex.test(email);
}
