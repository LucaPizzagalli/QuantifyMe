from flask import Blueprint, jsonify, request
import pandas as pd
import plotly.graph_objects as go
import plotly
from .data import REPORT, LEGEND

main = Blueprint('main', __name__)

@main.route('/add_day', methods=['POST'])
def add_day():
    day_data = request.get_json()
    new_day = {day_data['date_str']}
    return 'done', 201

@main.route('/get_report')
def get_report():
    return REPORT.to_json(orient='records')

@main.route('/get_last_10_days')
def get_last_10_days():
    return REPORT.head(10).to_json(orient='records')

@main.route('/get_legend')
def get_legend():
    return jsonify(LEGEND)

@main.route('/get_happines_plot')
def get_happines_plot():

    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=REPORT.index,
        y=REPORT['happiness'],
        name='Gaps',
        connectgaps=False
    ))
    plot_div = plotly.offline.plot(fig, include_plotlyjs=False, output_type='div')
    plot_div, plot_js = plot_div[6:-7].split('<script type="text/javascript">')
    plot_js = plot_js.replace('</script>', '')

    return jsonify({'plot_div': plot_div, 'plot_js': plot_js})
