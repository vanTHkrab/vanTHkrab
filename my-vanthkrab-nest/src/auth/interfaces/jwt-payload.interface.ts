export interface JwtPayload {
    sub: number;        // Subject (User ID) - Standard JWT claim
    email: string;      // User email
    role: string;       // User role (USER, ADMIN, etc.)
    username?: string;  // Optional: Username
    iat?: number;       // Issued at (automatically added by JWT)
    exp?: number;       // Expiration time (automatically added by JWT)
}

// Extended payload with more user information
export interface ExtendedJwtPayload extends JwtPayload {
    firstName?: string;
    lastName?: string;
    isActive: boolean;
    permissions?: string[];
    sessionId?: string;
}