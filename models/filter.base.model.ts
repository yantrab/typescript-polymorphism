export abstract class Filter {
  fieldPath: string;
  id: string;
  kind?: string;
  constructor(filter: Filter) {
    Object.assign(this, filter);
    this.kind = this.constructor.name;
  }

  filter(data: any[]) {
    throw new Error('not implemented');
  }
}
