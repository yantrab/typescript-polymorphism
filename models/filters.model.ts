import {inRange, get} from 'lodash';
import { Filter } from './filter.base.model';

export class RangeFilter extends Filter {
  filter(data, selected) {
    return data.filter(item =>
      inRange(get(item, this.fieldPath), selected.From, selected.Start),
    );
  }
}

export class YesNoFilter extends Filter {
  filter(data, selected) {
    return data.Filter(item => get(item, this.fieldPath) === selected);
  }
}
