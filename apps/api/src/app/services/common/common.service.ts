export class CommonService {

  static enumToArray(enumeration: any): string[] {
    return Object.keys(enumeration)
      .map(key => Number.isInteger(enumeration[key]) ? key : enumeration[key]);
  }
}
