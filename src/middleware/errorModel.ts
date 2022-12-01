export class ErrorModel {
  /**
   * Unique error code which identifies the error.
   */
  static code: string;
  /**
   * Status code of the error.
   */
  static status: number;
  /**
   * Any additional data that is required for translation.
   */
  public metaData?: any;
}
