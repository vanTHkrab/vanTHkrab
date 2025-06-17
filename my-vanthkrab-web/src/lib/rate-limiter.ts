// Rate Limiter for API requests

class RateLimiter {
    private requests: Map<string, { count: number; lastRequest: number }> = new Map();
    private readonly limit: number;
    private readonly windowMs: number;

    constructor(limit = 100, windowMs = 60 * 1000) {
        this.limit = limit;
        this.windowMs = windowMs;
    }

    public isAllowed(ip: string): boolean {
        const now = Date.now();
        const requestData = this.requests.get(ip) || { count: 0, lastRequest: now };

        if (now - requestData.lastRequest > this.windowMs) {
        // Reset the count if the time window has passed
        requestData.count = 1;
        requestData.lastRequest = now;
        } else {
        // Increment the count
        requestData.count += 1;
        }

        // Update the map with the new data
        this.requests.set(ip, requestData);

        // Check if the limit has been exceeded
        return requestData.count <= this.limit;
    }
}

const rateLimiter = new RateLimiter()
export default rateLimiter
