export interface UserSession {
	id: string,
	first_name: string,
	last_name: string,
	email: string,
	phone: string,
	password: string,
	company_id: string,
	is_completed?: boolean,
}