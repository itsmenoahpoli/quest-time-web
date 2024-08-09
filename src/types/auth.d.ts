export type Credentials = {
	email: string;
	password: string;
};

export type ProfileData = {
	account_type: "teacher" | "student";
	first_name: string;
	last_name: string;
	contact_number: string;
} & Credentials;
