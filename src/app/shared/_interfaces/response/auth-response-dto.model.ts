export interface AuthResponseDto {
    userName: string;
    isAuthSuccessful: boolean;
    errorMessage: string;
    token: string;
}