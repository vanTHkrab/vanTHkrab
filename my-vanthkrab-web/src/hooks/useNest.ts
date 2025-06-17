interface Options {
    method?: string;
    headers?: Record<string, string>;
    body?: string | Record<string, any>;
    params?: Record<string, string>;
}

async function UseNest(url: string, options: Options = {}): Promise<any> {
    const { NEXT_PUBLIC_NEST_URL, NEXT_PUBLIC_NEST_KEY } = process.env;
    if (!NEXT_PUBLIC_NEST_URL || !NEXT_PUBLIC_NEST_KEY) {
        throw new Error("Nest URL or Key is not defined in environment variables.");
    }

    const apiUrl = `${NEXT_PUBLIC_NEST_URL}${url}`;
    const headers: Record<string, string> = {
        'Authorization': `Bearer ${NEXT_PUBLIC_NEST_KEY}`,
    };

    if (options.headers) {
        Object.assign(headers, options.headers);
    }

    const queryParams = new URLSearchParams(options.params || {}).toString();
    const fullUrl = queryParams ? `${apiUrl}?${queryParams}` : apiUrl;

    const fetchOptions: RequestInit = {
        method: options.method || 'GET',
        headers: headers,
    };

    // Only add body for methods that support it
    if (options.body && ['POST', 'PUT', 'PATCH'].includes(fetchOptions.method?.toUpperCase() || '')) {
        fetchOptions.body = typeof options.body === 'string'
            ? options.body
            : JSON.stringify(options.body);
    }

    const response = await fetch(fullUrl, fetchOptions);

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nest API request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    try {
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to parse JSON response: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export default UseNest;