import pandas as pd
import pickle
from flask_cors import CORS
from flask import Flask, request, jsonify

app = Flask(__name__)
CORS(app)

with open('svm_models.pkl', 'rb') as f:
    svm_models = pickle.load(f)
with open('scalers.pkl', 'rb') as f:
    scalers = pickle.load(f)

mq_columns = ['MQ2', 'MQ3', 'MQ135']

def make_predictions(data):
    predictions = {}
    for col in mq_columns:
        if col in data.columns:
            if data[col].isna().any():
                print(f"Skipping {col} due to NaN values")
                continue
            
            scaled_data = scalers[col].transform(data[[col]])
            
            prediction = svm_models[col].predict(scaled_data)
            
            predictions[col] = prediction[0]
        else:
            print(f"Column {col} not in input data")
    
    return predictions

@app.route('/api/predict-anomalies', methods=['POST'])
def predict():
    data = request.get_json()
    print("Received data:", data)
    df = pd.DataFrame([data])
    print("Dataframe created:", df)
    
    predictions = make_predictions(df)
    
    print("Predictions made:", predictions)
    return jsonify(predictions)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
