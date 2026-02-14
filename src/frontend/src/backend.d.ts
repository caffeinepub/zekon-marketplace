import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    sellerPrincipal: Principal;
    name: string;
    createdAt: Time;
    imageUrl: string;
    price: bigint;
}
export type Time = bigint;
export type PaymentMethod = {
    __kind__: "creditCard";
    creditCard: string;
} | {
    __kind__: "cashOnDelivery";
    cashOnDelivery: null;
} | {
    __kind__: "bankTransfer";
    bankTransfer: string;
} | {
    __kind__: "paypal";
    paypal: string;
};
export interface Order {
    id: bigint;
    paymentMethod: PaymentMethod;
    createdAt: Time;
    buyerProfileSnapshot: UserProfile;
    productSnapshot: Product;
    buyerPrincipal: Principal;
    shippingAddress: Address;
}
export interface UserProfile {
    displayName: string;
    role: Variant_seller_buyer;
    shippingAddress?: Address;
    phoneNumber?: string;
    paymentMethods: Array<PaymentMethod>;
}
export interface Address {
    zip: string;
    street: string;
    country: string;
    city: string;
    state: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_seller_buyer {
    seller = "seller",
    buyer = "buyer"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createOrder(productId: bigint, shippingAddress: Address, paymentMethod: PaymentMethod): Promise<Order>;
    createProduct(name: string, price: bigint, imageUrl: string): Promise<Product>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listAllProducts(): Promise<Array<Product>>;
    listMyOrders(): Promise<Array<Order>>;
    listMyProducts(): Promise<Array<Product>>;
    listOrdersForMyProducts(): Promise<Array<Order>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
