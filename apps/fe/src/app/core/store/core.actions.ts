export class ShowNotification {
  constructor(
    public title: string,
    public message: string,
    public type: 'success' | 'info' | 'warning' | 'error' = 'success'
  ) {}

  public static readonly type = '[Core] Show notification';
}
