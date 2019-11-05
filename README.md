# typescript-polymorphism

An example of how to implement polymorphism in typescript
<p dir="rtl"> 
פולימורפיזם בטייפסקריפט.


מי שמגיע מעולם הדוט נט כנראה יודע מה זה פולימורפיזם. מי שלא, יבין לפי הדוגמא בהמשך.

נניח שאנו רוצים מערכת גנרית לפילטור נתונים. מנהל המוצר יגדיר את הפילטרים, והמשתמש יוכל לפלטר לפיהם.
ניקח שני פילטרים לדוגמא:

1. לפי טווח.
2. לפי פרמטר בולייני.

בתיכנות פונקציונלי, כדי להפעיל את הפילטור, נכתוב פו' עם switch case, ונעשה פילטור לפי הסוג של הפילטר. בתיכנות ddd, נכתוב את הלוגיקה במודל עצמו.
קודם ניצור מודל אבסטרקטי שיגדיר פילטר בסיס.
</p>
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
