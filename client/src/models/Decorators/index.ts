export function Translate(datas: { i18n_key: string }) {
  return function (target: any, propertyKey: string) {
    let value: string;
    const setter = function (val: any) {
      value = `${val}{{i18n_${datas.i18n_key}}}`;
    };
    const getter = function () {
      return value;
    };
    return Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
    });
  };
}
