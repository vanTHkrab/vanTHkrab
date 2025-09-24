interface PostWeatherData {
    PROV_ID: number;
    month_sin: number;
    month_cos: number;
}

interface PostWeatherDataResponse {
    pred: number;
    prob: string;
}

export class WeatherAction {
    static readonly type: string = 'weather';
    static readonly url: string = process.env.NEXT_PUBLIC_WEATHER_API_URL || 'http://localhost:8000';
    static async getHealthData() {
        const res = await fetch(`${this.url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await res.json();
    }

    static async postWeatherData(data: PostWeatherData): Promise<PostWeatherDataResponse> {
        const res = await fetch(`${this.url}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    }
}