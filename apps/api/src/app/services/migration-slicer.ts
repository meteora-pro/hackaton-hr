export class MigrationSlicer {
  static sliceData<T = unknown>(data: T[], chunkSize = 100): T[][] {
    const result = [];
    for (let i=0; i<data.length; i+=chunkSize) {
      result.push(data.slice(i,i+chunkSize));
    }
    return result;
  }
}
