'''Minifies csv files'''
import re
import glob

def main():
    '''main'''
    content = "import React from 'react';\nimport { makeStyles } from '@material-ui/core/styles';\n\n\n"
    map_text = ""
    logo_names = []

    for filename in glob.glob('*.svg'):
        print(filename + '\n\n')
        icon_name = filename[:-4]
        logo_names.append(icon_name)
        component_name = ''.join([name.title() for name in icon_name.split('-')]) + 'Icon'

        map_text += f"  ['{icon_name}', {component_name}],\n"
        svg = get_minified_svg(filename)
        content += get_component(component_name, svg)

    content += "let logos = new Map([\n"
    content += map_text
    content += "])\n\n"
    content += "let iconColors = [['#5e5eec', '#2e2ee6'], ['#d75454', '#b72a2a'], ['#49d949', '#23a523']];\n"
    content += f"let logoNames = {logo_names};\n\n"

    content += "let useStyles = makeStyles(theme => ({\n"
    content += "  col1: { fill: props => props.col1, },\n"
    content += "  col2: { fill: props => props.col2, },\n"
    content += "  col3: { fill: props => props.col3, },\n"
    content += "  col4: { fill: props => props.col4, },\n"
    content += "}));\n\n"
    content += "export { logos, iconColors, logoNames };\n"

    with open('CustomIcons.js', 'w') as handle:
        handle.write(content)


def get_component(component_name, svg):
    component = "function " + component_name + "({ color }) {\n"
    component += "  let classes = useStyles({ col1: color[0], col2: color[1], col3: '#adadad', col4: '#bebebe' });\n"
    component += "  return " + svg + ";\n"
    component += "}\n\n\n"
    return component


def create_parsers(keys):
    parsers = {}
    attributes = {}
    for key in keys:
        parsers[key] = re.compile(' ' + key + r'="([^"]+)"')
        attributes[key] = []
    return parsers, attributes


def get_shapes_attributes(raw_svg, shape_name, keys):
    shape_parser = re.compile(r'<' + shape_name + r'[^>]+>')
    color_parser = re.compile(r'(?:style=\"fill:#(......)\")|(?:fill=\"#(......)\")')
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
        assert color, shape
        colors.append(color.group(0)[-7:-1]) # .group(1)
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
