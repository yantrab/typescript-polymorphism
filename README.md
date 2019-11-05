# typescript-polymorphism

An example of how to implement polymorphism in typescript

Polymorphism in typescript.

Anyone who comes from .net or java probably knows what polymorphism is. Whoever does not, will understand later from example.

Suppose we want a generic data filtering system. The product manager will set the filters, and the users will be able to filter by them.

Let's take two sample filters:

1. By range.
2. By Boolean parameter.

In functional programming, to activate the filter, we will write PO with a switch case, and filter will be made according to the type of filter. In ddd programming, we will write the logic in the model itself.
First we will create an abstract model that will define a base filter.

```typescript
export abstract class Filter {
  fieldPath: string;
  id: string;
  constructor(filter: Filter) {
    Object.assign(this, filter);
  }

  filter(data: any[]) {
    throw new Error('not implemented');
  }
}
```

וניצור מודלים עבור הפילטרים
```typescript
export class RangeFilter extends Filter {
  filter(data, selected) {
    return data.filter(item =>
      _.inRange(_.get(item, this.fieldPath), selected.From, selected.Start),
    );
  }
}

export class YesNoFilter extends Filter {
  filter(data, selected) {
    return data.Filter(item => _.get(item, this.fieldPath) === selected);
  }
}
```
<p dir="rtl"> 
עכשיו שמנהל המוצר יצור פילטרים, בכל אחד יהיה את המימוש של הפילטור.
הבעיה היא שכאשר נעביר את את הפילטרים לקליינט, או לפני כן, שכאשר נשמור את רשימת הפילטרים בדיבי, נאבד את כל הפונקציונליות.
לכן, נוסיף פרמטר נוסף kind שבו נשמור את סוג הפילטר. וניצור מופעים לפי זה.
</p>
```typescript
export abstract class Filter {
...
  kind?: string;
  constructor(filter: Filter) {
    Object.assign(this, filter);
    this.kind = this.constructor.name;
  }
...
}
```
```typescript
export class FilterGroup {
    filters: { [key: string]: Filter };
    constructor(filters: Filter[]) {
        this.filters = keyBy(filters.map(filter => (new Filters[filter.kind](filter)), 'id'));
    }

    filter(data, state) {
        let result = data;
        state.selectedFilters.forEach(selected => (result = this.filters[selected.id].filter(result)));
        return result;
    }
}
```
