// I've included some sample typescript content, but this is by no means everything

import "./hi"; // You can import a file like this.
import { add } from "./module"; // If it has stuff to offer (exports), do it like so.
import * as MathLibz from "./module" // This works too.

// Here are some useful resources:
// * a quick overview: https://developer.mozilla.org/en-US/docs/Glossary/TypeScript
// * The official typescript documentation: https://www.typescriptlang.org/docs/
// * Net Ninja's typescript tutorial series (REALLY GOOD): https://www.youtube.com/watch?v=2pZmKW9-I_k&list=PL4cUxeGkcC9gUgr39Q_yD6v-bSyMwKPUI
// * the primitives of javascript: https://developer.mozilla.org/en-US/docs/Glossary/Primitive

// This extension is also really nice. Makes typescript errors an actual UI and very easy to read. Well, relatively speaking.
// https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors

// If this is your first time working with typescript, I highly suggest you mess around with these. Maybe even keep this file for reference.

// Basic Types
let ichikaAge: number = 25;
let ichikaName: string = "Ichika";
let isIchikaActive: boolean = true;


// Arrays and tuples
let values: number[] = [1, 2, 3, 4];
let user: [string, number] = [ichikaName, ichikaAge]; // This is called a tuple btw
console.log(user, values);


// Interfaces (these are your object types)
interface Person {
    name: string;
    age: number;
    isActive?: boolean; // optional property
}

const user1: Person = {
    name: ichikaName,
    age: ichikaAge,
    isActive: isIchikaActive
}; // as const; // this object can't be modified when it's "as const"
user1.isActive = false;

const user2: Person = {
    name: "Yukina",
    age: 31
}

// array of Person
const people: Person[] = [user1];
people.push(user2);

console.log(people);


// Functions
console.log(add(4, 6));
console.log(MathLibz.add(4, 6));


function makeGreeting(name: string, age: number): string {
    return `Hello ${name}, you are ${age} years old.`;
}
console.log(makeGreeting(user1.name, user1.age));


function makeGreetingWithObj(person: Person): string {
    return `Hello ${person.name}, you are ${person.age} years old.`;
}
console.log(makeGreetingWithObj(user2));

// This function has nothing to return! So we use return type "void"
function log(message: string): void {
    console.log(message);
}
log("Hmm...");


// Union Types
// Ideally, everything is statically typed and predictable. This helps V8 turbofan turn our javascript into faster machine code, and keeps it easy to understand for us.
// However, in the real world, that's not always the case.
const value: string | number = 42;
console.log("String or number: ", value);


// Generics
// These are basically just function parameters for types
function identity<T>(value: T): T {
    return value;
}
identity<string>("Hello World.");
identity<number>(42);


// Classes
// There's *alot* more than this, but this is just a general example
class Entity {
    public static entities: Map<number, Entity> = new Map<number, Entity>() // A map! But strict!
    private static _idTicker: number = 0; // Private property; only accessible within the class. The underscore is not required, but...
    // it's common practice. This is NOT runtime enforced, which is why we add the underscore to let JS developers know.
    
    public readonly id: number = Entity._idTicker++; // readonly; once set, nothing else can modify it. This is NOT runtime enforced.
    public x: number; // Properties that are explicitely defined in the constructor, DON'T give them a value! It's a waste.
    public y: number;
    public radius: number;
    // Now something like this, keep it.
    private _somewhatSecret: string = "The cake is a lie..."; // I couldn't think of something to put here; private works here too.
    constructor(x: number, y: number, radius: number) { // no return type on constructor
        this.x = x;
        this.y = y;
        this.radius = radius;
        console.log(this._somewhatSecret);
    }

    public teleport(x: number, y: number): void { // public/private applies here as well
        const dx: number = x - this.x;
        const dy: number = y - this.y;
        this.x += dx;
        this.y += dy;
    }
}

// This is a big thing. Notice how typescript is safely able to assume entity's type.
// I HIGHLY recommend you DON'T do this. This will eventually slow the typescript server down, as well as adds ambiguity to what should be strongly typed.
// If you can strongly type it, strongly type it. It helps you, the developer(s), and the typescript compiler.
const entity/*: Entity*/ = new Entity(100, 100, 20);
// console.log(entity._somewhatSecret);
entity.teleport(25, 25);
console.log(entity.x);


// Promises
async function getPost(url: string): Promise<string> { // if a function is async, wrap the return type in a Promise<> type constructor
    const response: Response = await fetch(url);
    return await response.text();
}
getPost("https://jsonplaceholder.typicode.com/posts/1").then((data: string) => console.log(data));


// The index.ts file must have an expoert declaration for dts-bundle-generator
// If you have nothing to export, just do this. You don't need to do this for other files.
// export { }; 

// If you do something like this, these will be exposed publically, weither that means being accessible on a wrapper object or importable from anoter project using you as a library.
// Check out dist/index.d.ts after building if you modify this.
export {
    /*add,
    getPost,
    Entity*/
};