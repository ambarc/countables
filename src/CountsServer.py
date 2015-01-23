from flask import Flask
from flask import request
from flask import render_template
from flask import jsonify

import urllib2

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

@app.route("/goodreads")
def getGoodReads():
	keyFile = file("goodreads.key", "r")
	keyString = keyFile.readline()
	# need to figure out oauth and a bunch of other shit.
	toReturn = dict()
	toReturn['count'] = 10
	return jsonify(toReturn)

if __name__ == "__main__":
    app.run()