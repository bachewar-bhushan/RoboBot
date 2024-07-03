#define BLYNK_TEMPLATE_ID "YOUR_BLYNK_TEMPLATE_ID-"
#define BLYNK_TEMPLATE_NAME "YOUR_BLYNK_TEMPLATE_NAME"
#define BLYNK_AUTH_TOKEN "YOUR_BLYNK_AUTH_TOKEN-Uf"

//Tech Trends Shameer
//Control DC Motor Using Blynk and ESP8266

#define BLYNK_PRINT Serial

#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>


char auth[] = BLYNK_AUTH_TOKEN;

char ssid[] = "YOUR_SSID";  // type your wifi name
char pass[] = "YOUR_PASSWORD";     // type your wifi password

int M1PWM = D8;  //v1
int M2PWM = D1;  //v2
int M1F = D6;    //GPIO12
int M1R = D7;    //GPIO13
int M2F = D4;    //GPIO2
int M2R = D3;    //GPIO0
//int Infrared_SensorPIN = D2;
int pinValue1;
int pinValue2;

const int RED_LIGHT_PIN = D5;  // Define the pin for the red light
const int white_LIGHT_PIN = D0;
// const int Right_Indicator = 1;
// const int Left_Indicator = 3;
bool botStopped = false;  // Variable to track if the bot has stopped

BLYNK_WRITE(V1) {
  pinValue1 = param.asInt();
  analogWrite(M1PWM, pinValue1);
  Blynk.virtualWrite(V1, pinValue1);
  Serial.print("V1 Slider Value is ");
  Serial.println(pinValue1);
}

BLYNK_WRITE(V2) {
  pinValue2 = param.asInt();
  analogWrite(M2PWM, pinValue2);
  Blynk.virtualWrite(V1, pinValue2);
  Serial.print("V2 Slider Value is ");
  Serial.println(pinValue2);
}

BLYNK_WRITE(V4) {
  int buttonStateF = param.asInt();
  if (buttonStateF == 1) {  // Check if the button is pressed
                            // If the bot is stopped, move it forward

    // Write appropriate values to motor pins for forward movement
    digitalWrite(M1F, HIGH);
    digitalWrite(M2F, LOW);
    digitalWrite(M1R, LOW);
    digitalWrite(M2R, HIGH);

    // Set PWM values for motor speed (adjust these according to your needs)
    analogWrite(M1PWM, pinValue1);
    Blynk.virtualWrite(V1, pinValue1);
    analogWrite(M2PWM, pinValue2);
    Blynk.virtualWrite(V2, pinValue2);

    botStopped = false;  // Update bot status

  } else {
    // Stop the bot when the button is released
    digitalWrite(M1F, LOW);
    digitalWrite(M2F, LOW);
    digitalWrite(M1R, LOW);
    digitalWrite(M2R, LOW);

    analogWrite(M1PWM, 0);  // Set PWM values to 0 to stop the motors
    analogWrite(M2PWM, 0);

    botStopped = true;  // Update bot status
  }
}

BLYNK_WRITE(V3) {  //Reverse
  int buttonStateR = param.asInt();
  if (buttonStateR == 1) {  // Check if the button is pressed
                            // If the bot is stopped, move it forward

    // Write appropriate values to motor pins for forward movement
    digitalWrite(M1F, LOW);
    digitalWrite(M2F, HIGH);
    digitalWrite(M1R, HIGH);
    digitalWrite(M2R, LOW);

    // Set PWM values for motor speed (adjust these according to your needs)
    analogWrite(M1PWM, pinValue1);
    Blynk.virtualWrite(V1, pinValue1);
    analogWrite(M2PWM, pinValue2);
    Blynk.virtualWrite(V2, pinValue2);

    botStopped = false;  // Update bot status

  } else {
    // Stop the bot when the button is released
    digitalWrite(M1F, LOW);
    digitalWrite(M2F, LOW);
    digitalWrite(M1R, LOW);
    digitalWrite(M2R, LOW);

    analogWrite(M1PWM, 0);  // Set PWM values to 0 to stop the motors
    analogWrite(M2PWM, 0);

    botStopped = true;  // Update bot status
  }
}

BLYNK_WRITE(V5) {  //Reverse
  int buttonState_RIGHT = param.asInt();
  if (buttonState_RIGHT == 1) {  // Check if the button is pressed
                                 // If the bot is stopped, move it forward

    // Write appropriate values to motor pins for forward movement
    digitalWrite(M1F, LOW);
    digitalWrite(M2F, LOW);
    digitalWrite(M1R, LOW);
    digitalWrite(M2R, HIGH);

    // Set PWM values for motor speed (adjust these according to your needs)
    analogWrite(M1PWM, pinValue1);
    Blynk.virtualWrite(V1, pinValue1);
    analogWrite(M2PWM, pinValue2);
    Blynk.virtualWrite(V2, pinValue2);

    botStopped = false;  // Update bot status

  } else {
    // Stop the bot when the button is released
    digitalWrite(M1F, LOW);
    digitalWrite(M2F, LOW);
    digitalWrite(M1R, LOW);
    digitalWrite(M2R, LOW);

    analogWrite(M1PWM, 0);  // Set PWM values to 0 to stop the motors
    analogWrite(M2PWM, 0);

    botStopped = true;  // Update bot status
  }
}

