export class CommonService {

  static enumToArray(enumeration: any): string[] {
    return Object.keys(enumeration)
      .map(key => Number.isInteger(enumeration[key]) ? key : enumeration[key]);
  }

  static difference(first, second) {
    return first.filter(x => !second.includes(x));
  }

  static intersection(first, second) {
    return first.filter(x => second.includes(x));
  }
}
