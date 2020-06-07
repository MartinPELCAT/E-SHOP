export const isValidBody = (body: Object, parameters: Object): boolean => {
    let bodyKeys = Object.keys(body);
    let interfaceKeys = Object.keys(parameters);
    return bodyKeys.every((e) => interfaceKeys.includes(e));
}