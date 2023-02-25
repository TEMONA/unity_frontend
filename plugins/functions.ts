import { Context } from '@nuxt/types'
import { Plugin } from '@nuxt/types'

interface customObject {
	[key: string]: any
}

export interface functions {
	$toCamelCase(str: string): string
	$toCamelCaseObject(obj: customObject): customObject
	$toCamelCaseObjectArray(obj: customObject[]): customObject[]
	$toSnakeCase(str: string): string
	$toSnakeCaseObject(obj: customObject): customObject
	$toSnakeCaseObjectArray(str: customObject[]): customObject[]
}

declare module 'vue/types/vue' {
	interface Vue extends functions {}
}

declare module '@nuxt/types' {
	interface Context extends functions {}
}

declare module 'vuex/types/index' {
	interface Store<S> extends functions {}
}

const myFunctions: Plugin = (context: Context, inject: any) => {
	/**
	 * 文字列をスネークケースからキャメルケースにする関数
	 *
	 * @param str スネークケースの文字列
	 * @returns キャメルケースの文字列
	 */
	const toCamelCase: functions['$toCamelCase'] = (str) => {
		return str
			.split('_')
			.map(function (word, index) {
				if (index === 0) {
					return word.toLowerCase()
				}
				return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
			})
			.join('')
	}
	inject('toCamelCase', toCamelCase)

	/**
	 * オブジェクトのキーをスネークケースからキャメルケースにする関数
	 *
	 * @param obj キーがスネークケースのオブジェクト
	 * @returns キーがキャメルケースのオブジェクト
	 */
	const toCamelCaseObject: functions['$toCamelCaseObject'] = (obj) => {
		const result: any = {}
		Object.keys(obj).forEach((key: string) => {
			return (result[toCamelCase(key)] = obj[key])
		})
		return result
	}
	inject('toCamelCaseObject', toCamelCaseObject)

	/**
	 * オブジェクト配列のキーをスネークケースからキャメルケースにする関数
	 *
	 * @param obj キーがスネークケースのオブジェクトが入った配列
	 * @returns キーがキャメルケースのオブジェクトが入った配列
	 */
	const toCamelCaseObjectArray: functions['$toCamelCaseObjectArray'] = (
		args,
	) => {
		return args.map((item: customObject) => {
			return toCamelCaseObject(item)
		})
	}
	inject('toCamelCaseObjectArray', toCamelCaseObjectArray)

	/**
	 * 文字列をキャメルケースからスネークケースにする関数
	 *
	 * @param str キャメルケースの文字列
	 * @returns スネークケースの文字列
	 */
	const toSnakeCase: functions['$toSnakeCase'] = (str) => {
		return str.replace(/([A-Z])/g, function (s) {
			return '_' + s.charAt(0).toLowerCase()
		})
	}
	inject('toSnakeCase', toSnakeCase)

	/**
	 * オブジェクトのキーをキャメルケースからスネークケースにする関数
	 *
	 * @param obj キーがキャメルケースのオブジェクト
	 * @returns キーがスネークケースのオブジェクト
	 */
	const toSnakeCaseObject: functions['$toSnakeCaseObject'] = (obj) => {
		const result: any = {}
		Object.keys(obj).forEach((key: string) => {
			return (result[toSnakeCase(key)] = obj[key])
		})
		return result
	}
	inject('toSnakeCaseObject', toSnakeCaseObject)

	/**
	 * オブジェクト配列のキーをキャメルケースからスネークケースにする関数
	 *
	 * @param obj キーがキャメルケースのオブジェクトが入った配列
	 * @returns キーがスネークケースのオブジェクトが入った配列
	 */
	const toSnakeCaseObjectArray: functions['$toSnakeCaseObjectArray'] = (
		args,
	) => {
		return args.map((item: any) => {
			return toSnakeCaseObject(item)
		})
	}
	inject('toSnakeCaseObjectArray', toSnakeCaseObjectArray)
}

export default myFunctions
