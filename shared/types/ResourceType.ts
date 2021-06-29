export interface ResourceType {
    type: string; // food, ambulance, vaccines
    organization?: string;
    country: string;
    state: string;
    city: string;
    postalCode: number;
    addressOne: string;
    adderssTwo?: string;
    description?: string;
    contactNo: string;
    contactEmail: string;
    addedBy: {
        email: string;
    }
}