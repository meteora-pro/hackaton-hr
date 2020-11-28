import { importDataSet1606571179875 } from './1606571179875-importDataSet';
import { parseVacanciesPredict1606571349242 } from './1606571349242-parce-predict';
import { parseFrequencyPredict1606571349242 } from './1606573824016-skills-frequency';
import { importExistData1606574429753 } from './1606574429753-importExistData';


import { changeSchema1606587380646 } from './1606587380646-change-schema';
import { normalizeInitVacancies1606598643604 } from './1606598643604-normalizeInitVacancies';

export const allMigrations = [
  importDataSet1606571179875,
  parseVacanciesPredict1606571349242,
  parseFrequencyPredict1606571349242,
  changeSchema1606587380646,
  importExistData1606574429753,
  normalizeInitVacancies1606598643604,
];

