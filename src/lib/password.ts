import argon2 from 'argon2';

export async function hashPassword(password: string): Promise<string> {
    const hash = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        hashLength: 50,
    });
    return hash;
}

export async function verifyPassword(password: string, hashStr: string): Promise<boolean> {
    try {
        if (await argon2.verify(hashStr, password)) {
            return true;
        } else {
            return false
        }
    } catch (err) {
        return false;
    }
}