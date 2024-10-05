export interface Orders {
	id: number,
	state: "delivered" | "partially delivered" | "not delivered",
	reference: string,
	supplier: string,
	date: string,
	units: number,
	amount: string,
	statuse: string,
	connectivity: string
}
