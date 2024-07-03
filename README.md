# RoboBot
![RoboBot](https://github.com/bachewar-bhushan/RoboBot/assets/150711051/004efb9f-1230-4ef2-97d8-64487827b029)

SmartBot revolutionizes remote monitoring in the petroleum industry with its advanced capabilities. This remote-controlled car, controlled by the Blynk IoT app, is equipped with MQ-2, MQ-3, and MQ-135 sensors for real-time data collection in petroleum environments. Continuously logging data to Google Sheets, SmartBot employs the One Class SVM model to detect anomalies, ensuring early identification of potential hazards or irregularities. 

## Components and Functions
1. Raspberry Pi PIco W : The Raspberry Pi Pico W is utilized for transmitting sensor data to Google Sheets via webhooks.
2. ESP8266: The ESP8266 serves as the control unit for SmartBot, allowing it to be remotely controlled via the Blynk IoT app.
3. MQ Sensors: SmartBot is equipped with a range of gas sensors, including the MQ-2, MQ-3, and MQ-135. These sensors detect various gases present in the environment, providing crucial data for monitoring air quality and detecting potential hazards.
4. L298N Motor Driver: The L298N motor driver controls the movement of SmartBot's motors.
5. LEDs: SmartBot features LEDs for visual feedback and indication. These LEDs can be used to indicate various states or conditions of the vehicle

## Components
| Component           | Amount |
| ------------------- | ------ |
| Raspberry Pi Pico W | 1      |
| ESP8266             | 1      |
| MQ-2 Sensor         | 1      |
| MQ-135 Sensor       | 1      |
| MQ-3 Sensor         | 1      |
| L298N Motor Driver  | 1      |
| LEDs                | 4      |

## Features
![Features](https://github.com/bachewar-bhushan/RoboBot/assets/150711051/b7642767-6054-4100-b1df-d4d846af47fa)

## Block Diagram
![Block Diagram](https://github.com/bachewar-bhushan/RoboBot/assets/150711051/b6331b03-da1a-43cd-92f0-884260cba320)

## Circuit Diagram 
![Raspberry Pi Pico W Circuit Diagram](https://github.com/bachewar-bhushan/RoboBot/assets/150711051/ed13ba9c-1c38-464e-968f-6926488c36cf)

![ESP8266 and L298N Motor Driver](https://github.com/bachewar-bhushan/RoboBot/assets/150711051/a7070d8b-7602-44ca-9587-4a15a343f8c3)
