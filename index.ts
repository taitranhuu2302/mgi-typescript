// Generics
const identity = <Type>(arg: Type): Type => {
  return arg;
}

let output = identity<String>("Tai Tran")
let output1 = identity("Tai Tran")
console.log("🚀 ~ file: index.ts:8 ~ output:", output, `| Type: ${typeof output}`)
console.log("🚀 ~ file: index.ts:9 ~ output1:", output1, `| Type: ${typeof output1}`)
 
// Generic Types

interface GenericIdentityFn<Type> {
  <Type>(arg: Type): Type;
}

let myIdentity: GenericIdentityFn<String> = identity;

// Generic Class

class GenericNumber<NumType> {
  zeroValue?: NumType;
  add?: (x: NumType, y: NumType) => NumType;
}
 
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};

console.log("🚀 ~ file: index.ts:32 ~ stringNumeric.add(stringNumeric.zeroValue, 'test'):", stringNumeric.add(stringNumeric.zeroValue, "test"))

// Using Type Parameters in Generic Constraints

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
console.log("🚀 ~ file: index.ts:43 ~ getProperty(x, 'a'):", getProperty(x, "a"))

// Keyof Type Operator

type Point = { x: number; y: number };
type P = keyof Point;

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
 
type Mapish = { [k: string]: boolean };
type M = keyof Mapish;

// Typeof Type Operator

console.log("🚀 ~ file: index.ts:58 ~ typeof 'Hello world':", typeof "Hello world")

function f() {
  return { x: 10, y: 3 };
}
type L = ReturnType<typeof f>;
// type L = {
//   x: number;
//   y: number;
// }

type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];
// type Age = number

type I1 = Person["age" | "name"];
// type I1 = string | number

type I2 = Person[keyof Person];
// type I2 = string | number | boolean

type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];
// type I3 = string | boolean

// Conditional Types
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}
 
type Example1 = Dog extends Animal ? number : string;
// type Example1 = number

type Example2 = RegExp extends Animal ? number : string;
// type Example2 = string

// Conditional Type Constraints
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
  message: string;
}

type EmailMessageContents = MessageOf<Email>;
// type EmailMessageContents = string

type DogMessageContents = MessageOf<Dog>;
// type DogMessageContents = never

// Mapped Types
interface Horse {
  name: String;
}

type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};
 
const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};
 
type FeatureOptions = OptionsFlags<Features>;

// Mapping Modifiers
type CreateMutable<Type> = {
  // Removes 'readonly' attributes from a type's properties
  -readonly [Property in keyof Type]: Type[Property];
};
 
type LockedAccount = {
  readonly id: string;
  readonly name: string;
};
 
type UnlockedAccount = CreateMutable<LockedAccount>;

// Removes 'optional' attributes from a type's properties
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
 
type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};
 
type User = Concrete<MaybeUser>;

// Key Remapping via 'as'
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};

interface Person1 {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person1>;

// Remove the 'kind' property
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};

interface Circle {
  kind: "circle";
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;

// Template Literal Types
type World = "world";
 
type Greeting = `hello ${World}`;
// type Greeting = "hello world"

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
 
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"

// Intrinsic String Manipulation Types
type Greeting1 = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting>
// type ShoutyGreeting = "HELLO, WORLD"

type Greeting2 = "Hello, world"
type QuietGreeting = Lowercase<Greeting>
// type QuietGreeting = "hello, world"

type LowercaseGreeting = "hello, world";
type Greeting3 = Capitalize<LowercaseGreeting>;
// type Greeting3 = "Hello, world"

type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;
// type UncomfortableGreeting = "hELLO WORLD"
