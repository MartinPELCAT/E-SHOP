let currentLocale: string = window.navigator.language.slice(0, 2) || "fr";
console.log(`locale ${currentLocale}`);
let translationFile: any = require(`../../i18n/${currentLocale}/translation.json`);
export const i18n = (
  key: string,
  datas?: { [key: string]: string }
): string => {
  if (!!!translationFile[key]) {
    console.error(
      `Unkown translation key ${key} for language ${currentLocale}`
    );
  }
  let tmpString: string = translationFile[key];
  if (!!!datas) {
    if ((tmpString.match(/{{\w+\}}/g)?.length || 0) !== 0) {
      throw new Error(`Parameters expected for ${key}`);
    }
    return translationFile[key];
  } else {
    let tmpString: string = translationFile[key];
    if (tmpString.match(/{{\w+\}}/g)?.length !== Object.keys(datas).length) {
      throw new Error(`Parameters numbers doesn't match`);
    }
    Object.keys(datas).forEach((dataKey) => {
      if (tmpString.indexOf(`{{${dataKey}}}`) === -1) {
        throw new Error(`Error building translation for key ${dataKey}`);
      }
      tmpString = tmpString.replace(`{{${dataKey}}}`, datas[dataKey]);
    });
    return tmpString;
  }
};
