import { Filter } from './filter.base.model';
import * as Filters from './filters.model';
import { keyBy } from 'lodash';
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
