#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

#define PIN_LED 26

const char *routerSsid = "DBadddmmmooo"; //Enter the router name
const char *routerPassword = "abcdefg123"; //Enter the router password

bool LedStatus = 0;

AsyncWebServer server(80);

void setup()
{
  Serial.begin(115200);  
  delay(5000);

  WiFi.begin(routerSsid, routerPassword);
  Serial.println(String("Connecting to ") + routerSsid);
  while (WiFi.status() != WL_CONNECTED){
    delay(5000);
    Serial.print("#");
  }

  Serial.println("");
  Serial.println("Connected to IP address: ");
  Serial.println(WiFi.localIP());

  pinMode(PIN_LED, OUTPUT);
  LedStatus = 0;
  digitalWrite(PIN_LED, LOW);

  server.on("/on", HTTP_GET, [] (AsyncWebServerRequest *request) {
    Serial.println("switching LED on");
    LedStatus = 1;
    digitalWrite(PIN_LED, HIGH);
    AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", "");
    response->addHeader("Access-Control-Allow-Origin", "*");
    request->send(response);
  });

  server.on("/off", HTTP_GET, [] (AsyncWebServerRequest *request) {
    Serial.println("switching LED off");
    LedStatus = 0;
    digitalWrite(PIN_LED, LOW);
    AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", "");
    response->addHeader("Access-Control-Allow-Origin", "*");
    request->send(response);
  });

  server.on("/status", HTTP_GET, [] (AsyncWebServerRequest *request) {
    Serial.println("switching status called");
    AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", LedStatus == 1 ? "ON" : "OFF");
    response->addHeader("Access-Control-Allow-Origin", "*");
    request->send(response);
  });

  server.begin();
}

void loop() {
}