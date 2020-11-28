import { parseVacanciesPredict1606571349242 } from './1606571349242-parce-predict';
import { parseFrequencyPredict1606571349242 } from './1606573824016-skills-frequency';
import { importDataSet1606571179875 } from './1606571179875-importDataSet';
import { changeSchema1606587380646 } from './1606587380646-change-schema';

export const allMigrations = [importDataSet1606571179875, parseVacanciesPredict1606571349242, parseFrequencyPredict1606571349242, changeSchema1606587380646];
