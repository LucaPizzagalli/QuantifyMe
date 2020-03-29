'''QuantifyMe the self quantification app'''
from datetime import datetime
from itertools import chain
import pandas as pd
# import re

class Report:
    filename = None
    legend = {'legend':{}, 'order':[]}
    days = None
    others = []

    def read_report(self, filename):
        '''Reads the report'''

        def interpret_day(raw_day):
            day = {}
            day['date'] = datetime.strptime(raw_day[0], '%Y.%m.%d')
            day['others'] = []
            for line in raw_day[1:]:
                pieces = line.split(':')
                if len(pieces) == 1:
                    day['others'].append(line.strip())
                else:
                    head = pieces[0].strip().lower()
                    tail = pieces[1].strip()
                    if head in ['happiness']:
                        happiness = tail
                        try:
                            day['happiness'] = int(happiness)
                        except ValueError:
                            import sys
                            print(happiness, file=sys.stderr)
                    elif head in ['place', 'slept']:
                        day['place'] = tail
                    elif head in ['social']:
                        day['social'] = tail
                    elif head in ['workout', 'training', 'activity']:
                        day['workout'] = tail
                    elif head in ['study']:
                        day['study'] = tail
                    elif head in ['culture', 'cultural']:
                        day['culture'] = tail
                    elif head in ['work']:
                        day['work'] = tail
                    elif head in ['finances', 'financial situation', 'finance']:
                        day['finances'] = tail
                    elif head in ['lesson', 'lesson learned', 'lessons learned']:
                        day['lesson'] = tail
                    elif head in ['highlights', 'recap', 'summary']:
                        day['recap'] = tail
                    else:
                        day['others'].append(line.strip())
            return day

        def interpret_legend(raw_legend):
            if not raw_legend[0].startswith('### '):
                raise ValueError('Not a legend')
            legend_key = raw_legend[0][4:].strip().lower()
            element = {'rating': [], 'text': ''}
            for line in raw_legend[1:]:
                pieces = line.split(':')
                if pieces[0].strip().isdigit():
                    element['rating'].append(pieces[1].strip())
                else:
                    element['text'] = element['text'] + '\n' + line.strip()
            self.legend['legend'][legend_key] = element
            self.legend['order'].append(legend_key)

        self.filename = filename
        with open(self.filename, 'r') as handle:
            days = []
            block = []
            for line in chain(handle, ['']):
                line = line.strip()
                if line == '':
                    if block:
                        try:
                            days.append(interpret_day(block))
                        except ValueError:
                            try:
                                interpret_legend(block)
                            except ValueError:
                                self.others.append(block)
                        block = []
                else:
                    block.append(line)
        self.days = pd.DataFrame(days)
        self.days.set_index('date', drop=False, inplace=True)
        self.days['date'] = self.days['date'].dt.strftime('%Y-%m-%d')
        self.days.sort_index(ascending=False, inplace=True)
        # days.sort_values(by='Date')

    def add_day(self, day_data):
        with open(self.filename, 'a') as handle:
            handle.write('')
            handle.write('\n\n' + day_data['date'] + '\n')
            for field in self.legend['order'][1:]:
                if field not in [-1, '']:
                    handle.write(field + ': ' + str(day_data[field]) + '\n')
        self.days = self.days.append(pd.Series(day_data, name=datetime.strptime(day_data['date'], '%Y-%m-%d')))

REPORT = Report()
REPORT.read_report('report.txt')