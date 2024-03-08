/**
 * UserAgent相关的hook
 * @returns 
 */
export const useUserAgent = () => {
    const userAgent = navigator.userAgent;
    const mobilePattern = /(iPhone;|Android.*Mobile)/;
    const isMobile = mobilePattern.test(userAgent);
    return {
        userAgent,
        isMobile
    }
}