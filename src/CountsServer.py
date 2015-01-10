from flask import Flask
from flask import request
from flask import render_template

print "This is how we roll."

app = Flask(__name__, static_folder='static', static_url_path='')
app.debug = True

print "Post the setup stages."

@app.route("/hello")
def hello():
    return "Hello World!"

@app.route("/")
def getHome():
  return render_template("index.html")

if __name__ == "__main__":
    app.run()