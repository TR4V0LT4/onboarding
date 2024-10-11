export interface Marketplace {
    id: string;
    logo: string | null;
    name: string | null | undefined;
    remise: string | null | undefined;
    type: "blink" | "pharmacy" | "wholesaler" | "laboratory" | "partner" | "other" | null | undefined;
    endDate: string | null;
}