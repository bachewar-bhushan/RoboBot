import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from IPython.display import clear_output
import time
from sklearn.svm import OneClassSVM

def fetch_data():
    url = "Google_Sheets_URL"
    url = url.replace('/edit?usp=sharing', '/export?format=csv&gid=0')
    dataset = pd.read_csv(url)
    dataset = dataset.iloc[:-30]
    dataset['Time'] = pd.to_datetime(dataset['date']).dt.strftime('%M:%S')
    dataset['Y-M-D'] = pd.to_datetime(dataset['date']).dt.strftime('%Y-%m-%d')
    testing = dataset.iloc[-30:]
    return dataset, testing

def train_model(dataset):
    mq_columns = ['MQ2', 'MQ3', 'MQ135']
    mq_df = dataset[mq_columns]
    svm_models = {}
    for col in mq_columns:
        svm_model = OneClassSVM(kernel='rbf', gamma=0.5, nu=0.4)
        svm_model.fit(mq_df[[col]])
        svm_models[col] = svm_model
    return mq_df, svm_models

def test_and_visualize_results(test, svm_models):
    mq_columns = ['MQ2', 'MQ3', 'MQ135']
    svm_anomalies = {}
    for col in mq_columns:
        svm_model = svm_models[col]
        svm_anomalies[col] = svm_model.predict(test[[col]])

    fig, axs = plt.subplots(2, 3, figsize=(18, 10))

    for i, col in enumerate(mq_columns):
        axs[0, i].plot(test['Time'].astype(str), test[col], label='Sensor Data', color='blue')
        axs[0, i].scatter(test['Time'][svm_anomalies[col] == -1].astype(str), test[col][svm_anomalies[col] == -1],
                          color='red', label='Anomaly')
        axs[0, i].set_title(f'Anomaly Detection for {col}')
        axs[0, i].set_xlabel('Time_Stamp')
        axs[0, i].set_ylabel(f'{col} Reading(ppm)')
        axs[0, i].legend()
        axs[0, i].xaxis.set_major_locator(plt.IndexLocator(base=10, offset=0))

    for i, col in enumerate(mq_columns):
        sns.histplot(data=test, x=col, kde=True, color='skyblue', edgecolor='black', ax=axs[1, i])
        axs[1, i].set_title(f'Histogram and Density Plot for {col}')
        axs[1, i].set_xlabel('Gas Sensor Reading ({})'.format(col))
        axs[1, i].set_ylabel(f'{col} Reading(ppm)')
        axs[1, i].xaxis.set_major_locator(plt.IndexLocator(base=100, offset=0))

    plt.tight_layout()
    plt.show()

dataset, _ = fetch_data()
mq_df, svm_models = train_model(dataset)

while True:
    _, testing = fetch_data()
    test_and_visualize_results(testing, svm_models)
    time.sleep(4)
    clear_output(wait=True)