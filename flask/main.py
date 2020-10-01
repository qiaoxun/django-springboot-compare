from flask import Flask, url_for, request
import settings

app = Flask(__name__)

print(app.config)

app.config.from_object(settings)


@app.route("/")
def hello():
    return "Hello, World1!"


@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    print(request.method)
    print(request.path)
    searchword = request.args.get('key', '')
    print(searchword)
    return 'User %s' % username


@app.route('/index', methods=['POST', 'GET'])
def index():
    print(request.data)
    print(request.form)
    print(request.args)
    print(request.json)
    print(request.is_json)
    print(request.get_json())
    return "Add URL"


# app.add_url_rule('/index/', view_func = index)


# with app.test_request_context():
#     print(url_for('index'))
#     print(url_for('show_user_profile', username='John Doe'))

if __name__ == '__main__':
    app.run(debug=True)
