import camelcaseKeys from 'camelcase-keys';
const { token } = useAuth();

export const useFetchWithBaseURL: typeof useFetch = (request, opts?) => {
	return useFetch(request, {
		...opts,
		baseURL: useRuntimeConfig().public.baseURL,
		onRequest({ request, options }) {
			// Set the request headers
			if (token.value) {
				options.headers = { ...options.headers, Authorization: token.value };
			}
		},
		onResponse({ request, response, options }) {
			// 応答データの処理
			return {
				...response,
				data: camelcaseKeys(response._data),
			};
		},
	});
};
