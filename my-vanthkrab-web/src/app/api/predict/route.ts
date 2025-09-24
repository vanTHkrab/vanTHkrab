import { NextRequest, NextResponse } from 'next/server';
import { getProvinceName } from '@/utils/provinces';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { PROV_ID, month_sin, month_cos } = body;

    // Validate input
    if (typeof PROV_ID !== 'number' || typeof month_sin !== 'number' || typeof month_cos !== 'number') {
      return NextResponse.json(
        { error: 'Invalid input parameters' },
        { status: 400 }
      );
    }

    // Mock prediction logic (replace with actual ML model)
    // Simple logic: predict rain based on month and province
    // Summer months (March-May) and provinces in the south tend to have less rain
    const month = Math.atan2(month_sin, month_cos) * 12 / (2 * Math.PI);
    const normalizedMonth = ((month % 12) + 12) % 12 + 1;
    
    let rainProbability = 0.5; // Base probability
    
    // Adjust for month (rainy season June-October has higher probability)
    if (normalizedMonth >= 6 && normalizedMonth <= 10) {
      rainProbability += 0.3;
    } else if (normalizedMonth >= 3 && normalizedMonth <= 5) {
      rainProbability -= 0.2;
    }
    
    // Adjust for province (southern provinces tend to have more rain)
    if (PROV_ID >= 80 && PROV_ID <= 96) {
      rainProbability += 0.2;
    } else if (PROV_ID >= 30 && PROV_ID <= 49) {
      rainProbability -= 0.1; // Northeast tends to be drier in some months
    }
    
    // Add some randomness
    rainProbability += (Math.random() - 0.5) * 0.3;
    
    // Ensure probability is between 0 and 1
    rainProbability = Math.max(0, Math.min(1, rainProbability));
    
    const pred = rainProbability > 0.5 ? 1 : 0;
    const prov = getProvinceName(PROV_ID);

    return NextResponse.json({
      pred,
      prov,
      probability: rainProbability, // Additional info for debugging
      month: normalizedMonth // Additional info for debugging
    });
  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}