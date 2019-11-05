export abstract class Filter {
  fieldPath: string;
  id: string;
  kind: string;
  constructor(filter: Partial<Filter>) {
    Object.assign(this, filter);
    this.kind = this.constructor.name;
    if (!this.id) this.id = (+new Date()).toString();
  }

  filter(data: any[], selected: any) {
    throw new Error("not implemented");
  }
}
