"use server";

// API Configuration
const API_URL = process.env.API_CNN_URL || "http://localhost:8000";

// Types
export interface ModelInfo {
  id: string;
  name: string;
}

export interface PredictionResult {
  class_name: string;
  confidence: number;
}

export interface PredictionResponse {
  model_id: string;
  model_name: string;
  image_url: string;
  predicted_class: string;
  confidence: number;
  probabilities: PredictionResult[];
  gradcam_url?: string | null;
}

export interface HealthCheckResponse {
  status: "ok" | "error";
  message?: string;
}

/**
 * Check if the FastAPI server is healthy and ready
 */
export async function checkServerHealth(): Promise<HealthCheckResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(`${API_URL}/health`, {
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.status === "ok") {
        return { status: "ok", message: "Server is online and ready" };
      } else {
        return { status: "error", message: "Server responded but status is not OK" };
      }
    } else {
      return { status: "error", message: "Server returned error status" };
    }
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { status: "error", message: "Server is starting, please wait approximately 3 minutes" };
    }
    return { status: "error", message: "Cannot connect to the API server" };
  }
}

/**
 * Fetch available models from the API
 */
export async function fetchModels(): Promise<{ models: ModelInfo[]; error?: string }> {
  try {
    const response = await fetch(`${API_URL}/get-models`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch models");
    }

    const data = await response.json();
    return { models: data.models || [] };
  } catch (err) {
    return {
      models: [],
      error: err instanceof Error ? err.message : "Failed to load models",
    };
  }
}

/**
 * Upload image file to the server
 */
export async function uploadImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  try {
    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Upload failed: ${data.error || "Unknown error"}`);
    }

    return { url: data.url };
  } catch (err) {
    console.error("Error uploading image:", err);
    return {
      error: err instanceof Error ? err.message : "Failed to upload image",
    };
  }
}

/**
 * Upload base64 image (for camera captures)
 */
export async function uploadBase64Image(
  base64Data: string,
  filename: string = "camera-capture.jpg"
): Promise<{ url?: string; error?: string }> {
  try {
    // Convert base64 to blob
    const base64Response = await fetch(base64Data);
    const blob = await base64Response.blob();

    const formData = new FormData();
    formData.append("file", blob, filename);

    return await uploadImage(formData);
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Failed to process image",
    };
  }
}

/**
 * Make prediction request
 */
export async function predictImage(
  imageUrl: string,
  modelId: string
): Promise<{ prediction?: PredictionResponse; error?: string }> {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_url: imageUrl,
        model_id: modelId,
      }),
    });

    if (!response.ok) {
      throw new Error("Prediction failed");
    }

    const data: PredictionResponse = await response.json();
    return { prediction: data };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Prediction failed",
    };
  }
}
