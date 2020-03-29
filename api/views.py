from flask import Blueprint, jsonify, request
from .app import REPORT

main = Blueprint('main', __name__)


@main.route('/add_day', methods=['POST'])
def add_day():
    day_data = request.get_json()
    REPORT.add_day(day_data)
    return 'done', 201


@main.route('/get_report')
def get_report():
    return REPORT.days.to_json(orient='records')


@main.route('/get_last_10_days')
def get_last_10_days():
    return REPORT.days.head(10).to_json(orient='records')


@main.route('/get_legend')
def get_legend():
    return jsonify(REPORT.legend)


@main.route('/get_happiness')
def get_happines_plot():
    output = REPORT.days[['date', 'happiness']]
    output = output.where(pd.notnull(output), None)
    output = {'date': output['date'].tolist(), 'happiness': output['happiness'].tolist()}
    return jsonify(output)
