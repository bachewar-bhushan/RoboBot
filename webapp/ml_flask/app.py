import pandas as pd
from sklearn.svm import OneClassSVM
from sklearn.preprocessing import StandardScaler
import pickle

def fetch_data():
    url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRMCkjKf0KO5qyLfU89ivOIiYKl17BwWBfL3CNBSZU4urPDQ_QUO4fEfmFH6qW_qdSbCR3Jh_l1PZXT/pub?output=csv"
    dataset = pd.read_csv(url)
    dataset['Time'] = pd.to_datetime(dataset['date']).dt.strftime('%H:%M:%S')
    dataset['Y-M-D'] = pd.to_datetime(dataset['date']).dt.strftime('%Y-%m-%d')
    dataset = dataset.sort_values('Time')
    return dataset

mq_columns = ['MQ2', 'MQ3', 'MQ135']
svm_models = {}
scalers = {}

def train_and_save_model():
    dataset = fetch_data()
    for col in mq_columns:
        scaler = StandardScaler()
        scaled_data = scaler.fit_transform(dataset[[col]])
        
        svm_model = OneClassSVM(kernel='rbf', gamma=0.5, nu=0.1)
        svm_model.fit(scaled_data)
        
        svm_models[col] = svm_model
        scalers[col] = scaler

    with open('svm_models.pkl', 'wb') as f:
        pickle.dump(svm_models, f)
    with open('scalers.pkl', 'wb') as f:
        pickle.dump(scalers, f)

if __name__ == "__main__":
    train_and_save_model()
    print("Training completed and models saved.")
