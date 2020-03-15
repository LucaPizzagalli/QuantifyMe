'''QuantifyMe the self quantification app'''
from datetime import datetime
from itertools import chain
import pandas as pd
# import re


# html = '<h1>QuantifyMe</h1>'
# for index, day in days.iterrows():
#     html += '<h3>' + index.strftime('%Y.%m.%d') + '</h3>'
#     for field in days.columns:
#         html += '<p>' + field +': ' + str(day[field]) + '</p>'

# html += '<h2>Other stuff</h2>'
# for block in others:
#     html += '<p>' + str(block) + '</p>'
# return html

def read_report(filename: str) -> tuple:
    '''Reads the report'''

    def interpret_day(raw_day: list) -> dict:
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

    def interpret_legend(raw_legend, legend):
        if not raw_legend[0].startswith('### '):
            raise ValueError('Not a legend')
        legend_key = raw_legend[0][4:].strip().lower()
        legend_value = '<br />'.join(raw_legend[1:])
        legend[legend_key] = legend_value

    with open(filename, 'r') as handle:
        days = []
        legend = {}
        others = []
        block = []
        for line in chain(handle, ['']):
            line = line.strip()
            if line == '':
                if block:
                    try:
                        days.append(interpret_day(block))
                    except ValueError:
                        try:
                            interpret_legend(block, legend)
                        except ValueError:
                            others.append(block)
                    block = []
            else:
                block.append(line)
    days = pd.DataFrame(days)
    days['date_str'] = days['date'].dt.strftime('%Y.%m.%d')
    days.set_index('date', inplace=True)
    days.sort_index(ascending=False, inplace=True)
    # days.sort_values(by='Date')
    return days, legend, others

REPORT, LEGEND, OTHERS = read_report('report.txt')
