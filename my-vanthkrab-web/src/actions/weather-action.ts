export interface PostWeatherData {
    PROV_ID: number;
    month_id: number;
}

export interface PostWeatherDataResponse {
    prediction: number;
    probability: number | null;
    province: {
        id: number;
        name: string;
    };
    month: {
        id: number;
        name: string;
    };
    features_used: {
        province_id: number;
        month_sin: number;
        month_cos: number;
    };
}

export class WeatherAction {
    static readonly type: string = 'weather';
    static readonly url: string = process.env.NEXT_PUBLIC_WEATHER_API_URL || 'http://localhost:8000';
    static async getHealthData() {
        const res = await fetch(`${this.url}/api/heath`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await res.json();
    }

    static async getProvinceData() {
        const res = await fetch(`${this.url}/api/provinces`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await res.json();
    }

    static async getMonthData() {
        const res = await fetch(`${this.url}/api/months`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await res.json();
    }

    static async postWeatherData(data: PostWeatherData): Promise<PostWeatherDataResponse> {
        const res = await fetch(`${this.url}/api/predict`, {
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