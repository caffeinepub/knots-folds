import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactMessage {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface Order {
    id: bigint;
    customerName: string;
    status: OrderStatus;
    productId: bigint;
    address: string;
    timestamp: bigint;
    quantity: bigint;
    phone: string;
}
export interface UserProfile {
    name: string;
    email: string;
}
export interface Product {
    id: bigint;
    stockQuantity: bigint;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    price: number;
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    delivered = "delivered",
    processing = "processing"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignRole(user: Principal, role: UserRole): Promise<void>;
    createProduct(name: string, description: string, price: number, stockQuantity: bigint, imageUrl: string, category: string): Promise<{
        id: bigint;
    }>;
    deleteContactMessage(msgId: bigint): Promise<void>;
    deleteProduct(productId: bigint): Promise<void>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllOrders(): Promise<Array<Order>>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactMessage(msgId: bigint): Promise<ContactMessage>;
    getMyRole(): Promise<UserRole>;
    getOrder(orderId: bigint): Promise<Order>;
    getProduct(productId: bigint): Promise<Product>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(customerName: string, phone: string, address: string, productId: bigint, quantity: bigint): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchContactMessages(searchText: string): Promise<Array<ContactMessage>>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
    updateOrderStatus(orderId: bigint, status: OrderStatus): Promise<void>;
    updateProduct(productId: bigint, name: string, description: string, price: number, stockQuantity: bigint, imageUrl: string, category: string): Promise<void>;
}