BLYNK_WRITE(V6) {  //Reverse
  int buttonState_LEFT = param.asInt();
  if (buttonState_LEFT == 1) {  // Check if the button is pressed
                                // If the bot is stopped, move it forward

    // Write appropriate values to motor pins for forward movement
    digitalWrite(M1F, HIGH);
    digitalWrite(M2F, LOW);
    digitalWrite(M1R, LOW);
    digitalWrite(M2R, LOW);

    // Set PWM values for motor speed (adjust these according to your needs)
    analogWrite(M1PWM, pinValue1);
    Blynk.virtualWrite(V1, pinValue1);
    analogWrite(M2PWM, pinValue2);
    Blynk.virtualWrite(V2, pinValue2);

    botStopped = false;  // Update bot status

  } else {
    // Stop the bot when the button is released
    digitalWrite(M1F, LOW);
    digitalWrite(M2F, LOW);
    digitalWrite(M1R, LOW);
    digitalWrite(M2R, LOW);

    analogWrite(M1PWM, 0);  // Set PWM values to 0 to stop the motors
    analogWrite(M2PWM, 0);

    botStopped = true;  // Update bot status
  }
}

BLYNK_WRITE(V7) {  //Reverse
  int buttonState_STOP = param.asInt();
  if (buttonState_STOP == 1) {  // Check if the button is pressed
                                // If the bot is stopped, move it forward

    // Write appropriate values to motor pins for forward movement
    digitalWrite(M1F, LOW);
    digitalWrite(M2F, LOW);
    digitalWrite(M1R, LOW);
    digitalWrite(M2R, LOW);

    analogWrite(M1PWM, 0);  // Set PWM values to 0 to stop the motors
    analogWrite(M2PWM, 0);

    botStopped = true;  // Update bot status
  }
}

void setup() {
  pinMode(M1PWM, OUTPUT);
  pinMode(M2PWM, OUTPUT);
  pinMode(M1F, OUTPUT);
  pinMode(M1R, OUTPUT);
  pinMode(M2F, OUTPUT);
  pinMode(M2R, OUTPUT);
  pinMode(RED_LIGHT_PIN, OUTPUT);  // Set the red light pin as OUTPUT
  pinMode(white_LIGHT_PIN, OUTPUT);
  //pinMode(Infrared_SensorPIN, INPUT);

  // pinMode(Left_Indicator, OUTPUT);
  // pinMode(Right_Indicator, OUTPUT);
  Serial.begin(9600);
  Blynk.begin(auth, ssid, pass);
}

void loop() {
  // int Obstacle_Detected = digitalRead(Infrared_SensorPIN);
  // Serial.print(Obstacle_Detected);
  // if (Obstacle_Detected == LOW) {
  //   digitalWrite(M1F, LOW);
  //   digitalWrite(M2F, LOW);
  //   digitalWrite(M1R, LOW);
  //   digitalWrite(M2R, LOW); 
  //   analogWrite(M1PWM, 0);
  //   analogWrite(M2PWM, 0);
  //   botStopped = true;
    
  // }else{
  //   botStopped = false;
  // }
  // Check if both M1PWM and M2PWM values are 0 to determine if the bot is stopped
  if (digitalRead(M1F) == 0 && digitalRead(M1R) == 0 && digitalRead(M2F) == 0 && digitalRead(M2R) == 0) {
    botStopped = true;
  } else {
    botStopped = false;
  }


  // Control the red light based on whether the bot is stopped or not
  if (botStopped) {
    digitalWrite(RED_LIGHT_PIN, HIGH);  // Turn on the red light
  } else {
    digitalWrite(RED_LIGHT_PIN, LOW);  // Turn off the red light
  }

  digitalWrite(white_LIGHT_PIN, HIGH);

  // if(digitalRead(M1F) == 1){
  //   digitalWrite(Right_Indicator, HIGH);
  //   delay(2000);
  // }else{

  //   digitalWrite(Right_Indicator, LOW);
  // }

  // if(digitalRead(M2R) == 1){
  //   digitalWrite(Left_Indicator, HIGH);
  //   delay(2000);
  // }else{

  //   digitalWrite(Left_Indicator, LOW);
  // }
  Blynk.run();
}
