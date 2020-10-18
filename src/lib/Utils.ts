export interface DynamicObject {
    [key:string]: any;
}

export const getNestedObjectElement = (keysArray: Array<string>, object: any): any => {
    if (keysArray.length == 1)
        if (object.hasOwnProperty(keysArray[0])) {
            return object[keysArray[0]];
        } else return "";
    if (
        object.hasOwnProperty(keysArray[0]) &&
        typeof object[keysArray[0]] === "object"
    ) {
        let nextKey = keysArray[0];
        let nextArray = keysArray.slice(1, keysArray.length);
        return getNestedObjectElement(nextArray, object[nextKey]);
    } else return "";
};