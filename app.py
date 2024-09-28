from flask import Flask, render_template,request, jsonify
import joblib

app = Flask(__name__)

# Static is public 
# Templates are private

@app.route("/") # Site end
def hello():

    return render_template("index.html")


@app.route("/predict", methods=['POST', 'GET'])
def predict():
    # defined function to convert true false into 1,2
    def ret_val(val):
        if val==True:
            return 1.0
        else:
            return 2.0
        

    data = request.get_json()
    print(data)
    Fname = data.get('Fname')
    Lname = data.get('Lname')
    Age = data.get('Age')
    Pneu = ret_val(data.get('Pneu2'))
    Intu = ret_val(data.get('Intu'))
    Asth = ret_val(data.get('Asth'))
    Hyper = ret_val(data.get('Hyper'))
    Obes = ret_val(data.get('Obes'))
    Tobba = ret_val(data.get('Tobba'))
    Dia = ret_val(data.get('Dia'))
    Inmsupr = ret_val(data.get('Inmsupr'))
    Covid = ret_val(data.get('Covid'))
    RC = ret_val(data.get('RC'))
    Cardio = ret_val(data.get('Cardio'))
    Other = ret_val(data.get('Other'))
    COPD = ret_val(data.get('COPD'))
    Usmer = ret_val(data.get('Usmer'))
    Medical = ret_val(data.get('Medical'))
    Gender = ret_val(data.get('Gender'))
    Patient = ret_val(data.get('Reside'))
    

    lst = [int(Usmer), 
           12, 
           1 if Gender=="male" else 2, 
           1 if Patient=="home" else 2,
           Intu,
           Pneu,
           float(Age),
           Dia,
           Asth,
           Inmsupr,
           Hyper,
           Other,
           Cardio,
           Obes,
           Tobba,
           1.0 if Covid==1.0 else 2.0
           ]
    
    print(lst)

    model = joblib.load('catcovid.joblib')

    ans = model.predict(lst)

    if ans == 1:
        ans = "Yes you will Survive"

    else:
        ans = "No you will Die"
    return jsonify({'answer': ans}) 
     


app.run(debug=True)