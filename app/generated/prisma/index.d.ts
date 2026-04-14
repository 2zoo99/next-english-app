
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Sentence
 * 
 */
export type Sentence = $Result.DefaultSelection<Prisma.$SentencePayload>
/**
 * Model Word
 * 
 */
export type Word = $Result.DefaultSelection<Prisma.$WordPayload>
/**
 * Model SentenceWord
 * 
 */
export type SentenceWord = $Result.DefaultSelection<Prisma.$SentenceWordPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sentence`: Exposes CRUD operations for the **Sentence** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sentences
    * const sentences = await prisma.sentence.findMany()
    * ```
    */
  get sentence(): Prisma.SentenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.word`: Exposes CRUD operations for the **Word** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Words
    * const words = await prisma.word.findMany()
    * ```
    */
  get word(): Prisma.WordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sentenceWord`: Exposes CRUD operations for the **SentenceWord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SentenceWords
    * const sentenceWords = await prisma.sentenceWord.findMany()
    * ```
    */
  get sentenceWord(): Prisma.SentenceWordDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Sentence: 'Sentence',
    Word: 'Word',
    SentenceWord: 'SentenceWord'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "sentence" | "word" | "sentenceWord"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Sentence: {
        payload: Prisma.$SentencePayload<ExtArgs>
        fields: Prisma.SentenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SentenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SentenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload>
          }
          findFirst: {
            args: Prisma.SentenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SentenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload>
          }
          findMany: {
            args: Prisma.SentenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload>[]
          }
          create: {
            args: Prisma.SentenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload>
          }
          createMany: {
            args: Prisma.SentenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SentenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload>[]
          }
          delete: {
            args: Prisma.SentenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload>
          }
          update: {
            args: Prisma.SentenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload>
          }
          deleteMany: {
            args: Prisma.SentenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SentenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SentenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload>[]
          }
          upsert: {
            args: Prisma.SentenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentencePayload>
          }
          aggregate: {
            args: Prisma.SentenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSentence>
          }
          groupBy: {
            args: Prisma.SentenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<SentenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.SentenceCountArgs<ExtArgs>
            result: $Utils.Optional<SentenceCountAggregateOutputType> | number
          }
        }
      }
      Word: {
        payload: Prisma.$WordPayload<ExtArgs>
        fields: Prisma.WordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>
          }
          findFirst: {
            args: Prisma.WordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>
          }
          findMany: {
            args: Prisma.WordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>[]
          }
          create: {
            args: Prisma.WordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>
          }
          createMany: {
            args: Prisma.WordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>[]
          }
          delete: {
            args: Prisma.WordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>
          }
          update: {
            args: Prisma.WordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>
          }
          deleteMany: {
            args: Prisma.WordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>[]
          }
          upsert: {
            args: Prisma.WordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>
          }
          aggregate: {
            args: Prisma.WordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWord>
          }
          groupBy: {
            args: Prisma.WordGroupByArgs<ExtArgs>
            result: $Utils.Optional<WordGroupByOutputType>[]
          }
          count: {
            args: Prisma.WordCountArgs<ExtArgs>
            result: $Utils.Optional<WordCountAggregateOutputType> | number
          }
        }
      }
      SentenceWord: {
        payload: Prisma.$SentenceWordPayload<ExtArgs>
        fields: Prisma.SentenceWordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SentenceWordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentenceWordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SentenceWordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentenceWordPayload>
          }
          findFirst: {
            args: Prisma.SentenceWordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentenceWordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SentenceWordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentenceWordPayload>
          }
          findMany: {
            args: Prisma.SentenceWordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentenceWordPayload>[]
          }
          create: {
            args: Prisma.SentenceWordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentenceWordPayload>
          }
          createMany: {
            args: Prisma.SentenceWordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SentenceWordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentenceWordPayload>[]
          }
          delete: {
            args: Prisma.SentenceWordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentenceWordPayload>
          }
          update: {
            args: Prisma.SentenceWordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentenceWordPayload>
          }
          deleteMany: {
            args: Prisma.SentenceWordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SentenceWordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SentenceWordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentenceWordPayload>[]
          }
          upsert: {
            args: Prisma.SentenceWordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SentenceWordPayload>
          }
          aggregate: {
            args: Prisma.SentenceWordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSentenceWord>
          }
          groupBy: {
            args: Prisma.SentenceWordGroupByArgs<ExtArgs>
            result: $Utils.Optional<SentenceWordGroupByOutputType>[]
          }
          count: {
            args: Prisma.SentenceWordCountArgs<ExtArgs>
            result: $Utils.Optional<SentenceWordCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    sentence?: SentenceOmit
    word?: WordOmit
    sentenceWord?: SentenceWordOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type SentenceCountOutputType
   */

  export type SentenceCountOutputType = {
    sentenceWords: number
  }

  export type SentenceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sentenceWords?: boolean | SentenceCountOutputTypeCountSentenceWordsArgs
  }

  // Custom InputTypes
  /**
   * SentenceCountOutputType without action
   */
  export type SentenceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentenceCountOutputType
     */
    select?: SentenceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SentenceCountOutputType without action
   */
  export type SentenceCountOutputTypeCountSentenceWordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SentenceWordWhereInput
  }


  /**
   * Count Type WordCountOutputType
   */

  export type WordCountOutputType = {
    sentenceWords: number
  }

  export type WordCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sentenceWords?: boolean | WordCountOutputTypeCountSentenceWordsArgs
  }

  // Custom InputTypes
  /**
   * WordCountOutputType without action
   */
  export type WordCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordCountOutputType
     */
    select?: WordCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WordCountOutputType without action
   */
  export type WordCountOutputTypeCountSentenceWordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SentenceWordWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string
    email: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "createdAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model Sentence
   */

  export type AggregateSentence = {
    _count: SentenceCountAggregateOutputType | null
    _avg: SentenceAvgAggregateOutputType | null
    _sum: SentenceSumAggregateOutputType | null
    _min: SentenceMinAggregateOutputType | null
    _max: SentenceMaxAggregateOutputType | null
  }

  export type SentenceAvgAggregateOutputType = {
    id: number | null
  }

  export type SentenceSumAggregateOutputType = {
    id: number | null
  }

  export type SentenceMinAggregateOutputType = {
    id: number | null
    content: string | null
    translate: string | null
    createdAt: Date | null
  }

  export type SentenceMaxAggregateOutputType = {
    id: number | null
    content: string | null
    translate: string | null
    createdAt: Date | null
  }

  export type SentenceCountAggregateOutputType = {
    id: number
    content: number
    translate: number
    createdAt: number
    _all: number
  }


  export type SentenceAvgAggregateInputType = {
    id?: true
  }

  export type SentenceSumAggregateInputType = {
    id?: true
  }

  export type SentenceMinAggregateInputType = {
    id?: true
    content?: true
    translate?: true
    createdAt?: true
  }

  export type SentenceMaxAggregateInputType = {
    id?: true
    content?: true
    translate?: true
    createdAt?: true
  }

  export type SentenceCountAggregateInputType = {
    id?: true
    content?: true
    translate?: true
    createdAt?: true
    _all?: true
  }

  export type SentenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sentence to aggregate.
     */
    where?: SentenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sentences to fetch.
     */
    orderBy?: SentenceOrderByWithRelationInput | SentenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SentenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sentences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sentences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sentences
    **/
    _count?: true | SentenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SentenceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SentenceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SentenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SentenceMaxAggregateInputType
  }

  export type GetSentenceAggregateType<T extends SentenceAggregateArgs> = {
        [P in keyof T & keyof AggregateSentence]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSentence[P]>
      : GetScalarType<T[P], AggregateSentence[P]>
  }




  export type SentenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SentenceWhereInput
    orderBy?: SentenceOrderByWithAggregationInput | SentenceOrderByWithAggregationInput[]
    by: SentenceScalarFieldEnum[] | SentenceScalarFieldEnum
    having?: SentenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SentenceCountAggregateInputType | true
    _avg?: SentenceAvgAggregateInputType
    _sum?: SentenceSumAggregateInputType
    _min?: SentenceMinAggregateInputType
    _max?: SentenceMaxAggregateInputType
  }

  export type SentenceGroupByOutputType = {
    id: number
    content: string
    translate: string
    createdAt: Date
    _count: SentenceCountAggregateOutputType | null
    _avg: SentenceAvgAggregateOutputType | null
    _sum: SentenceSumAggregateOutputType | null
    _min: SentenceMinAggregateOutputType | null
    _max: SentenceMaxAggregateOutputType | null
  }

  type GetSentenceGroupByPayload<T extends SentenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SentenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SentenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SentenceGroupByOutputType[P]>
            : GetScalarType<T[P], SentenceGroupByOutputType[P]>
        }
      >
    >


  export type SentenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    translate?: boolean
    createdAt?: boolean
    sentenceWords?: boolean | Sentence$sentenceWordsArgs<ExtArgs>
    _count?: boolean | SentenceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sentence"]>

  export type SentenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    translate?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["sentence"]>

  export type SentenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    translate?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["sentence"]>

  export type SentenceSelectScalar = {
    id?: boolean
    content?: boolean
    translate?: boolean
    createdAt?: boolean
  }

  export type SentenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "translate" | "createdAt", ExtArgs["result"]["sentence"]>
  export type SentenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sentenceWords?: boolean | Sentence$sentenceWordsArgs<ExtArgs>
    _count?: boolean | SentenceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SentenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SentenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SentencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sentence"
    objects: {
      sentenceWords: Prisma.$SentenceWordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      content: string
      translate: string
      createdAt: Date
    }, ExtArgs["result"]["sentence"]>
    composites: {}
  }

  type SentenceGetPayload<S extends boolean | null | undefined | SentenceDefaultArgs> = $Result.GetResult<Prisma.$SentencePayload, S>

  type SentenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SentenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SentenceCountAggregateInputType | true
    }

  export interface SentenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sentence'], meta: { name: 'Sentence' } }
    /**
     * Find zero or one Sentence that matches the filter.
     * @param {SentenceFindUniqueArgs} args - Arguments to find a Sentence
     * @example
     * // Get one Sentence
     * const sentence = await prisma.sentence.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SentenceFindUniqueArgs>(args: SelectSubset<T, SentenceFindUniqueArgs<ExtArgs>>): Prisma__SentenceClient<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sentence that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SentenceFindUniqueOrThrowArgs} args - Arguments to find a Sentence
     * @example
     * // Get one Sentence
     * const sentence = await prisma.sentence.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SentenceFindUniqueOrThrowArgs>(args: SelectSubset<T, SentenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SentenceClient<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sentence that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceFindFirstArgs} args - Arguments to find a Sentence
     * @example
     * // Get one Sentence
     * const sentence = await prisma.sentence.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SentenceFindFirstArgs>(args?: SelectSubset<T, SentenceFindFirstArgs<ExtArgs>>): Prisma__SentenceClient<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sentence that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceFindFirstOrThrowArgs} args - Arguments to find a Sentence
     * @example
     * // Get one Sentence
     * const sentence = await prisma.sentence.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SentenceFindFirstOrThrowArgs>(args?: SelectSubset<T, SentenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__SentenceClient<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sentences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sentences
     * const sentences = await prisma.sentence.findMany()
     * 
     * // Get first 10 Sentences
     * const sentences = await prisma.sentence.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sentenceWithIdOnly = await prisma.sentence.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SentenceFindManyArgs>(args?: SelectSubset<T, SentenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sentence.
     * @param {SentenceCreateArgs} args - Arguments to create a Sentence.
     * @example
     * // Create one Sentence
     * const Sentence = await prisma.sentence.create({
     *   data: {
     *     // ... data to create a Sentence
     *   }
     * })
     * 
     */
    create<T extends SentenceCreateArgs>(args: SelectSubset<T, SentenceCreateArgs<ExtArgs>>): Prisma__SentenceClient<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sentences.
     * @param {SentenceCreateManyArgs} args - Arguments to create many Sentences.
     * @example
     * // Create many Sentences
     * const sentence = await prisma.sentence.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SentenceCreateManyArgs>(args?: SelectSubset<T, SentenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sentences and returns the data saved in the database.
     * @param {SentenceCreateManyAndReturnArgs} args - Arguments to create many Sentences.
     * @example
     * // Create many Sentences
     * const sentence = await prisma.sentence.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sentences and only return the `id`
     * const sentenceWithIdOnly = await prisma.sentence.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SentenceCreateManyAndReturnArgs>(args?: SelectSubset<T, SentenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sentence.
     * @param {SentenceDeleteArgs} args - Arguments to delete one Sentence.
     * @example
     * // Delete one Sentence
     * const Sentence = await prisma.sentence.delete({
     *   where: {
     *     // ... filter to delete one Sentence
     *   }
     * })
     * 
     */
    delete<T extends SentenceDeleteArgs>(args: SelectSubset<T, SentenceDeleteArgs<ExtArgs>>): Prisma__SentenceClient<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sentence.
     * @param {SentenceUpdateArgs} args - Arguments to update one Sentence.
     * @example
     * // Update one Sentence
     * const sentence = await prisma.sentence.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SentenceUpdateArgs>(args: SelectSubset<T, SentenceUpdateArgs<ExtArgs>>): Prisma__SentenceClient<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sentences.
     * @param {SentenceDeleteManyArgs} args - Arguments to filter Sentences to delete.
     * @example
     * // Delete a few Sentences
     * const { count } = await prisma.sentence.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SentenceDeleteManyArgs>(args?: SelectSubset<T, SentenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sentences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sentences
     * const sentence = await prisma.sentence.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SentenceUpdateManyArgs>(args: SelectSubset<T, SentenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sentences and returns the data updated in the database.
     * @param {SentenceUpdateManyAndReturnArgs} args - Arguments to update many Sentences.
     * @example
     * // Update many Sentences
     * const sentence = await prisma.sentence.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sentences and only return the `id`
     * const sentenceWithIdOnly = await prisma.sentence.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SentenceUpdateManyAndReturnArgs>(args: SelectSubset<T, SentenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sentence.
     * @param {SentenceUpsertArgs} args - Arguments to update or create a Sentence.
     * @example
     * // Update or create a Sentence
     * const sentence = await prisma.sentence.upsert({
     *   create: {
     *     // ... data to create a Sentence
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sentence we want to update
     *   }
     * })
     */
    upsert<T extends SentenceUpsertArgs>(args: SelectSubset<T, SentenceUpsertArgs<ExtArgs>>): Prisma__SentenceClient<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sentences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceCountArgs} args - Arguments to filter Sentences to count.
     * @example
     * // Count the number of Sentences
     * const count = await prisma.sentence.count({
     *   where: {
     *     // ... the filter for the Sentences we want to count
     *   }
     * })
    **/
    count<T extends SentenceCountArgs>(
      args?: Subset<T, SentenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SentenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sentence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SentenceAggregateArgs>(args: Subset<T, SentenceAggregateArgs>): Prisma.PrismaPromise<GetSentenceAggregateType<T>>

    /**
     * Group by Sentence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SentenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SentenceGroupByArgs['orderBy'] }
        : { orderBy?: SentenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SentenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSentenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sentence model
   */
  readonly fields: SentenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sentence.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SentenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sentenceWords<T extends Sentence$sentenceWordsArgs<ExtArgs> = {}>(args?: Subset<T, Sentence$sentenceWordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SentenceWordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Sentence model
   */
  interface SentenceFieldRefs {
    readonly id: FieldRef<"Sentence", 'Int'>
    readonly content: FieldRef<"Sentence", 'String'>
    readonly translate: FieldRef<"Sentence", 'String'>
    readonly createdAt: FieldRef<"Sentence", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Sentence findUnique
   */
  export type SentenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
    /**
     * Filter, which Sentence to fetch.
     */
    where: SentenceWhereUniqueInput
  }

  /**
   * Sentence findUniqueOrThrow
   */
  export type SentenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
    /**
     * Filter, which Sentence to fetch.
     */
    where: SentenceWhereUniqueInput
  }

  /**
   * Sentence findFirst
   */
  export type SentenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
    /**
     * Filter, which Sentence to fetch.
     */
    where?: SentenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sentences to fetch.
     */
    orderBy?: SentenceOrderByWithRelationInput | SentenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sentences.
     */
    cursor?: SentenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sentences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sentences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sentences.
     */
    distinct?: SentenceScalarFieldEnum | SentenceScalarFieldEnum[]
  }

  /**
   * Sentence findFirstOrThrow
   */
  export type SentenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
    /**
     * Filter, which Sentence to fetch.
     */
    where?: SentenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sentences to fetch.
     */
    orderBy?: SentenceOrderByWithRelationInput | SentenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sentences.
     */
    cursor?: SentenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sentences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sentences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sentences.
     */
    distinct?: SentenceScalarFieldEnum | SentenceScalarFieldEnum[]
  }

  /**
   * Sentence findMany
   */
  export type SentenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
    /**
     * Filter, which Sentences to fetch.
     */
    where?: SentenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sentences to fetch.
     */
    orderBy?: SentenceOrderByWithRelationInput | SentenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sentences.
     */
    cursor?: SentenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sentences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sentences.
     */
    skip?: number
    distinct?: SentenceScalarFieldEnum | SentenceScalarFieldEnum[]
  }

  /**
   * Sentence create
   */
  export type SentenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
    /**
     * The data needed to create a Sentence.
     */
    data: XOR<SentenceCreateInput, SentenceUncheckedCreateInput>
  }

  /**
   * Sentence createMany
   */
  export type SentenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sentences.
     */
    data: SentenceCreateManyInput | SentenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sentence createManyAndReturn
   */
  export type SentenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * The data used to create many Sentences.
     */
    data: SentenceCreateManyInput | SentenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sentence update
   */
  export type SentenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
    /**
     * The data needed to update a Sentence.
     */
    data: XOR<SentenceUpdateInput, SentenceUncheckedUpdateInput>
    /**
     * Choose, which Sentence to update.
     */
    where: SentenceWhereUniqueInput
  }

  /**
   * Sentence updateMany
   */
  export type SentenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sentences.
     */
    data: XOR<SentenceUpdateManyMutationInput, SentenceUncheckedUpdateManyInput>
    /**
     * Filter which Sentences to update
     */
    where?: SentenceWhereInput
    /**
     * Limit how many Sentences to update.
     */
    limit?: number
  }

  /**
   * Sentence updateManyAndReturn
   */
  export type SentenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * The data used to update Sentences.
     */
    data: XOR<SentenceUpdateManyMutationInput, SentenceUncheckedUpdateManyInput>
    /**
     * Filter which Sentences to update
     */
    where?: SentenceWhereInput
    /**
     * Limit how many Sentences to update.
     */
    limit?: number
  }

  /**
   * Sentence upsert
   */
  export type SentenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
    /**
     * The filter to search for the Sentence to update in case it exists.
     */
    where: SentenceWhereUniqueInput
    /**
     * In case the Sentence found by the `where` argument doesn't exist, create a new Sentence with this data.
     */
    create: XOR<SentenceCreateInput, SentenceUncheckedCreateInput>
    /**
     * In case the Sentence was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SentenceUpdateInput, SentenceUncheckedUpdateInput>
  }

  /**
   * Sentence delete
   */
  export type SentenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
    /**
     * Filter which Sentence to delete.
     */
    where: SentenceWhereUniqueInput
  }

  /**
   * Sentence deleteMany
   */
  export type SentenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sentences to delete
     */
    where?: SentenceWhereInput
    /**
     * Limit how many Sentences to delete.
     */
    limit?: number
  }

  /**
   * Sentence.sentenceWords
   */
  export type Sentence$sentenceWordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentenceWord
     */
    select?: SentenceWordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SentenceWord
     */
    omit?: SentenceWordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceWordInclude<ExtArgs> | null
    where?: SentenceWordWhereInput
    orderBy?: SentenceWordOrderByWithRelationInput | SentenceWordOrderByWithRelationInput[]
    cursor?: SentenceWordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SentenceWordScalarFieldEnum | SentenceWordScalarFieldEnum[]
  }

  /**
   * Sentence without action
   */
  export type SentenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sentence
     */
    select?: SentenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sentence
     */
    omit?: SentenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceInclude<ExtArgs> | null
  }


  /**
   * Model Word
   */

  export type AggregateWord = {
    _count: WordCountAggregateOutputType | null
    _avg: WordAvgAggregateOutputType | null
    _sum: WordSumAggregateOutputType | null
    _min: WordMinAggregateOutputType | null
    _max: WordMaxAggregateOutputType | null
  }

  export type WordAvgAggregateOutputType = {
    id: number | null
  }

  export type WordSumAggregateOutputType = {
    id: number | null
  }

  export type WordMinAggregateOutputType = {
    id: number | null
    word: string | null
    meaning: string | null
    createdAt: Date | null
  }

  export type WordMaxAggregateOutputType = {
    id: number | null
    word: string | null
    meaning: string | null
    createdAt: Date | null
  }

  export type WordCountAggregateOutputType = {
    id: number
    word: number
    meaning: number
    createdAt: number
    _all: number
  }


  export type WordAvgAggregateInputType = {
    id?: true
  }

  export type WordSumAggregateInputType = {
    id?: true
  }

  export type WordMinAggregateInputType = {
    id?: true
    word?: true
    meaning?: true
    createdAt?: true
  }

  export type WordMaxAggregateInputType = {
    id?: true
    word?: true
    meaning?: true
    createdAt?: true
  }

  export type WordCountAggregateInputType = {
    id?: true
    word?: true
    meaning?: true
    createdAt?: true
    _all?: true
  }

  export type WordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Word to aggregate.
     */
    where?: WordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Words to fetch.
     */
    orderBy?: WordOrderByWithRelationInput | WordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Words from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Words.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Words
    **/
    _count?: true | WordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WordMaxAggregateInputType
  }

  export type GetWordAggregateType<T extends WordAggregateArgs> = {
        [P in keyof T & keyof AggregateWord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWord[P]>
      : GetScalarType<T[P], AggregateWord[P]>
  }




  export type WordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WordWhereInput
    orderBy?: WordOrderByWithAggregationInput | WordOrderByWithAggregationInput[]
    by: WordScalarFieldEnum[] | WordScalarFieldEnum
    having?: WordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WordCountAggregateInputType | true
    _avg?: WordAvgAggregateInputType
    _sum?: WordSumAggregateInputType
    _min?: WordMinAggregateInputType
    _max?: WordMaxAggregateInputType
  }

  export type WordGroupByOutputType = {
    id: number
    word: string
    meaning: string | null
    createdAt: Date
    _count: WordCountAggregateOutputType | null
    _avg: WordAvgAggregateOutputType | null
    _sum: WordSumAggregateOutputType | null
    _min: WordMinAggregateOutputType | null
    _max: WordMaxAggregateOutputType | null
  }

  type GetWordGroupByPayload<T extends WordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WordGroupByOutputType[P]>
            : GetScalarType<T[P], WordGroupByOutputType[P]>
        }
      >
    >


  export type WordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    word?: boolean
    meaning?: boolean
    createdAt?: boolean
    sentenceWords?: boolean | Word$sentenceWordsArgs<ExtArgs>
    _count?: boolean | WordCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["word"]>

  export type WordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    word?: boolean
    meaning?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["word"]>

  export type WordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    word?: boolean
    meaning?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["word"]>

  export type WordSelectScalar = {
    id?: boolean
    word?: boolean
    meaning?: boolean
    createdAt?: boolean
  }

  export type WordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "word" | "meaning" | "createdAt", ExtArgs["result"]["word"]>
  export type WordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sentenceWords?: boolean | Word$sentenceWordsArgs<ExtArgs>
    _count?: boolean | WordCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type WordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Word"
    objects: {
      sentenceWords: Prisma.$SentenceWordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      word: string
      meaning: string | null
      createdAt: Date
    }, ExtArgs["result"]["word"]>
    composites: {}
  }

  type WordGetPayload<S extends boolean | null | undefined | WordDefaultArgs> = $Result.GetResult<Prisma.$WordPayload, S>

  type WordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WordCountAggregateInputType | true
    }

  export interface WordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Word'], meta: { name: 'Word' } }
    /**
     * Find zero or one Word that matches the filter.
     * @param {WordFindUniqueArgs} args - Arguments to find a Word
     * @example
     * // Get one Word
     * const word = await prisma.word.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WordFindUniqueArgs>(args: SelectSubset<T, WordFindUniqueArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Word that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WordFindUniqueOrThrowArgs} args - Arguments to find a Word
     * @example
     * // Get one Word
     * const word = await prisma.word.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WordFindUniqueOrThrowArgs>(args: SelectSubset<T, WordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Word that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordFindFirstArgs} args - Arguments to find a Word
     * @example
     * // Get one Word
     * const word = await prisma.word.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WordFindFirstArgs>(args?: SelectSubset<T, WordFindFirstArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Word that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordFindFirstOrThrowArgs} args - Arguments to find a Word
     * @example
     * // Get one Word
     * const word = await prisma.word.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WordFindFirstOrThrowArgs>(args?: SelectSubset<T, WordFindFirstOrThrowArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Words that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Words
     * const words = await prisma.word.findMany()
     * 
     * // Get first 10 Words
     * const words = await prisma.word.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wordWithIdOnly = await prisma.word.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WordFindManyArgs>(args?: SelectSubset<T, WordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Word.
     * @param {WordCreateArgs} args - Arguments to create a Word.
     * @example
     * // Create one Word
     * const Word = await prisma.word.create({
     *   data: {
     *     // ... data to create a Word
     *   }
     * })
     * 
     */
    create<T extends WordCreateArgs>(args: SelectSubset<T, WordCreateArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Words.
     * @param {WordCreateManyArgs} args - Arguments to create many Words.
     * @example
     * // Create many Words
     * const word = await prisma.word.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WordCreateManyArgs>(args?: SelectSubset<T, WordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Words and returns the data saved in the database.
     * @param {WordCreateManyAndReturnArgs} args - Arguments to create many Words.
     * @example
     * // Create many Words
     * const word = await prisma.word.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Words and only return the `id`
     * const wordWithIdOnly = await prisma.word.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WordCreateManyAndReturnArgs>(args?: SelectSubset<T, WordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Word.
     * @param {WordDeleteArgs} args - Arguments to delete one Word.
     * @example
     * // Delete one Word
     * const Word = await prisma.word.delete({
     *   where: {
     *     // ... filter to delete one Word
     *   }
     * })
     * 
     */
    delete<T extends WordDeleteArgs>(args: SelectSubset<T, WordDeleteArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Word.
     * @param {WordUpdateArgs} args - Arguments to update one Word.
     * @example
     * // Update one Word
     * const word = await prisma.word.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WordUpdateArgs>(args: SelectSubset<T, WordUpdateArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Words.
     * @param {WordDeleteManyArgs} args - Arguments to filter Words to delete.
     * @example
     * // Delete a few Words
     * const { count } = await prisma.word.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WordDeleteManyArgs>(args?: SelectSubset<T, WordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Words.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Words
     * const word = await prisma.word.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WordUpdateManyArgs>(args: SelectSubset<T, WordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Words and returns the data updated in the database.
     * @param {WordUpdateManyAndReturnArgs} args - Arguments to update many Words.
     * @example
     * // Update many Words
     * const word = await prisma.word.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Words and only return the `id`
     * const wordWithIdOnly = await prisma.word.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WordUpdateManyAndReturnArgs>(args: SelectSubset<T, WordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Word.
     * @param {WordUpsertArgs} args - Arguments to update or create a Word.
     * @example
     * // Update or create a Word
     * const word = await prisma.word.upsert({
     *   create: {
     *     // ... data to create a Word
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Word we want to update
     *   }
     * })
     */
    upsert<T extends WordUpsertArgs>(args: SelectSubset<T, WordUpsertArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Words.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordCountArgs} args - Arguments to filter Words to count.
     * @example
     * // Count the number of Words
     * const count = await prisma.word.count({
     *   where: {
     *     // ... the filter for the Words we want to count
     *   }
     * })
    **/
    count<T extends WordCountArgs>(
      args?: Subset<T, WordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Word.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WordAggregateArgs>(args: Subset<T, WordAggregateArgs>): Prisma.PrismaPromise<GetWordAggregateType<T>>

    /**
     * Group by Word.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WordGroupByArgs['orderBy'] }
        : { orderBy?: WordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Word model
   */
  readonly fields: WordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Word.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sentenceWords<T extends Word$sentenceWordsArgs<ExtArgs> = {}>(args?: Subset<T, Word$sentenceWordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SentenceWordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Word model
   */
  interface WordFieldRefs {
    readonly id: FieldRef<"Word", 'Int'>
    readonly word: FieldRef<"Word", 'String'>
    readonly meaning: FieldRef<"Word", 'String'>
    readonly createdAt: FieldRef<"Word", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Word findUnique
   */
  export type WordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * Filter, which Word to fetch.
     */
    where: WordWhereUniqueInput
  }

  /**
   * Word findUniqueOrThrow
   */
  export type WordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * Filter, which Word to fetch.
     */
    where: WordWhereUniqueInput
  }

  /**
   * Word findFirst
   */
  export type WordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * Filter, which Word to fetch.
     */
    where?: WordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Words to fetch.
     */
    orderBy?: WordOrderByWithRelationInput | WordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Words.
     */
    cursor?: WordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Words from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Words.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Words.
     */
    distinct?: WordScalarFieldEnum | WordScalarFieldEnum[]
  }

  /**
   * Word findFirstOrThrow
   */
  export type WordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * Filter, which Word to fetch.
     */
    where?: WordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Words to fetch.
     */
    orderBy?: WordOrderByWithRelationInput | WordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Words.
     */
    cursor?: WordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Words from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Words.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Words.
     */
    distinct?: WordScalarFieldEnum | WordScalarFieldEnum[]
  }

  /**
   * Word findMany
   */
  export type WordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * Filter, which Words to fetch.
     */
    where?: WordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Words to fetch.
     */
    orderBy?: WordOrderByWithRelationInput | WordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Words.
     */
    cursor?: WordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Words from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Words.
     */
    skip?: number
    distinct?: WordScalarFieldEnum | WordScalarFieldEnum[]
  }

  /**
   * Word create
   */
  export type WordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * The data needed to create a Word.
     */
    data: XOR<WordCreateInput, WordUncheckedCreateInput>
  }

  /**
   * Word createMany
   */
  export type WordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Words.
     */
    data: WordCreateManyInput | WordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Word createManyAndReturn
   */
  export type WordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * The data used to create many Words.
     */
    data: WordCreateManyInput | WordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Word update
   */
  export type WordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * The data needed to update a Word.
     */
    data: XOR<WordUpdateInput, WordUncheckedUpdateInput>
    /**
     * Choose, which Word to update.
     */
    where: WordWhereUniqueInput
  }

  /**
   * Word updateMany
   */
  export type WordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Words.
     */
    data: XOR<WordUpdateManyMutationInput, WordUncheckedUpdateManyInput>
    /**
     * Filter which Words to update
     */
    where?: WordWhereInput
    /**
     * Limit how many Words to update.
     */
    limit?: number
  }

  /**
   * Word updateManyAndReturn
   */
  export type WordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * The data used to update Words.
     */
    data: XOR<WordUpdateManyMutationInput, WordUncheckedUpdateManyInput>
    /**
     * Filter which Words to update
     */
    where?: WordWhereInput
    /**
     * Limit how many Words to update.
     */
    limit?: number
  }

  /**
   * Word upsert
   */
  export type WordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * The filter to search for the Word to update in case it exists.
     */
    where: WordWhereUniqueInput
    /**
     * In case the Word found by the `where` argument doesn't exist, create a new Word with this data.
     */
    create: XOR<WordCreateInput, WordUncheckedCreateInput>
    /**
     * In case the Word was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WordUpdateInput, WordUncheckedUpdateInput>
  }

  /**
   * Word delete
   */
  export type WordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * Filter which Word to delete.
     */
    where: WordWhereUniqueInput
  }

  /**
   * Word deleteMany
   */
  export type WordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Words to delete
     */
    where?: WordWhereInput
    /**
     * Limit how many Words to delete.
     */
    limit?: number
  }

  /**
   * Word.sentenceWords
   */
  export type Word$sentenceWordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentenceWord
     */
    select?: SentenceWordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SentenceWord
     */
    omit?: SentenceWordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceWordInclude<ExtArgs> | null
    where?: SentenceWordWhereInput
    orderBy?: SentenceWordOrderByWithRelationInput | SentenceWordOrderByWithRelationInput[]
    cursor?: SentenceWordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SentenceWordScalarFieldEnum | SentenceWordScalarFieldEnum[]
  }

  /**
   * Word without action
   */
  export type WordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
  }


  /**
   * Model SentenceWord
   */

  export type AggregateSentenceWord = {
    _count: SentenceWordCountAggregateOutputType | null
    _avg: SentenceWordAvgAggregateOutputType | null
    _sum: SentenceWordSumAggregateOutputType | null
    _min: SentenceWordMinAggregateOutputType | null
    _max: SentenceWordMaxAggregateOutputType | null
  }

  export type SentenceWordAvgAggregateOutputType = {
    id: number | null
    order: number | null
    sentenceId: number | null
    wordId: number | null
  }

  export type SentenceWordSumAggregateOutputType = {
    id: number | null
    order: number | null
    sentenceId: number | null
    wordId: number | null
  }

  export type SentenceWordMinAggregateOutputType = {
    id: number | null
    order: number | null
    sentenceId: number | null
    wordId: number | null
  }

  export type SentenceWordMaxAggregateOutputType = {
    id: number | null
    order: number | null
    sentenceId: number | null
    wordId: number | null
  }

  export type SentenceWordCountAggregateOutputType = {
    id: number
    order: number
    sentenceId: number
    wordId: number
    _all: number
  }


  export type SentenceWordAvgAggregateInputType = {
    id?: true
    order?: true
    sentenceId?: true
    wordId?: true
  }

  export type SentenceWordSumAggregateInputType = {
    id?: true
    order?: true
    sentenceId?: true
    wordId?: true
  }

  export type SentenceWordMinAggregateInputType = {
    id?: true
    order?: true
    sentenceId?: true
    wordId?: true
  }

  export type SentenceWordMaxAggregateInputType = {
    id?: true
    order?: true
    sentenceId?: true
    wordId?: true
  }

  export type SentenceWordCountAggregateInputType = {
    id?: true
    order?: true
    sentenceId?: true
    wordId?: true
    _all?: true
  }

  export type SentenceWordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SentenceWord to aggregate.
     */
    where?: SentenceWordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SentenceWords to fetch.
     */
    orderBy?: SentenceWordOrderByWithRelationInput | SentenceWordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SentenceWordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SentenceWords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SentenceWords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SentenceWords
    **/
    _count?: true | SentenceWordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SentenceWordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SentenceWordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SentenceWordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SentenceWordMaxAggregateInputType
  }

  export type GetSentenceWordAggregateType<T extends SentenceWordAggregateArgs> = {
        [P in keyof T & keyof AggregateSentenceWord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSentenceWord[P]>
      : GetScalarType<T[P], AggregateSentenceWord[P]>
  }




  export type SentenceWordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SentenceWordWhereInput
    orderBy?: SentenceWordOrderByWithAggregationInput | SentenceWordOrderByWithAggregationInput[]
    by: SentenceWordScalarFieldEnum[] | SentenceWordScalarFieldEnum
    having?: SentenceWordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SentenceWordCountAggregateInputType | true
    _avg?: SentenceWordAvgAggregateInputType
    _sum?: SentenceWordSumAggregateInputType
    _min?: SentenceWordMinAggregateInputType
    _max?: SentenceWordMaxAggregateInputType
  }

  export type SentenceWordGroupByOutputType = {
    id: number
    order: number
    sentenceId: number
    wordId: number
    _count: SentenceWordCountAggregateOutputType | null
    _avg: SentenceWordAvgAggregateOutputType | null
    _sum: SentenceWordSumAggregateOutputType | null
    _min: SentenceWordMinAggregateOutputType | null
    _max: SentenceWordMaxAggregateOutputType | null
  }

  type GetSentenceWordGroupByPayload<T extends SentenceWordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SentenceWordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SentenceWordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SentenceWordGroupByOutputType[P]>
            : GetScalarType<T[P], SentenceWordGroupByOutputType[P]>
        }
      >
    >


  export type SentenceWordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    sentenceId?: boolean
    wordId?: boolean
    sentence?: boolean | SentenceDefaultArgs<ExtArgs>
    word?: boolean | WordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sentenceWord"]>

  export type SentenceWordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    sentenceId?: boolean
    wordId?: boolean
    sentence?: boolean | SentenceDefaultArgs<ExtArgs>
    word?: boolean | WordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sentenceWord"]>

  export type SentenceWordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    order?: boolean
    sentenceId?: boolean
    wordId?: boolean
    sentence?: boolean | SentenceDefaultArgs<ExtArgs>
    word?: boolean | WordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sentenceWord"]>

  export type SentenceWordSelectScalar = {
    id?: boolean
    order?: boolean
    sentenceId?: boolean
    wordId?: boolean
  }

  export type SentenceWordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "order" | "sentenceId" | "wordId", ExtArgs["result"]["sentenceWord"]>
  export type SentenceWordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sentence?: boolean | SentenceDefaultArgs<ExtArgs>
    word?: boolean | WordDefaultArgs<ExtArgs>
  }
  export type SentenceWordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sentence?: boolean | SentenceDefaultArgs<ExtArgs>
    word?: boolean | WordDefaultArgs<ExtArgs>
  }
  export type SentenceWordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sentence?: boolean | SentenceDefaultArgs<ExtArgs>
    word?: boolean | WordDefaultArgs<ExtArgs>
  }

  export type $SentenceWordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SentenceWord"
    objects: {
      sentence: Prisma.$SentencePayload<ExtArgs>
      word: Prisma.$WordPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      order: number
      sentenceId: number
      wordId: number
    }, ExtArgs["result"]["sentenceWord"]>
    composites: {}
  }

  type SentenceWordGetPayload<S extends boolean | null | undefined | SentenceWordDefaultArgs> = $Result.GetResult<Prisma.$SentenceWordPayload, S>

  type SentenceWordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SentenceWordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SentenceWordCountAggregateInputType | true
    }

  export interface SentenceWordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SentenceWord'], meta: { name: 'SentenceWord' } }
    /**
     * Find zero or one SentenceWord that matches the filter.
     * @param {SentenceWordFindUniqueArgs} args - Arguments to find a SentenceWord
     * @example
     * // Get one SentenceWord
     * const sentenceWord = await prisma.sentenceWord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SentenceWordFindUniqueArgs>(args: SelectSubset<T, SentenceWordFindUniqueArgs<ExtArgs>>): Prisma__SentenceWordClient<$Result.GetResult<Prisma.$SentenceWordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SentenceWord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SentenceWordFindUniqueOrThrowArgs} args - Arguments to find a SentenceWord
     * @example
     * // Get one SentenceWord
     * const sentenceWord = await prisma.sentenceWord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SentenceWordFindUniqueOrThrowArgs>(args: SelectSubset<T, SentenceWordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SentenceWordClient<$Result.GetResult<Prisma.$SentenceWordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SentenceWord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceWordFindFirstArgs} args - Arguments to find a SentenceWord
     * @example
     * // Get one SentenceWord
     * const sentenceWord = await prisma.sentenceWord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SentenceWordFindFirstArgs>(args?: SelectSubset<T, SentenceWordFindFirstArgs<ExtArgs>>): Prisma__SentenceWordClient<$Result.GetResult<Prisma.$SentenceWordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SentenceWord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceWordFindFirstOrThrowArgs} args - Arguments to find a SentenceWord
     * @example
     * // Get one SentenceWord
     * const sentenceWord = await prisma.sentenceWord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SentenceWordFindFirstOrThrowArgs>(args?: SelectSubset<T, SentenceWordFindFirstOrThrowArgs<ExtArgs>>): Prisma__SentenceWordClient<$Result.GetResult<Prisma.$SentenceWordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SentenceWords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceWordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SentenceWords
     * const sentenceWords = await prisma.sentenceWord.findMany()
     * 
     * // Get first 10 SentenceWords
     * const sentenceWords = await prisma.sentenceWord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sentenceWordWithIdOnly = await prisma.sentenceWord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SentenceWordFindManyArgs>(args?: SelectSubset<T, SentenceWordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SentenceWordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SentenceWord.
     * @param {SentenceWordCreateArgs} args - Arguments to create a SentenceWord.
     * @example
     * // Create one SentenceWord
     * const SentenceWord = await prisma.sentenceWord.create({
     *   data: {
     *     // ... data to create a SentenceWord
     *   }
     * })
     * 
     */
    create<T extends SentenceWordCreateArgs>(args: SelectSubset<T, SentenceWordCreateArgs<ExtArgs>>): Prisma__SentenceWordClient<$Result.GetResult<Prisma.$SentenceWordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SentenceWords.
     * @param {SentenceWordCreateManyArgs} args - Arguments to create many SentenceWords.
     * @example
     * // Create many SentenceWords
     * const sentenceWord = await prisma.sentenceWord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SentenceWordCreateManyArgs>(args?: SelectSubset<T, SentenceWordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SentenceWords and returns the data saved in the database.
     * @param {SentenceWordCreateManyAndReturnArgs} args - Arguments to create many SentenceWords.
     * @example
     * // Create many SentenceWords
     * const sentenceWord = await prisma.sentenceWord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SentenceWords and only return the `id`
     * const sentenceWordWithIdOnly = await prisma.sentenceWord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SentenceWordCreateManyAndReturnArgs>(args?: SelectSubset<T, SentenceWordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SentenceWordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SentenceWord.
     * @param {SentenceWordDeleteArgs} args - Arguments to delete one SentenceWord.
     * @example
     * // Delete one SentenceWord
     * const SentenceWord = await prisma.sentenceWord.delete({
     *   where: {
     *     // ... filter to delete one SentenceWord
     *   }
     * })
     * 
     */
    delete<T extends SentenceWordDeleteArgs>(args: SelectSubset<T, SentenceWordDeleteArgs<ExtArgs>>): Prisma__SentenceWordClient<$Result.GetResult<Prisma.$SentenceWordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SentenceWord.
     * @param {SentenceWordUpdateArgs} args - Arguments to update one SentenceWord.
     * @example
     * // Update one SentenceWord
     * const sentenceWord = await prisma.sentenceWord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SentenceWordUpdateArgs>(args: SelectSubset<T, SentenceWordUpdateArgs<ExtArgs>>): Prisma__SentenceWordClient<$Result.GetResult<Prisma.$SentenceWordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SentenceWords.
     * @param {SentenceWordDeleteManyArgs} args - Arguments to filter SentenceWords to delete.
     * @example
     * // Delete a few SentenceWords
     * const { count } = await prisma.sentenceWord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SentenceWordDeleteManyArgs>(args?: SelectSubset<T, SentenceWordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SentenceWords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceWordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SentenceWords
     * const sentenceWord = await prisma.sentenceWord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SentenceWordUpdateManyArgs>(args: SelectSubset<T, SentenceWordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SentenceWords and returns the data updated in the database.
     * @param {SentenceWordUpdateManyAndReturnArgs} args - Arguments to update many SentenceWords.
     * @example
     * // Update many SentenceWords
     * const sentenceWord = await prisma.sentenceWord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SentenceWords and only return the `id`
     * const sentenceWordWithIdOnly = await prisma.sentenceWord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SentenceWordUpdateManyAndReturnArgs>(args: SelectSubset<T, SentenceWordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SentenceWordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SentenceWord.
     * @param {SentenceWordUpsertArgs} args - Arguments to update or create a SentenceWord.
     * @example
     * // Update or create a SentenceWord
     * const sentenceWord = await prisma.sentenceWord.upsert({
     *   create: {
     *     // ... data to create a SentenceWord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SentenceWord we want to update
     *   }
     * })
     */
    upsert<T extends SentenceWordUpsertArgs>(args: SelectSubset<T, SentenceWordUpsertArgs<ExtArgs>>): Prisma__SentenceWordClient<$Result.GetResult<Prisma.$SentenceWordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SentenceWords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceWordCountArgs} args - Arguments to filter SentenceWords to count.
     * @example
     * // Count the number of SentenceWords
     * const count = await prisma.sentenceWord.count({
     *   where: {
     *     // ... the filter for the SentenceWords we want to count
     *   }
     * })
    **/
    count<T extends SentenceWordCountArgs>(
      args?: Subset<T, SentenceWordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SentenceWordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SentenceWord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceWordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SentenceWordAggregateArgs>(args: Subset<T, SentenceWordAggregateArgs>): Prisma.PrismaPromise<GetSentenceWordAggregateType<T>>

    /**
     * Group by SentenceWord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentenceWordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SentenceWordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SentenceWordGroupByArgs['orderBy'] }
        : { orderBy?: SentenceWordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SentenceWordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSentenceWordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SentenceWord model
   */
  readonly fields: SentenceWordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SentenceWord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SentenceWordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sentence<T extends SentenceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SentenceDefaultArgs<ExtArgs>>): Prisma__SentenceClient<$Result.GetResult<Prisma.$SentencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    word<T extends WordDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WordDefaultArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SentenceWord model
   */
  interface SentenceWordFieldRefs {
    readonly id: FieldRef<"SentenceWord", 'Int'>
    readonly order: FieldRef<"SentenceWord", 'Int'>
    readonly sentenceId: FieldRef<"SentenceWord", 'Int'>
    readonly wordId: FieldRef<"SentenceWord", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * SentenceWord findUnique
   */
  export type SentenceWordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentenceWord
     */
    select?: SentenceWordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SentenceWord
     */
    omit?: SentenceWordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceWordInclude<ExtArgs> | null
    /**
     * Filter, which SentenceWord to fetch.
     */
    where: SentenceWordWhereUniqueInput
  }

  /**
   * SentenceWord findUniqueOrThrow
   */
  export type SentenceWordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentenceWord
     */
    select?: SentenceWordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SentenceWord
     */
    omit?: SentenceWordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceWordInclude<ExtArgs> | null
    /**
     * Filter, which SentenceWord to fetch.
     */
    where: SentenceWordWhereUniqueInput
  }

  /**
   * SentenceWord findFirst
   */
  export type SentenceWordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentenceWord
     */
    select?: SentenceWordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SentenceWord
     */
    omit?: SentenceWordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceWordInclude<ExtArgs> | null
    /**
     * Filter, which SentenceWord to fetch.
     */
    where?: SentenceWordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SentenceWords to fetch.
     */
    orderBy?: SentenceWordOrderByWithRelationInput | SentenceWordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SentenceWords.
     */
    cursor?: SentenceWordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SentenceWords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SentenceWords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SentenceWords.
     */
    distinct?: SentenceWordScalarFieldEnum | SentenceWordScalarFieldEnum[]
  }

  /**
   * SentenceWord findFirstOrThrow
   */
  export type SentenceWordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentenceWord
     */
    select?: SentenceWordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SentenceWord
     */
    omit?: SentenceWordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceWordInclude<ExtArgs> | null
    /**
     * Filter, which SentenceWord to fetch.
     */
    where?: SentenceWordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SentenceWords to fetch.
     */
    orderBy?: SentenceWordOrderByWithRelationInput | SentenceWordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SentenceWords.
     */
    cursor?: SentenceWordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SentenceWords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SentenceWords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SentenceWords.
     */
    distinct?: SentenceWordScalarFieldEnum | SentenceWordScalarFieldEnum[]
  }

  /**
   * SentenceWord findMany
   */
  export type SentenceWordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentenceWord
     */
    select?: SentenceWordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SentenceWord
     */
    omit?: SentenceWordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceWordInclude<ExtArgs> | null
    /**
     * Filter, which SentenceWords to fetch.
     */
    where?: SentenceWordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SentenceWords to fetch.
     */
    orderBy?: SentenceWordOrderByWithRelationInput | SentenceWordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SentenceWords.
     */
    cursor?: SentenceWordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SentenceWords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SentenceWords.
     */
    skip?: number
    distinct?: SentenceWordScalarFieldEnum | SentenceWordScalarFieldEnum[]
  }

  /**
   * SentenceWord create
   */
  export type SentenceWordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentenceWord
     */
    select?: SentenceWordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SentenceWord
     */
    omit?: SentenceWordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceWordInclude<ExtArgs> | null
    /**
     * The data needed to create a SentenceWord.
     */
    data: XOR<SentenceWordCreateInput, SentenceWordUncheckedCreateInput>
  }

  /**
   * SentenceWord createMany
   */
  export type SentenceWordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SentenceWords.
     */
    data: SentenceWordCreateManyInput | SentenceWordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SentenceWord createManyAndReturn
   */
  export type SentenceWordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentenceWord
     */
    select?: SentenceWordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SentenceWord
     */
    omit?: SentenceWordOmit<ExtArgs> | null
    /**
     * The data used to create many SentenceWords.
     */
    data: SentenceWordCreateManyInput | SentenceWordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceWordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SentenceWord update
   */
  export type SentenceWordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentenceWord
     */
    select?: SentenceWordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SentenceWord
     */
    omit?: SentenceWordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceWordInclude<ExtArgs> | null
    /**
     * The data needed to update a SentenceWord.
     */
    data: XOR<SentenceWordUpdateInput, SentenceWordUncheckedUpdateInput>
    /**
     * Choose, which SentenceWord to update.
     */
    where: SentenceWordWhereUniqueInput
  }

  /**
   * SentenceWord updateMany
   */
  export type SentenceWordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SentenceWords.
     */
    data: XOR<SentenceWordUpdateManyMutationInput, SentenceWordUncheckedUpdateManyInput>
    /**
     * Filter which SentenceWords to update
     */
    where?: SentenceWordWhereInput
    /**
     * Limit how many SentenceWords to update.
     */
    limit?: number
  }

  /**
   * SentenceWord updateManyAndReturn
   */
  export type SentenceWordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentenceWord
     */
    select?: SentenceWordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SentenceWord
     */
    omit?: SentenceWordOmit<ExtArgs> | null
    /**
     * The data used to update SentenceWords.
     */
    data: XOR<SentenceWordUpdateManyMutationInput, SentenceWordUncheckedUpdateManyInput>
    /**
     * Filter which SentenceWords to update
     */
    where?: SentenceWordWhereInput
    /**
     * Limit how many SentenceWords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceWordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SentenceWord upsert
   */
  export type SentenceWordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentenceWord
     */
    select?: SentenceWordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SentenceWord
     */
    omit?: SentenceWordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceWordInclude<ExtArgs> | null
    /**
     * The filter to search for the SentenceWord to update in case it exists.
     */
    where: SentenceWordWhereUniqueInput
    /**
     * In case the SentenceWord found by the `where` argument doesn't exist, create a new SentenceWord with this data.
     */
    create: XOR<SentenceWordCreateInput, SentenceWordUncheckedCreateInput>
    /**
     * In case the SentenceWord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SentenceWordUpdateInput, SentenceWordUncheckedUpdateInput>
  }

  /**
   * SentenceWord delete
   */
  export type SentenceWordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentenceWord
     */
    select?: SentenceWordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SentenceWord
     */
    omit?: SentenceWordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceWordInclude<ExtArgs> | null
    /**
     * Filter which SentenceWord to delete.
     */
    where: SentenceWordWhereUniqueInput
  }

  /**
   * SentenceWord deleteMany
   */
  export type SentenceWordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SentenceWords to delete
     */
    where?: SentenceWordWhereInput
    /**
     * Limit how many SentenceWords to delete.
     */
    limit?: number
  }

  /**
   * SentenceWord without action
   */
  export type SentenceWordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentenceWord
     */
    select?: SentenceWordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SentenceWord
     */
    omit?: SentenceWordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SentenceWordInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SentenceScalarFieldEnum: {
    id: 'id',
    content: 'content',
    translate: 'translate',
    createdAt: 'createdAt'
  };

  export type SentenceScalarFieldEnum = (typeof SentenceScalarFieldEnum)[keyof typeof SentenceScalarFieldEnum]


  export const WordScalarFieldEnum: {
    id: 'id',
    word: 'word',
    meaning: 'meaning',
    createdAt: 'createdAt'
  };

  export type WordScalarFieldEnum = (typeof WordScalarFieldEnum)[keyof typeof WordScalarFieldEnum]


  export const SentenceWordScalarFieldEnum: {
    id: 'id',
    order: 'order',
    sentenceId: 'sentenceId',
    wordId: 'wordId'
  };

  export type SentenceWordScalarFieldEnum = (typeof SentenceWordScalarFieldEnum)[keyof typeof SentenceWordScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SentenceWhereInput = {
    AND?: SentenceWhereInput | SentenceWhereInput[]
    OR?: SentenceWhereInput[]
    NOT?: SentenceWhereInput | SentenceWhereInput[]
    id?: IntFilter<"Sentence"> | number
    content?: StringFilter<"Sentence"> | string
    translate?: StringFilter<"Sentence"> | string
    createdAt?: DateTimeFilter<"Sentence"> | Date | string
    sentenceWords?: SentenceWordListRelationFilter
  }

  export type SentenceOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    translate?: SortOrder
    createdAt?: SortOrder
    sentenceWords?: SentenceWordOrderByRelationAggregateInput
  }

  export type SentenceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SentenceWhereInput | SentenceWhereInput[]
    OR?: SentenceWhereInput[]
    NOT?: SentenceWhereInput | SentenceWhereInput[]
    content?: StringFilter<"Sentence"> | string
    translate?: StringFilter<"Sentence"> | string
    createdAt?: DateTimeFilter<"Sentence"> | Date | string
    sentenceWords?: SentenceWordListRelationFilter
  }, "id">

  export type SentenceOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    translate?: SortOrder
    createdAt?: SortOrder
    _count?: SentenceCountOrderByAggregateInput
    _avg?: SentenceAvgOrderByAggregateInput
    _max?: SentenceMaxOrderByAggregateInput
    _min?: SentenceMinOrderByAggregateInput
    _sum?: SentenceSumOrderByAggregateInput
  }

  export type SentenceScalarWhereWithAggregatesInput = {
    AND?: SentenceScalarWhereWithAggregatesInput | SentenceScalarWhereWithAggregatesInput[]
    OR?: SentenceScalarWhereWithAggregatesInput[]
    NOT?: SentenceScalarWhereWithAggregatesInput | SentenceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Sentence"> | number
    content?: StringWithAggregatesFilter<"Sentence"> | string
    translate?: StringWithAggregatesFilter<"Sentence"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Sentence"> | Date | string
  }

  export type WordWhereInput = {
    AND?: WordWhereInput | WordWhereInput[]
    OR?: WordWhereInput[]
    NOT?: WordWhereInput | WordWhereInput[]
    id?: IntFilter<"Word"> | number
    word?: StringFilter<"Word"> | string
    meaning?: StringNullableFilter<"Word"> | string | null
    createdAt?: DateTimeFilter<"Word"> | Date | string
    sentenceWords?: SentenceWordListRelationFilter
  }

  export type WordOrderByWithRelationInput = {
    id?: SortOrder
    word?: SortOrder
    meaning?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    sentenceWords?: SentenceWordOrderByRelationAggregateInput
  }

  export type WordWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    word?: string
    AND?: WordWhereInput | WordWhereInput[]
    OR?: WordWhereInput[]
    NOT?: WordWhereInput | WordWhereInput[]
    meaning?: StringNullableFilter<"Word"> | string | null
    createdAt?: DateTimeFilter<"Word"> | Date | string
    sentenceWords?: SentenceWordListRelationFilter
  }, "id" | "word">

  export type WordOrderByWithAggregationInput = {
    id?: SortOrder
    word?: SortOrder
    meaning?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: WordCountOrderByAggregateInput
    _avg?: WordAvgOrderByAggregateInput
    _max?: WordMaxOrderByAggregateInput
    _min?: WordMinOrderByAggregateInput
    _sum?: WordSumOrderByAggregateInput
  }

  export type WordScalarWhereWithAggregatesInput = {
    AND?: WordScalarWhereWithAggregatesInput | WordScalarWhereWithAggregatesInput[]
    OR?: WordScalarWhereWithAggregatesInput[]
    NOT?: WordScalarWhereWithAggregatesInput | WordScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Word"> | number
    word?: StringWithAggregatesFilter<"Word"> | string
    meaning?: StringNullableWithAggregatesFilter<"Word"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Word"> | Date | string
  }

  export type SentenceWordWhereInput = {
    AND?: SentenceWordWhereInput | SentenceWordWhereInput[]
    OR?: SentenceWordWhereInput[]
    NOT?: SentenceWordWhereInput | SentenceWordWhereInput[]
    id?: IntFilter<"SentenceWord"> | number
    order?: IntFilter<"SentenceWord"> | number
    sentenceId?: IntFilter<"SentenceWord"> | number
    wordId?: IntFilter<"SentenceWord"> | number
    sentence?: XOR<SentenceScalarRelationFilter, SentenceWhereInput>
    word?: XOR<WordScalarRelationFilter, WordWhereInput>
  }

  export type SentenceWordOrderByWithRelationInput = {
    id?: SortOrder
    order?: SortOrder
    sentenceId?: SortOrder
    wordId?: SortOrder
    sentence?: SentenceOrderByWithRelationInput
    word?: WordOrderByWithRelationInput
  }

  export type SentenceWordWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SentenceWordWhereInput | SentenceWordWhereInput[]
    OR?: SentenceWordWhereInput[]
    NOT?: SentenceWordWhereInput | SentenceWordWhereInput[]
    order?: IntFilter<"SentenceWord"> | number
    sentenceId?: IntFilter<"SentenceWord"> | number
    wordId?: IntFilter<"SentenceWord"> | number
    sentence?: XOR<SentenceScalarRelationFilter, SentenceWhereInput>
    word?: XOR<WordScalarRelationFilter, WordWhereInput>
  }, "id">

  export type SentenceWordOrderByWithAggregationInput = {
    id?: SortOrder
    order?: SortOrder
    sentenceId?: SortOrder
    wordId?: SortOrder
    _count?: SentenceWordCountOrderByAggregateInput
    _avg?: SentenceWordAvgOrderByAggregateInput
    _max?: SentenceWordMaxOrderByAggregateInput
    _min?: SentenceWordMinOrderByAggregateInput
    _sum?: SentenceWordSumOrderByAggregateInput
  }

  export type SentenceWordScalarWhereWithAggregatesInput = {
    AND?: SentenceWordScalarWhereWithAggregatesInput | SentenceWordScalarWhereWithAggregatesInput[]
    OR?: SentenceWordScalarWhereWithAggregatesInput[]
    NOT?: SentenceWordScalarWhereWithAggregatesInput | SentenceWordScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SentenceWord"> | number
    order?: IntWithAggregatesFilter<"SentenceWord"> | number
    sentenceId?: IntWithAggregatesFilter<"SentenceWord"> | number
    wordId?: IntWithAggregatesFilter<"SentenceWord"> | number
  }

  export type UserCreateInput = {
    name: string
    email: string
    createdAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    createdAt?: Date | string
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: number
    name: string
    email: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SentenceCreateInput = {
    content: string
    translate: string
    createdAt?: Date | string
    sentenceWords?: SentenceWordCreateNestedManyWithoutSentenceInput
  }

  export type SentenceUncheckedCreateInput = {
    id?: number
    content: string
    translate: string
    createdAt?: Date | string
    sentenceWords?: SentenceWordUncheckedCreateNestedManyWithoutSentenceInput
  }

  export type SentenceUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    translate?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentenceWords?: SentenceWordUpdateManyWithoutSentenceNestedInput
  }

  export type SentenceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    translate?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentenceWords?: SentenceWordUncheckedUpdateManyWithoutSentenceNestedInput
  }

  export type SentenceCreateManyInput = {
    id?: number
    content: string
    translate: string
    createdAt?: Date | string
  }

  export type SentenceUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    translate?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SentenceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    translate?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordCreateInput = {
    word: string
    meaning?: string | null
    createdAt?: Date | string
    sentenceWords?: SentenceWordCreateNestedManyWithoutWordInput
  }

  export type WordUncheckedCreateInput = {
    id?: number
    word: string
    meaning?: string | null
    createdAt?: Date | string
    sentenceWords?: SentenceWordUncheckedCreateNestedManyWithoutWordInput
  }

  export type WordUpdateInput = {
    word?: StringFieldUpdateOperationsInput | string
    meaning?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentenceWords?: SentenceWordUpdateManyWithoutWordNestedInput
  }

  export type WordUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    word?: StringFieldUpdateOperationsInput | string
    meaning?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentenceWords?: SentenceWordUncheckedUpdateManyWithoutWordNestedInput
  }

  export type WordCreateManyInput = {
    id?: number
    word: string
    meaning?: string | null
    createdAt?: Date | string
  }

  export type WordUpdateManyMutationInput = {
    word?: StringFieldUpdateOperationsInput | string
    meaning?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    word?: StringFieldUpdateOperationsInput | string
    meaning?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SentenceWordCreateInput = {
    order: number
    sentence: SentenceCreateNestedOneWithoutSentenceWordsInput
    word: WordCreateNestedOneWithoutSentenceWordsInput
  }

  export type SentenceWordUncheckedCreateInput = {
    id?: number
    order: number
    sentenceId: number
    wordId: number
  }

  export type SentenceWordUpdateInput = {
    order?: IntFieldUpdateOperationsInput | number
    sentence?: SentenceUpdateOneRequiredWithoutSentenceWordsNestedInput
    word?: WordUpdateOneRequiredWithoutSentenceWordsNestedInput
  }

  export type SentenceWordUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    sentenceId?: IntFieldUpdateOperationsInput | number
    wordId?: IntFieldUpdateOperationsInput | number
  }

  export type SentenceWordCreateManyInput = {
    id?: number
    order: number
    sentenceId: number
    wordId: number
  }

  export type SentenceWordUpdateManyMutationInput = {
    order?: IntFieldUpdateOperationsInput | number
  }

  export type SentenceWordUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    sentenceId?: IntFieldUpdateOperationsInput | number
    wordId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type SentenceWordListRelationFilter = {
    every?: SentenceWordWhereInput
    some?: SentenceWordWhereInput
    none?: SentenceWordWhereInput
  }

  export type SentenceWordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SentenceCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    translate?: SortOrder
    createdAt?: SortOrder
  }

  export type SentenceAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SentenceMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    translate?: SortOrder
    createdAt?: SortOrder
  }

  export type SentenceMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    translate?: SortOrder
    createdAt?: SortOrder
  }

  export type SentenceSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WordCountOrderByAggregateInput = {
    id?: SortOrder
    word?: SortOrder
    meaning?: SortOrder
    createdAt?: SortOrder
  }

  export type WordAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type WordMaxOrderByAggregateInput = {
    id?: SortOrder
    word?: SortOrder
    meaning?: SortOrder
    createdAt?: SortOrder
  }

  export type WordMinOrderByAggregateInput = {
    id?: SortOrder
    word?: SortOrder
    meaning?: SortOrder
    createdAt?: SortOrder
  }

  export type WordSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type SentenceScalarRelationFilter = {
    is?: SentenceWhereInput
    isNot?: SentenceWhereInput
  }

  export type WordScalarRelationFilter = {
    is?: WordWhereInput
    isNot?: WordWhereInput
  }

  export type SentenceWordCountOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    sentenceId?: SortOrder
    wordId?: SortOrder
  }

  export type SentenceWordAvgOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    sentenceId?: SortOrder
    wordId?: SortOrder
  }

  export type SentenceWordMaxOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    sentenceId?: SortOrder
    wordId?: SortOrder
  }

  export type SentenceWordMinOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    sentenceId?: SortOrder
    wordId?: SortOrder
  }

  export type SentenceWordSumOrderByAggregateInput = {
    id?: SortOrder
    order?: SortOrder
    sentenceId?: SortOrder
    wordId?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SentenceWordCreateNestedManyWithoutSentenceInput = {
    create?: XOR<SentenceWordCreateWithoutSentenceInput, SentenceWordUncheckedCreateWithoutSentenceInput> | SentenceWordCreateWithoutSentenceInput[] | SentenceWordUncheckedCreateWithoutSentenceInput[]
    connectOrCreate?: SentenceWordCreateOrConnectWithoutSentenceInput | SentenceWordCreateOrConnectWithoutSentenceInput[]
    createMany?: SentenceWordCreateManySentenceInputEnvelope
    connect?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
  }

  export type SentenceWordUncheckedCreateNestedManyWithoutSentenceInput = {
    create?: XOR<SentenceWordCreateWithoutSentenceInput, SentenceWordUncheckedCreateWithoutSentenceInput> | SentenceWordCreateWithoutSentenceInput[] | SentenceWordUncheckedCreateWithoutSentenceInput[]
    connectOrCreate?: SentenceWordCreateOrConnectWithoutSentenceInput | SentenceWordCreateOrConnectWithoutSentenceInput[]
    createMany?: SentenceWordCreateManySentenceInputEnvelope
    connect?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
  }

  export type SentenceWordUpdateManyWithoutSentenceNestedInput = {
    create?: XOR<SentenceWordCreateWithoutSentenceInput, SentenceWordUncheckedCreateWithoutSentenceInput> | SentenceWordCreateWithoutSentenceInput[] | SentenceWordUncheckedCreateWithoutSentenceInput[]
    connectOrCreate?: SentenceWordCreateOrConnectWithoutSentenceInput | SentenceWordCreateOrConnectWithoutSentenceInput[]
    upsert?: SentenceWordUpsertWithWhereUniqueWithoutSentenceInput | SentenceWordUpsertWithWhereUniqueWithoutSentenceInput[]
    createMany?: SentenceWordCreateManySentenceInputEnvelope
    set?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
    disconnect?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
    delete?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
    connect?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
    update?: SentenceWordUpdateWithWhereUniqueWithoutSentenceInput | SentenceWordUpdateWithWhereUniqueWithoutSentenceInput[]
    updateMany?: SentenceWordUpdateManyWithWhereWithoutSentenceInput | SentenceWordUpdateManyWithWhereWithoutSentenceInput[]
    deleteMany?: SentenceWordScalarWhereInput | SentenceWordScalarWhereInput[]
  }

  export type SentenceWordUncheckedUpdateManyWithoutSentenceNestedInput = {
    create?: XOR<SentenceWordCreateWithoutSentenceInput, SentenceWordUncheckedCreateWithoutSentenceInput> | SentenceWordCreateWithoutSentenceInput[] | SentenceWordUncheckedCreateWithoutSentenceInput[]
    connectOrCreate?: SentenceWordCreateOrConnectWithoutSentenceInput | SentenceWordCreateOrConnectWithoutSentenceInput[]
    upsert?: SentenceWordUpsertWithWhereUniqueWithoutSentenceInput | SentenceWordUpsertWithWhereUniqueWithoutSentenceInput[]
    createMany?: SentenceWordCreateManySentenceInputEnvelope
    set?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
    disconnect?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
    delete?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
    connect?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
    update?: SentenceWordUpdateWithWhereUniqueWithoutSentenceInput | SentenceWordUpdateWithWhereUniqueWithoutSentenceInput[]
    updateMany?: SentenceWordUpdateManyWithWhereWithoutSentenceInput | SentenceWordUpdateManyWithWhereWithoutSentenceInput[]
    deleteMany?: SentenceWordScalarWhereInput | SentenceWordScalarWhereInput[]
  }

  export type SentenceWordCreateNestedManyWithoutWordInput = {
    create?: XOR<SentenceWordCreateWithoutWordInput, SentenceWordUncheckedCreateWithoutWordInput> | SentenceWordCreateWithoutWordInput[] | SentenceWordUncheckedCreateWithoutWordInput[]
    connectOrCreate?: SentenceWordCreateOrConnectWithoutWordInput | SentenceWordCreateOrConnectWithoutWordInput[]
    createMany?: SentenceWordCreateManyWordInputEnvelope
    connect?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
  }

  export type SentenceWordUncheckedCreateNestedManyWithoutWordInput = {
    create?: XOR<SentenceWordCreateWithoutWordInput, SentenceWordUncheckedCreateWithoutWordInput> | SentenceWordCreateWithoutWordInput[] | SentenceWordUncheckedCreateWithoutWordInput[]
    connectOrCreate?: SentenceWordCreateOrConnectWithoutWordInput | SentenceWordCreateOrConnectWithoutWordInput[]
    createMany?: SentenceWordCreateManyWordInputEnvelope
    connect?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type SentenceWordUpdateManyWithoutWordNestedInput = {
    create?: XOR<SentenceWordCreateWithoutWordInput, SentenceWordUncheckedCreateWithoutWordInput> | SentenceWordCreateWithoutWordInput[] | SentenceWordUncheckedCreateWithoutWordInput[]
    connectOrCreate?: SentenceWordCreateOrConnectWithoutWordInput | SentenceWordCreateOrConnectWithoutWordInput[]
    upsert?: SentenceWordUpsertWithWhereUniqueWithoutWordInput | SentenceWordUpsertWithWhereUniqueWithoutWordInput[]
    createMany?: SentenceWordCreateManyWordInputEnvelope
    set?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
    disconnect?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
    delete?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
    connect?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
    update?: SentenceWordUpdateWithWhereUniqueWithoutWordInput | SentenceWordUpdateWithWhereUniqueWithoutWordInput[]
    updateMany?: SentenceWordUpdateManyWithWhereWithoutWordInput | SentenceWordUpdateManyWithWhereWithoutWordInput[]
    deleteMany?: SentenceWordScalarWhereInput | SentenceWordScalarWhereInput[]
  }

  export type SentenceWordUncheckedUpdateManyWithoutWordNestedInput = {
    create?: XOR<SentenceWordCreateWithoutWordInput, SentenceWordUncheckedCreateWithoutWordInput> | SentenceWordCreateWithoutWordInput[] | SentenceWordUncheckedCreateWithoutWordInput[]
    connectOrCreate?: SentenceWordCreateOrConnectWithoutWordInput | SentenceWordCreateOrConnectWithoutWordInput[]
    upsert?: SentenceWordUpsertWithWhereUniqueWithoutWordInput | SentenceWordUpsertWithWhereUniqueWithoutWordInput[]
    createMany?: SentenceWordCreateManyWordInputEnvelope
    set?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
    disconnect?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
    delete?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
    connect?: SentenceWordWhereUniqueInput | SentenceWordWhereUniqueInput[]
    update?: SentenceWordUpdateWithWhereUniqueWithoutWordInput | SentenceWordUpdateWithWhereUniqueWithoutWordInput[]
    updateMany?: SentenceWordUpdateManyWithWhereWithoutWordInput | SentenceWordUpdateManyWithWhereWithoutWordInput[]
    deleteMany?: SentenceWordScalarWhereInput | SentenceWordScalarWhereInput[]
  }

  export type SentenceCreateNestedOneWithoutSentenceWordsInput = {
    create?: XOR<SentenceCreateWithoutSentenceWordsInput, SentenceUncheckedCreateWithoutSentenceWordsInput>
    connectOrCreate?: SentenceCreateOrConnectWithoutSentenceWordsInput
    connect?: SentenceWhereUniqueInput
  }

  export type WordCreateNestedOneWithoutSentenceWordsInput = {
    create?: XOR<WordCreateWithoutSentenceWordsInput, WordUncheckedCreateWithoutSentenceWordsInput>
    connectOrCreate?: WordCreateOrConnectWithoutSentenceWordsInput
    connect?: WordWhereUniqueInput
  }

  export type SentenceUpdateOneRequiredWithoutSentenceWordsNestedInput = {
    create?: XOR<SentenceCreateWithoutSentenceWordsInput, SentenceUncheckedCreateWithoutSentenceWordsInput>
    connectOrCreate?: SentenceCreateOrConnectWithoutSentenceWordsInput
    upsert?: SentenceUpsertWithoutSentenceWordsInput
    connect?: SentenceWhereUniqueInput
    update?: XOR<XOR<SentenceUpdateToOneWithWhereWithoutSentenceWordsInput, SentenceUpdateWithoutSentenceWordsInput>, SentenceUncheckedUpdateWithoutSentenceWordsInput>
  }

  export type WordUpdateOneRequiredWithoutSentenceWordsNestedInput = {
    create?: XOR<WordCreateWithoutSentenceWordsInput, WordUncheckedCreateWithoutSentenceWordsInput>
    connectOrCreate?: WordCreateOrConnectWithoutSentenceWordsInput
    upsert?: WordUpsertWithoutSentenceWordsInput
    connect?: WordWhereUniqueInput
    update?: XOR<XOR<WordUpdateToOneWithWhereWithoutSentenceWordsInput, WordUpdateWithoutSentenceWordsInput>, WordUncheckedUpdateWithoutSentenceWordsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SentenceWordCreateWithoutSentenceInput = {
    order: number
    word: WordCreateNestedOneWithoutSentenceWordsInput
  }

  export type SentenceWordUncheckedCreateWithoutSentenceInput = {
    id?: number
    order: number
    wordId: number
  }

  export type SentenceWordCreateOrConnectWithoutSentenceInput = {
    where: SentenceWordWhereUniqueInput
    create: XOR<SentenceWordCreateWithoutSentenceInput, SentenceWordUncheckedCreateWithoutSentenceInput>
  }

  export type SentenceWordCreateManySentenceInputEnvelope = {
    data: SentenceWordCreateManySentenceInput | SentenceWordCreateManySentenceInput[]
    skipDuplicates?: boolean
  }

  export type SentenceWordUpsertWithWhereUniqueWithoutSentenceInput = {
    where: SentenceWordWhereUniqueInput
    update: XOR<SentenceWordUpdateWithoutSentenceInput, SentenceWordUncheckedUpdateWithoutSentenceInput>
    create: XOR<SentenceWordCreateWithoutSentenceInput, SentenceWordUncheckedCreateWithoutSentenceInput>
  }

  export type SentenceWordUpdateWithWhereUniqueWithoutSentenceInput = {
    where: SentenceWordWhereUniqueInput
    data: XOR<SentenceWordUpdateWithoutSentenceInput, SentenceWordUncheckedUpdateWithoutSentenceInput>
  }

  export type SentenceWordUpdateManyWithWhereWithoutSentenceInput = {
    where: SentenceWordScalarWhereInput
    data: XOR<SentenceWordUpdateManyMutationInput, SentenceWordUncheckedUpdateManyWithoutSentenceInput>
  }

  export type SentenceWordScalarWhereInput = {
    AND?: SentenceWordScalarWhereInput | SentenceWordScalarWhereInput[]
    OR?: SentenceWordScalarWhereInput[]
    NOT?: SentenceWordScalarWhereInput | SentenceWordScalarWhereInput[]
    id?: IntFilter<"SentenceWord"> | number
    order?: IntFilter<"SentenceWord"> | number
    sentenceId?: IntFilter<"SentenceWord"> | number
    wordId?: IntFilter<"SentenceWord"> | number
  }

  export type SentenceWordCreateWithoutWordInput = {
    order: number
    sentence: SentenceCreateNestedOneWithoutSentenceWordsInput
  }

  export type SentenceWordUncheckedCreateWithoutWordInput = {
    id?: number
    order: number
    sentenceId: number
  }

  export type SentenceWordCreateOrConnectWithoutWordInput = {
    where: SentenceWordWhereUniqueInput
    create: XOR<SentenceWordCreateWithoutWordInput, SentenceWordUncheckedCreateWithoutWordInput>
  }

  export type SentenceWordCreateManyWordInputEnvelope = {
    data: SentenceWordCreateManyWordInput | SentenceWordCreateManyWordInput[]
    skipDuplicates?: boolean
  }

  export type SentenceWordUpsertWithWhereUniqueWithoutWordInput = {
    where: SentenceWordWhereUniqueInput
    update: XOR<SentenceWordUpdateWithoutWordInput, SentenceWordUncheckedUpdateWithoutWordInput>
    create: XOR<SentenceWordCreateWithoutWordInput, SentenceWordUncheckedCreateWithoutWordInput>
  }

  export type SentenceWordUpdateWithWhereUniqueWithoutWordInput = {
    where: SentenceWordWhereUniqueInput
    data: XOR<SentenceWordUpdateWithoutWordInput, SentenceWordUncheckedUpdateWithoutWordInput>
  }

  export type SentenceWordUpdateManyWithWhereWithoutWordInput = {
    where: SentenceWordScalarWhereInput
    data: XOR<SentenceWordUpdateManyMutationInput, SentenceWordUncheckedUpdateManyWithoutWordInput>
  }

  export type SentenceCreateWithoutSentenceWordsInput = {
    content: string
    translate: string
    createdAt?: Date | string
  }

  export type SentenceUncheckedCreateWithoutSentenceWordsInput = {
    id?: number
    content: string
    translate: string
    createdAt?: Date | string
  }

  export type SentenceCreateOrConnectWithoutSentenceWordsInput = {
    where: SentenceWhereUniqueInput
    create: XOR<SentenceCreateWithoutSentenceWordsInput, SentenceUncheckedCreateWithoutSentenceWordsInput>
  }

  export type WordCreateWithoutSentenceWordsInput = {
    word: string
    meaning?: string | null
    createdAt?: Date | string
  }

  export type WordUncheckedCreateWithoutSentenceWordsInput = {
    id?: number
    word: string
    meaning?: string | null
    createdAt?: Date | string
  }

  export type WordCreateOrConnectWithoutSentenceWordsInput = {
    where: WordWhereUniqueInput
    create: XOR<WordCreateWithoutSentenceWordsInput, WordUncheckedCreateWithoutSentenceWordsInput>
  }

  export type SentenceUpsertWithoutSentenceWordsInput = {
    update: XOR<SentenceUpdateWithoutSentenceWordsInput, SentenceUncheckedUpdateWithoutSentenceWordsInput>
    create: XOR<SentenceCreateWithoutSentenceWordsInput, SentenceUncheckedCreateWithoutSentenceWordsInput>
    where?: SentenceWhereInput
  }

  export type SentenceUpdateToOneWithWhereWithoutSentenceWordsInput = {
    where?: SentenceWhereInput
    data: XOR<SentenceUpdateWithoutSentenceWordsInput, SentenceUncheckedUpdateWithoutSentenceWordsInput>
  }

  export type SentenceUpdateWithoutSentenceWordsInput = {
    content?: StringFieldUpdateOperationsInput | string
    translate?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SentenceUncheckedUpdateWithoutSentenceWordsInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    translate?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordUpsertWithoutSentenceWordsInput = {
    update: XOR<WordUpdateWithoutSentenceWordsInput, WordUncheckedUpdateWithoutSentenceWordsInput>
    create: XOR<WordCreateWithoutSentenceWordsInput, WordUncheckedCreateWithoutSentenceWordsInput>
    where?: WordWhereInput
  }

  export type WordUpdateToOneWithWhereWithoutSentenceWordsInput = {
    where?: WordWhereInput
    data: XOR<WordUpdateWithoutSentenceWordsInput, WordUncheckedUpdateWithoutSentenceWordsInput>
  }

  export type WordUpdateWithoutSentenceWordsInput = {
    word?: StringFieldUpdateOperationsInput | string
    meaning?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordUncheckedUpdateWithoutSentenceWordsInput = {
    id?: IntFieldUpdateOperationsInput | number
    word?: StringFieldUpdateOperationsInput | string
    meaning?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SentenceWordCreateManySentenceInput = {
    id?: number
    order: number
    wordId: number
  }

  export type SentenceWordUpdateWithoutSentenceInput = {
    order?: IntFieldUpdateOperationsInput | number
    word?: WordUpdateOneRequiredWithoutSentenceWordsNestedInput
  }

  export type SentenceWordUncheckedUpdateWithoutSentenceInput = {
    id?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    wordId?: IntFieldUpdateOperationsInput | number
  }

  export type SentenceWordUncheckedUpdateManyWithoutSentenceInput = {
    id?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    wordId?: IntFieldUpdateOperationsInput | number
  }

  export type SentenceWordCreateManyWordInput = {
    id?: number
    order: number
    sentenceId: number
  }

  export type SentenceWordUpdateWithoutWordInput = {
    order?: IntFieldUpdateOperationsInput | number
    sentence?: SentenceUpdateOneRequiredWithoutSentenceWordsNestedInput
  }

  export type SentenceWordUncheckedUpdateWithoutWordInput = {
    id?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    sentenceId?: IntFieldUpdateOperationsInput | number
  }

  export type SentenceWordUncheckedUpdateManyWithoutWordInput = {
    id?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    sentenceId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}