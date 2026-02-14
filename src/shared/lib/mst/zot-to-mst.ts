import { z } from 'zod';
import { types, IAnyType, IType, Instance } from 'mobx-state-tree';

// --- Опции конвертации ---
export interface ZodToMstOptions {
	/** Логировать предупреждения о неподдерживаемых типах */
	logWarnings?: boolean;
	/** Использовать types.frozen() для неподдерживаемых типов вместо ошибки */
	fallbackToFrozen?: boolean;
}

const defaultOptions: ZodToMstOptions = {
	logWarnings: true,
	fallbackToFrozen: true,
};

/**
 * Рекурсивно конвертирует Zod схему в MST модель.
 *
 * @param schema Zod-схема
 * @param name Имя модели (важно для отладки и types.model)
 * @param options Опции конвертации
 */
export function zodToMst<T extends z.ZodTypeAny>(
	schema: T,
	name: string = 'AutoModel',
	options: ZodToMstOptions = defaultOptions,
): IType<z.input<T>, z.input<T>, z.output<T>> {
	const opts = { ...defaultOptions, ...options };
	const def = schema._def;
	const typeName = def.typeName as string;

	let result: IAnyType;

	switch (typeName) {
		// --- Примитивы ---
		case 'ZodString':
			result = types.string;
			break;

		case 'ZodNumber':
			result = types.number;
			break;

		case 'ZodBoolean':
			result = types.boolean;
			break;

		case 'ZodDate':
			result = types.Date;
			break;

		case 'ZodNaN':
			// NaN можно представить как число или frozen
			result = types.frozen();
			break;

		case 'ZodUndefined': // Исправлена опечатка
			result = types.undefined;
			break;

		case 'ZodNull':
			result = types.null;
			break;

		// --- Спец-типы ---
		case 'ZodBigInt':
		case 'ZodSymbol':
			// BigInt и Symbol не сериализуются в JSON, используем frozen
			if (opts.logWarnings) {
				console.warn(
					`${typeName} at "${name}" converted to types.frozen(). MST works with JSON snapshots.`,
				);
			}
			result = types.frozen();
			break;

		case 'ZodAny':
		case 'ZodUnknown':
			result = types.frozen();
			break;

		case 'ZodVoid':
			result = types.undefined;
			break;

		case 'ZodNever':
			// Never type - не должен принимать никаких значений
			result = types.undefined; // или можно бросить ошибку
			break;

		// --- Литералы ---
		case 'ZodLiteral':
			result = types.literal(def.value);
			break;

		// --- Объекты ---
		case 'ZodObject': {
			const shape = def.shape(); // В новых версиях Zod это метод
			const modelProps: Record<string, IAnyType> = {};

			for (const key in shape) {
				if (Object.prototype.hasOwnProperty.call(shape, key)) {
					modelProps[key] = zodToMst(shape[key], `${name}_${key}`, opts);
				}
			}

			result = types.model(name, modelProps);
			break;
		}

		// --- Массивы ---
		case 'ZodArray':
			result = types.array(zodToMst(def.type, `${name}_Item`, opts));
			break;

		// --- Кортежи ---
		case 'ZodTuple': {
			const items = def.items as z.ZodTypeAny[];

			if (items.length === 0) {
				result = types.array(types.frozen());
			} else {
				const unionTypes = items.map((item, idx) =>
					zodToMst(item, `${name}_T${idx}`, opts),
				);

				// Поддержка rest элементов (вариативные кортежи)
				if (def.rest) {
					unionTypes.push(zodToMst(def.rest, `${name}_Rest`, opts));
				}

				result = types.array(types.union(...unionTypes));
			}
			break;
		}

		// --- Enums ---
		case 'ZodEnum': {
			const values = def.values as readonly [string, ...string[]];
			result = types.enumeration(name, values);
			break;
		}

		case 'ZodNativeEnum': {
			// Native TypeScript enum
			const enumValues = Object.values(def.values);
			result = types.enumeration(
				name,
				enumValues.filter((v) => typeof v === 'string'),
			);
			break;
		}

		// --- Объединения ---
		case 'ZodUnion': {
			const options = (def.options as z.ZodTypeAny[]).map((opt, idx) =>
				zodToMst(opt, `${name}_U${idx}`, opts),
			);
			result = types.union(...options);
			break;
		}

		case 'ZodDiscriminatedUnion': {
			const options = Array.from(def.options.values() as Iterable<z.ZodTypeAny>).map(
				(opt, idx) => zodToMst(opt, `${name}_DU${idx}`, opts),
			);
			result = types.union(...options);
			break;
		}

		// --- Пересечения ---
		case 'ZodIntersection': {
			// Пересечение в MST можно эмулировать через compose
			// Но это работает только для моделей
			const left = zodToMst(def.left, `${name}_Left`, opts);
			const right = zodToMst(def.right, `${name}_Right`, opts);

			// Проверяем, что оба типа - модели
			if (left.name === 'AnonymousModel' || right.name === 'AnonymousModel') {
				result = types.union(left, right);
			} else {
				if (opts.logWarnings) {
					console.warn(
						`ZodIntersection at "${name}" can only merge models in MST. Using frozen.`,
					);
				}
				result = types.frozen();
			}
			break;
		}

		// --- Опциональность и Nullable ---
		case 'ZodOptional':
			result = types.maybe(zodToMst(def.innerType, name, opts));
			break;

		case 'ZodNullable':
			result = types.maybeNull(zodToMst(def.innerType, name, opts));
			break;

		// --- Default значения ---
		case 'ZodDefault': {
			const innerType = zodToMst(def.innerType, name, opts);
			// MST поддерживает default через types.optional
			result = types.optional(innerType, def.defaultValue());
			break;
		}

		// --- Records и Maps ---
		case 'ZodRecord': {
			const valueType = zodToMst(def.valueType, `${name}_Value`, opts);
			result = types.map(valueType);
			break;
		}

		case 'ZodMap':
			if (opts.logWarnings) {
				console.warn(
					`ZodMap at "${name}" converted to types.frozen(). MST doesn't support native Maps.`,
				);
			}
			result = types.frozen();
			break;

		case 'ZodSet':
			if (opts.logWarnings) {
				console.warn(
					`ZodSet at "${name}" converted to types.frozen(). MST doesn't support native Sets.`,
				);
			}
			result = types.frozen();
			break;

		// --- Эффекты и трансформации ---
		case 'ZodEffects':
			// Игнорируем refinements, transforms и preprocessors
			// Берем только базовую схему
			result = zodToMst(def.schema, name, opts);
			break;

		case 'ZodCatch':
			// z.catch() - игнорируем catch логику, берем внутренний тип
			result = zodToMst(def.innerType, name, opts);
			break;

		case 'ZodPipeline':
			// z.pipeline() - берем выходной тип
			result = zodToMst(def.out, name, opts);
			break;

		case 'ZodBranded':
			// Брендированные типы - игнорируем бренд, берем базовый тип
			result = zodToMst(def.type, name, opts);
			break;

		// --- Ленивые и рекурсивные типы ---
		case 'ZodLazy':
			// Для рекурсивных схем используем types.late
			result = types.late(name, () => zodToMst(def.getter(), name, opts) as IAnyType);
			break;

		// --- Неподдерживаемые типы ---
		case 'ZodFunction':
		case 'ZodPromise':
		default:
			if (opts.fallbackToFrozen) {
				if (opts.logWarnings) {
					console.warn(
						`Type "${typeName}" at "${name}" is not fully supported in MST. Using types.frozen().`,
					);
				}
				result = types.frozen();
			} else {
				throw new Error(
					`Type "${typeName}" at "${name}" is not supported. Enable fallbackToFrozen option to use types.frozen() instead.`,
				);
			}
			break;
	}

	// Приведение типов для TypeScript
	return result as unknown as IType<z.input<T>, z.input<T>, z.output<T>>;
}

// Сначала определим вспомогательный Enum для примера
enum UserRole {
	Admin = 'ADMIN',
	User = 'USER',
}

export const UltimateZodSchema = z.object({
	voidField: z.void(),
	nativeEnumField: z.nativeEnum(UserRole),
	nestedObject: z.object({
		id: z.string().uuid(),
		label: z.string(),
	}),
	strictObjectField: z.strictObject({
		noExtraKeys: z.boolean(),
	}),
	looseObjectField: z
		.object({
			knownKey: z.string(),
		})
		.passthrough(),
	discriminatedUnionField: z.discriminatedUnion('type', [
		z.object({ type: z.literal('success'), data: z.string() }),
		z.object({ type: z.literal('error'), error: z.instanceof(Error) }),
	]),
	mapField: z.map(z.string(), z.object({ value: z.number() })),
	setField: z.set(z.number()),
	transformedField: z.string().transform((val) => val.length),
	refinedField: z.number().refine((val) => val % 2 === 0, {
		message: 'Должно быть четным',
	}),
});

// Автоматический вывод TypeScript типа из Zod схемы
export type UltimateType = z.infer<typeof UltimateZodSchema>;
