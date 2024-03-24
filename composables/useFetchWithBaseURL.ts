const { $camelcaseKeys } = useNuxtApp();

export const useFetchWithBaseURL: typeof useFetch = (request, opts?) => {
	const config = useRuntimeConfig();

	return useFetch(request, {
		...opts,
		baseURL: config.public.baseURL,
		onResponse({ response }) {
			// 応答データの処理
			return {
				...response,
				data: $camelcaseKeys(response._data),
			};
		},
	});
};
