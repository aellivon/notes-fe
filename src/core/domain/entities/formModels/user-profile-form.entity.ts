export interface IFormUserProfileFields {
    avatarURL: File | undefined
    firstName: string
    lastName: string
    email: string
    furiganaFirstName?: string
    furiganaLastName?: string
    position?: string
    dateJoined?: string
}  

export interface IFormUserProfileErrors {
    nonFieldErrors?: string,
    avatarURL?: string,
    firstName?: string
    lastName?: string
    email?: string
    furiganaFirstName?: string
    furiganaLastName?: string
    position?: string
    dateJoined?: string
}
