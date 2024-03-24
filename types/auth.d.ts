type LocalSettionDataType = {
	id: string;
	email: string;
};

declare module '#auth' {
	interface SessionData extends LocalSettionDataType {}
}
