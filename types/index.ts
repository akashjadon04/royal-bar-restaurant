import { OrderStatus, OrderType, UserRole } from '@prisma/client';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  basePrice: number;
  imageUrl?: string;
  isActive: boolean;
  isFeatured: boolean;
  prepTimeMin?: number;
  categoryId: string;
  category: Category;
  variants: MenuItemVariant[];
  tags: MenuItemTag[];
  allergens: MenuItemAllergen[];
  reviews: Review[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
  menuItems: MenuItem[];
}

export interface MenuItemVariant {
  id: string;
  menuItemId: string;
  label: string;
  priceDelta: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  colorHex: string;
}

export interface MenuItemTag {
  menuItemId: string;
  tagId: string;
  tag: Tag;
}

export interface Allergen {
  id: string;
  name: string;
  slug: string;
  iconUrl?: string;
}

export interface MenuItemAllergen {
  menuItemId: string;
  allergenId: string;
  allergen: Allergen;
}

export interface Order {
  id: string;
  userId: string;
  type: OrderType;
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  tip: number;
  total: number;
  stripePaymentId?: string;
  stripeClientSecret?: string;
  deliveryAddressId?: string;
  scheduledFor?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
  statusHistory: OrderStatusHistory[];
  review?: Review;
}

export interface OrderItem {
  id: string;
  orderId: string;
  menuItemId: string;
  variantId?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  menuItem: MenuItem;
}

export interface OrderStatusHistory {
  id: string;
  orderId: string;
  status: OrderStatus;
  note?: string;
  createdAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  orderId: string;
  menuItemId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  user: User;
  menuItem: MenuItem;
}

export interface CartItem {
  id: string;
  userId: string;
  menuItemId: string;
  variantId?: string;
  quantity: number;
  menuItem: MenuItem;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  county?: string;
  postcode: string;
  country: string;
  lat: number;
  lng: number;
  isDefault: boolean;
}

export interface CheckoutPayload {
  cart: {
    items: {
      menuItemId: string;
      variantId?: string;
      quantity: number;
    }[];
  };
  addressId: string;
  orderType: OrderType;
}
