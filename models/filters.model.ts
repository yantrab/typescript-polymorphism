import * as _ from 'lodash';
import { Filter } from './filter.base.model';

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
