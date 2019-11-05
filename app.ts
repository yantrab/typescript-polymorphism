import { RangeFilter, YesNoFilter } from "models/filters.model";
import { Filter } from 'models/filter.base.model';
[new RangeFilter({fieldPath:''})];
const filters: Filter[] = [
    new RangeFilter(), 
    new YesNoFilter({fieldPath:'some-path'})]`