"use server";

export interface PostWeatherData {
    PROV_ID: number;
    month_id: number;
}

export interface PostWeatherDataResponse {
    prediction: number;
    probability: number | null;
    province: {
        id: number;
        name: string
    };
    month: {
        id: number;
        name: string
    };
    features_used: {
        province_id: number;
        month_sin: number;
        month_cos: number
    };
}

const BASE_URL = process.env.WEATHER_API_URL || "http://localhost:8000";

export async function getHealthData() {
    const res = await fetch(`${BASE_URL}/api/health`, {method: "GET"});
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

export async function getProvinceData() {
    const res = await fetch(`${BASE_URL}/api/provinces`, {method: "GET"});
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

export async function getMonthData() {
    const res = await fetch(`${BASE_URL}/api/months`, {method: "GET"});
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

export async function postWeatherData(
    data: PostWeatherData
): Promise<PostWeatherDataResponse> {
    const res = await fetch(`${BASE_URL}/api/predict`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}
