import { Optional } from "../../optional";

type PresentValuesType = number | string | boolean | object | Array<any>;

type NullableValuesType = null | undefined;

const PRESENT_VALUES: PresentValuesType[] = [1, "string", true, {}, []];

const NULLABLE_VALUES: NullableValuesType[] = [null, undefined];

describe(
    "Optional Testing",
    () => {
        describe("Optional.of(arg) Testing", () => {
            it.each(
                PRESENT_VALUES
            )("Right usage of",(arg: PresentValuesType) => 
                expect(Optional.of(arg).isPresent()).toBe(true)
            );
            it.each(
                NULLABLE_VALUES
            )("Wrong usage of",(arg) => 
                expect(() => {
                    try {
                        Optional.of(arg);
                    } catch (error) {
                        throw error;
                    }
                }).toThrow(Error)
            );
        }); //End of Optional.of(arg) Testing
        describe("Optional.ofNullable(arg) Testing", () => {
            it.each(
                PRESENT_VALUES
            )("Right usage of",(arg: PresentValuesType) => 
                expect(Optional.ofNullable(arg).isPresent()).toBe(true)
            );
            it.each(
                NULLABLE_VALUES
            )("Wrong usage of",(arg: NullableValuesType) => 
                expect(Optional.ofNullable(arg).isEmpty()).toBe(true)
            );
        }); //End of Optional.ofNullable(arg) Testing
        describe("Optional.empty() Testing", () => {
            it("Right usage of",() => 
                expect(Optional.empty().isEmpty()).toBe(true)
            );
        }); //End of Optional.empty() Testing
        describe("Optional.get() Testing", () => {
            it.each(
                PRESENT_VALUES
            )("Right usage of",(arg: PresentValuesType) => 
                expect(Optional.of(arg).get()).toBe(arg)
            );
            it.each(
                NULLABLE_VALUES
            )("Wrong usage of",(arg: NullableValuesType) => 
                expect(() => {
                    try {
                        Optional.ofNullable(arg).get();
                    } catch (error) {
                        throw error;
                    }
                }).toThrow(Error)
            );
        }); //End of Optional.get() Testing
        describe("Optional.isEmpty() Testing", () => {
            it.each(
                PRESENT_VALUES
            )("Right usage of",(arg: PresentValuesType) => 
                expect(Optional.of(arg).isEmpty()).toBe(false)
            );
            it.each(
                NULLABLE_VALUES
            )("Wrong usage of",(arg: NullableValuesType) => 
                expect(Optional.ofNullable(arg).isEmpty()).toBe(true)
            );
        }); //End of Optional.isEmpty() Testing
        describe("Optional.isPresent() Testing", () => {
            it.each(
                PRESENT_VALUES
            )("Right usage of",(arg: PresentValuesType) => 
                expect(Optional.of(arg).isPresent()).toBe(true)
            );
            it.each(
                NULLABLE_VALUES
            )("Wrong usage of",(arg: NullableValuesType) => 
                expect(Optional.ofNullable(arg).isPresent()).toBe(false)
            );
        }); //End of Optional.isPresent() Testing
        describe("Optional.filter() Testing", () => {
            it("Right usage of",() => 
                expect(Optional.ofNullable("char").filter(val => typeof val === "string").isPresent()).toBe(true)
            );
            it("Right usage of", () =>
                expect(Optional.ofNullable("char").filter(val => typeof val === "number").isEmpty()).toBe(true)
            );
            it("Right usage of",() => 
                expect(Optional.ofNullable("char").filter(val => typeof val === "string").get()).toBe("char")
            );
        }); //End of Optional.filter() Testing
        describe("Optional.map() Testing", () => {
            it("Right usage of",() => 
                expect(Optional.ofNullable("char").map(val => val.toUpperCase()).get()).toBe("CHAR")
            );
            it("Right usage of",() => 
                expect(Optional.ofNullable("char").map(val => val.toUpperCase()).isPresent()).toBe(true)
            );
            it("Right usage of",() => 
                expect(Optional.ofNullable("char").map(val => val.toUpperCase()).isEmpty()).toBe(false)
            );
            it("Right usage of",() => 
                expect(Optional.ofNullable("char").map(val => val.toUpperCase()).filter(val => val === "CHAR").isPresent()).toBe(true)
            );
            it("Right usage of",() => 
                expect(Optional.ofNullable("char").map(val => val.toUpperCase()).filter(val => val === "CHAR").isEmpty()).toBe(false)
            );
        }); //End of Optional.map() Testing
        describe("Optional.flatMap() Testing", () => {
            it("Right usage of",() => 
                expect(Optional.ofNullable("char").flatMap(val => val.toUpperCase())).toBe("CHAR")
            );
        }); //End of Optional.flatMap() Testing
        describe("Optional.or() Testing", () => {
            it("Right usage of",() => 
                expect(Optional.ofNullable("char").or(Optional.ofNullable("default")).get()).toBe("char")
            );
            it("Right usage of",() => 
                expect(Optional.ofNullable("char").filter(() => false).or(Optional.ofNullable("default")).get()).toBe("default")
            );
        }); //End of Optional.or() Testing
        describe("Optional.tap() Testing", () => {
            it("Right usage of",() => {
                let value: string = "";
                Optional.ofNullable("char").tap(val => value = val);
                expect(value).toBe("char");
            });
            it("Right usage of",() => {
                let value: string = "";
                Optional.ofNullable("char").filter(() => false).tap(val => value = val);
                expect(value).toBe("");
            });
            it("Right usage of",() => {
                let value: string = "";
                expect(Optional.ofNullable("char").tap(val => value = val).get()).toBe("char");
            });
        }); //End of Optional.tap() Testing
        describe("Optional.orElseThrow() Testing", () => {
            it("Right usage of",() => 
                expect(Optional.ofNullable("char").orElseThrow(() => new Error("Error"))).toBe("char")
            );
            it("Right usage of",() => 
                expect(() => Optional.ofNullable("char").filter(() => false).orElseThrow(() => new Error("Error"))).toThrow(Error)
            );
        }); //End of Optional.orElseThrow() Testing
        describe("Optional.ifPresent() Testing", () => {
            it("Right usage of",() => {
                let value: string = "";
                Optional.ofNullable("char").ifPresent(val => value = val);
                expect(value).toBe("char");
            });
            it("Right usage of",() => {
                let value: string = "";
                Optional.ofNullable("char").filter(() => false).ifPresent(val => value = val);
                expect(value).toBe("");
            });
        }); //End of Optional.ifPresent() Testing
        describe("Optional.ifPresentOrElse() Testing", () => {
            it("Right usage of",() => {
                let value: string = "";
                Optional.ofNullable("char").ifPresentOrElse(val => value = val, () => value = "default");
                expect(value).toBe("char");
            });
            it("Right usage of",() => {
                let value: string = "";
                Optional.ofNullable("char").filter(() => false).ifPresentOrElse(val => value = val, () => value = "default");
                expect(value).toBe("default");
            });
        }); //End of Optional.ifPresentOrElse() Testing
    }
);