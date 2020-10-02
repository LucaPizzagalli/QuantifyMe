'''Minifies csv files'''
import re
import glob

def main():
    '''main'''
    svgs = {}
    for filename in glob.glob('*.svg'):
        svgs[filename] = get_minified_svg(filename)

    react_dict = '{'
    for name, svg in svgs.items():
        react_dict += '\'' + name + '\': ' + svg + ','
    react_dict += '}'

    with open('out.txt', 'w') as f:
        f.write(react_dict)


def create_parsers(keys):
    parsers = {}
    attributes = {}
    for key in keys:
        parsers[key] = re.compile(' ' + key + r'="([^"]+)"')
        attributes[key] = []
    return parsers, attributes


def get_shapes_attributes(raw_svg, shape_name, keys):
    shape_parser = re.compile(r'<' + shape_name + r'[^>]+>')
    color_parser = re.compile(r'style="fill:#(......)')
    shapes = shape_parser.findall(raw_svg)
    parsers, attributes = create_parsers(keys)
    colors = []
    for shape in shapes:
        for key in parsers:
            attribute = parsers[key].search(shape)
            if attribute:
                attribute = attribute.group(1)
            attributes[key].append(attribute)
        color = color_parser.search(shape)
        if color:
            color = color.group(1)
        colors.append(color)
    return attributes, colors


def get_minified_svg(filename):
    '''from filename to minified svg string'''

    with open(filename) as f:
        raw_svg = f.readlines()
    raw_svg = ' '.join(raw_svg)

    attributes = {}
    colors = {}

    attributes['path'], colors['path'] = get_shapes_attributes(raw_svg, 'path', ['d'])
    attributes['circle'], colors['circle'] = get_shapes_attributes(raw_svg, 'circle', ['r', 'cx', 'cy'])
    attributes['rect'], colors['rect'] = get_shapes_attributes(raw_svg, 'rect', ['width', 'height', 'x', 'y', 'ry', 'transform'])

    color_to_class = {'5e5eec': 'col1', '2e2ee6': 'col2', 'bebebe': 'col3', 'adadad': 'col4'}
    clean_svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 512 512">'
    for shape, shape_attribute in attributes.items():
        for index, _ in enumerate(colors[shape]):
            clean_svg += '<'+shape+' className={classes.'+color_to_class[colors[shape][index]]+'} '
            for key, values in shape_attribute.items():
                if values[index]:
                    clean_svg += key+'="'+values[index]+'" '
            clean_svg += '/>'
    clean_svg += '</svg>'

    return clean_svg

main()
