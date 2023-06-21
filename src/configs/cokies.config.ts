export type CookiesConfigType = {
    name: string
    options: {
        [key: string]: string | boolean
    }
}

export const cookiesConfig: CookiesConfigType = {
    name: 'jwt',
    options: {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    },
} as const

export const tokenConfig = {
    expiresIn: '7d',
} as const
