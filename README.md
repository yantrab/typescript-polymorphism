# typescript-polymorphism

An example of how to implement polymorphism in typescript

Polymorphism in typescript.

Anyone who comes from .net or java probably knows what polymorphism is. Whoever does not, will understand later from example.

Suppose we want a generic data filtering system. The product manager will set the filters, and the users will be able to filter by them.

Let's take two sample filters:

1. By range.
2. By Boolean parameter.

In functional programming, to activate the filter, we will write function with some switch case, and do filter according to the filter type. In DDD programming, we will write the logic in the model itself.

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

And the filters:

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
Now, when product manager will create filters, each filter will have the filter implementaion.

The problem is that when we pass the filters to the client, or before that, when we save the filter list in the database, we lose all functionality.

To solve it, we will add `kind` parameter  to base class, and initial it with `this.constructor.name`.

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

So now, for `const filters = [new RangeFilter({fieldPath:'some-path'}), new YesNoFilter({fieldPath:'some-path'})]`,  each filter get here kind.

Finally, on a client side, we need to instantiate them:

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
