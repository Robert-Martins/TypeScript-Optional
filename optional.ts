import { isNull, nonNull, requireNonNull } from "./utils";

/**
 * Author: Robert-Martins
 * 
 * Repository: https://github.com/Robert-Martins/TypeScript-Optional
 * 
 * Class that represents an Optional Element
 * 
 * To initialize an Optional, use the static methods of or ofNullable
 * 
 */
export class Optional<T> {
    private value: T;

    private static EMPTY: Optional<any> = new Optional();

    private constructor(value?: T) {
        if(nonNull(value))
            this.value = value as T;
    }

    /**
     * 
     * Accepts a nonNull value, if the value is null or undefined, an error will be throwed.
     * 
     * Otherwise, it will return an Optional of the Element.
     * 
     * To allow null values use the ofNullable static method.
     * 
     * @param {T} value - Value that will be tested 
     * @returns {Optional<T>} Optional of the value
     * 
     */
    public static of<T>(value: T): Optional<T> {
        return new Optional(requireNonNull(value));
    }

    /**
     * 
     * Accepts a value and return an Optional wrapping the element.
     * 
     * @param {T} value - Value that will be wrapped
     * @returns {Optional<T>} Optional of the value
     * 
     */
    public static ofNullable<T>(value: T): Optional<T> {
        return isNull(value) ? this.EMPTY : new Optional(value);
    }

    /**
     * 
     * Returns the value wrapped by the Optional that may be null
     * 
     * @returns {T} - Value wrapped by the Optional that may be null
     */
    public get(): T {
        return this.value;
    }

    /**
     * 
     * Method that gets the indicator that shows if the wrapped value is Null or Undefined
     * 
     * @returns {boolean} - True if the value is Null or Undefined
     */
    public isEmpty(): boolean {
        return isNull(this.value);
    }

    /**
     * 
     * Method that gets the indicator that shows if the wrapped value isn't Null or Undefined
     * 
     * @returns {boolean} - True if the value isn't Null or Undefined
     */
    public isPresent(): boolean {
        return nonNull(this.value);
    }

    /**
     * 
     * Method that allows the filtering of the value wrapped in the Optional.
     * 
     * If the Optional value is Null or Undefined or the value doesn't match the predicate, 
     * an Empty Optional will be returned.
     * 
     * If none above are true, the Optional of the value will be returned.
     * 
     * @param {(value: T) => boolean} predicate - Predicate that will be used to test the value
     * @returns 
     */
    public filter(predicate: (value: T) => boolean): Optional<T> {
        return this.isPresent() && nonNull(predicate) && predicate(this.value)
                ? this
                : Optional.EMPTY;
    }

    /**
     * 
     * Method that allows the mapping of the value wrapped in the Optional.
     * 
     * If the Optional value is Null or Undefined, 
     * an Empty Optional will be returned.
     * 
     * If it isn't, the Optional of the value will be converted by the function.
     * 
     * @param {(value: T) => U} mapFunction - Map Function that will be used to convert the value
     * @returns {Optional<U>} Empty Optional or Optional wrapping the mapped value
     */
    public map<U>(mapFunction: (value: T) => U): Optional<U> {
        return this.isEmpty() || isNull(mapFunction) 
            ? Optional.EMPTY
            : Optional.ofNullable(mapFunction(this.value));
    }

    /**
     * 
     * Method that allows the mapping of the value wrapped in the Optional.
     * 
     * If the Optional value is Null or Undefined, 
     * an Null will be returned.
     * 
     * If it isn't, the Optional of the value will be converted by the function and the value will be returned.
     * 
     * @param {(value: T) => U} mapFunction - Map Function that will be used to convert the value
     * @returns {U | null} Null or the mapped value
     */
    public flatMap<U>(mapFunction: (value: T) => U): U | null {
        return this.isEmpty() || isNull(mapFunction) 
            ? null
            : mapFunction(this.value);
    }

    /**
     * 
     * Method that allows the usage of another Optional if the value in this is Null or Undefined.
     * 
     * @param {supplier: () => Optional<T>} supplier - Supplier that will return the other Optional
     * @returns {Optional<T>} Null or the mapped value
     */
    public or(supplier: () => Optional<T>): Optional<T> {
        if(this.isPresent())
            return this;
        return isNull(supplier) 
            ? Optional.EMPTY
            : supplier();
    }

    /**
     * 
     * Method that allows the usage of another value if the value in this is Null or Undefined.
     * 
     * @param {value: T} value - The other value that may be used
     * @returns {T} The value in this on the other value
     */
    public orElse(value: T): T {
        return this.isPresent() ? this.value : value;
    }

    /**
     * 
     * Method that allows the execution of a function if the value in this isn't Null or Undefined.
     * 
     * @param {(value: T) => void} consumer - Consumer that may be applied to the value in this
     */
    public ifPresent(consumer: (value: T) => void): void {
        if(this.isPresent() && nonNull(consumer)) 
            consumer(this.value);
    }

    /**
     * 
     * Method that allows the execution of a function if the value in this isn't Null or Undefined.
     * 
     * Also, if the value is Null or Undefined, executes an empty function
     * 
     * @param {(value: T) => void} consumer - Consumer that may be applied to the value in this
     * @param {() => void} emptyAction - Empty Function that may be executed
     */
    public ifPresentOrElse(consumer: (value: T) => void, emptyAction: () => void): void {
        if(this.isPresent())
            nonNull(consumer) && consumer(this.value);
        else
            nonNull(emptyAction) && emptyAction();
    }

}