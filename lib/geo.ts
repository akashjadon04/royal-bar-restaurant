export interface GeoPoint {
  lat: number;
  lng: number;
}

const R = 3958.8; // Earth radius in miles

export function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function isWithinDeliveryRadius(
  customerLat: number,
  customerLng: number,
  restaurantLat: number = 51.5074,
  restaurantLng: number = -0.1278,
  maxRadiusMiles: number = 10
): boolean {
  if (maxRadiusMiles <= 0) return false;
  const distance = haversineDistance(restaurantLat, restaurantLng, customerLat, customerLng);
  return distance <= maxRadiusMiles;
}

export async function validateDeliveryRadius(
  addressId: string,
  userId: string
): Promise<{ valid: boolean; distance?: number; error?: string }> {
  const { prisma } = await import('./prisma');

  const address = await prisma.address.findFirst({
    where: { id: addressId, userId },
  });

  if (!address) {
    return { valid: false, error: 'Address not found or access denied' };
  }

  const distance = haversineDistance(
    51.5074, -0.1278,
    Number(address.lat), Number(address.lng)
  );

  if (distance > 10) {
    return {
      valid: false,
      distance,
      error: `Address is ${distance.toFixed(1)} miles away. Maximum delivery radius is 10 miles.`,
    };
  }

  return { valid: true, distance };
}
