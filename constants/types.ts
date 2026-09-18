export type AppTab = {
    name: string;
    title: string;
    icon: string;
}

export type UpcomingSubscription = {
    id: string;
    icon: string;
    name: string;
    price: number;
    currency: string;
    daysLeft: number;
};

export type Subscription = {
    id: string;
    icon: string;
    name: string;
    plan: string;
    category: string;
    paymentMethod: string;
    status: string;
    startDate: string;
    price: number;
    currency: string;
    billing: string;
    renewalDate: string;
    color: string;
};

export type TabIcon = {
    focused: boolean;
    icon: string;
};