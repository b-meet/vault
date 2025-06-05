export interface Profile {
	id?: string;
	name: string;
	basicInfo: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		dateOfBirth: string;
	};
	address: {
		street: string;
		city: string;
		state: string;
		zipCode: string;
		country: string;
	};
	socialLinks: {
		linkedin: string;
		twitter: string;
		github: string;
		website: string;
	};
}
