# Universal Unmanned Equipment Operation Platform: The Core of Future Intelligent Control

With the rapid development of unmanned technology today, we are proud to introduce the **Universal Unmanned Equipment Operation Platform**, an intelligent management platform that integrates various unmanned devices such as drones, unmanned vehicles, unmanned boats, and unmanned ships. Whether in the air, on land, or at sea, our platform provides a comprehensive solution for the control and management of unmanned equipment, helping you easily handle complex tasks and improve efficiency and safety.

---

## **Core Features Highlights**

### 1. **Unified Management of Multiple Devices**

- **Drones, Unmanned Vehicles, Unmanned Boats, Unmanned Ships**: Supports the access and control of various unmanned devices, achieving unified management across platforms and scenarios.
- **IP Address Binding**: Quickly binds devices through IP addresses to ensure controllability and security. Unaccessed devices cannot be operated, ensuring system security.
- **Device Number Management**: Establishes a unique number for each device for easy tracking and management.

### 2. **Intelligent Data System**

- **Historical Data Playback**: Based on advanced iFlytek feature design, provides historical data playback services, supporting synchronized playback of multiple video streams, drone data, and alarm information, helping you quickly review task details.
- **Real-time Data Monitoring**: Displays the status of drones, payload status, communication link status, airport status in real-time, ensuring comprehensive monitoring during task execution.

### 3. **Multi-Role Permission Management**

- **Super Administrator**: Has the highest permissions, can add operators, visitors, etc., and set time limits.
- **Operator**: Has drone operation permissions, can view current tasks, reports, statistics, historical records, and alarm information.
- **Visitor**: Can only view the current flight status and cannot view alarm information, ensuring system security and privacy protection.
- **Operation Log**: All operation histories are kept in log form for easy auditing and tracking.

### 4. **Comprehensive Monitoring and Intelligent Alerting**

- **Drone Status Monitoring**: Displays battery level, navigation strength, attitude, heading, and position of the drone in real-time to ensure flight safety.
- **Payload Status Monitoring**: Monitors payload attitude, zoom ratio, working mode in real-time to ensure accurate task execution.
- **Intelligent Alert System**: Automatically detects and alerts for anomalies such as voltage alerts, navigation signal interruption, communication link interruption, etc. Drones can automatically return to base, ensuring device safety.
- **AI Intelligent Detection**: Integrates AI algorithms to support intelligent alert functions such as personnel detection, vehicle detection, intrusion detection, flame and smoke detection, facial recognition, etc., enhancing the intelligence level of tasks.

### 5. **Task Management and Route Planning**

- **Task Creation and Editing**: Supports the creation and editing of multi-drone patrol routes and flight tasks, with detailed settings for waypoint locations, payload attitudes, and execution algorithms.
- **Route Planning**: Manually plans routes on satellite maps, supports route dragging and editing, and can overlay payload scanning routes, ensuring the accuracy of task execution.
- **Automatic Patrol Tasks**: Drones can autonomously perform patrol tasks based on preset tasks, automatically alerting and allowing operators to manually intervene to observe anomalies.

### 6. **Visual Platform and Real-time Situation Display**

- **Patrol Visualization Platform**: Displays task results such as drone flight time, mileage, and the number of abnormal events in real-time, helping you quickly grasp task progress.
- **Map Real-time Situation Display**: Displays the position, flight path, and real-time photos of the drone in real-time, ensuring full visibility throughout the task.
- **Historical Playback**: Supports synchronized playback of flight routes, flight photos, and alarm information for easy task review and analysis.

### 7. **Third-Party Integration and Expansion**

- **Hikvision Camera Access**: Supports the access and split-screen display of multiple Hikvision monitoring data, ensuring comprehensive monitoring without blind spots.
- **NVR Integration**: Supports third-party NVR services, providing video storage, monitoring, and playback functions, with support for time period selection and synchronized playback.
- **AI Intelligent Platform**: Based on NVIDIA Jetson series boards or GPU servers, provides powerful data processing capabilities, supporting the rapid deployment and operation of AI algorithms.

---

## **Application Scenarios**

- **Security Patrol**: Drones automatically patrol and monitor anomalies in real-time, improving security efficiency.
- **Environmental Monitoring**: Unmanned boats and drones work together to collect environmental data in real-time, aiding environmental monitoring.
- **Logistics Delivery**: Unmanned vehicles and drones collaborate for delivery, improving logistics efficiency.
- **Emergency Response**: Drones quickly respond and transmit live images in real-time, aiding rescue decisions.

---

## **Why Choose the Universal Unmanned Equipment Operation Platform?**

- **Integrated Management**: Supports unified management and control of various unmanned devices, breaking down device barriers.
- **Intelligent Operation**: Integrates AI algorithms and intelligent alert systems, enhancing task execution efficiency and safety.
- **Visual Monitoring**: Real-time situation display and historical playback functions ensure full transparency and controllability of tasks.
- **Flexible Expansion**: Supports third-party device access and AI algorithm expansion to meet diverse needs.

---

The **Universal Unmanned Equipment Operation Platform** is not just a control center for unmanned devices but also the core engine of intelligent futures. Whether it's security, logistics, environmental protection, or emergency response, we can provide the most intelligent and reliable solutions. **The future is here, control the future, starting from here!**

## Requirements Table

| Drone Automatic Patrol Platform |  |  |  |
| --- | --- | --- | --- | --- |
| **Specific Requirement List** | **Description of Specific Requirement List** | Function Scope | **Requirement List Remarks** |
| Drone Management | Enter IP address to bind devices, the 甲方 needs to provide controllable drones, data link permits, establish drone numbers, unaccessed devices will not be able to control | 2\. Drone Management |  |
| Data System | Based on iFlytek features, design, and establish historical data playback system | 4\. Comprehensive Monitoring |  |
| Administrator Management | Super administrator management, only super administrators can add people | 1\. System Management |  |
|  | Operator Administrator (current, reports, statistics, history, alarms) | 1\. System Management |  |
|  | Visitor (current flight status, cannot view alarms) | 1\. System Management |  |
| Visitor Role | Allow super administrator, switch can be, add time limit | 1\. System Management |  |
| Operator Management | Can manage drone operators | 1\. System Management |  |
| Operation Log | All operation histories, keep logs (view) | 1\. System Management |  |
| Role Permission Management | Comprehensive, data view permissions, control permissions, add permissions, | 1\. System Management |  |
|  | Add management role for control permission of a unit | 1\. System Management |  |
| Comprehensive Monitoring | Drone status display | 4\. Comprehensive Monitoring | Drone status display, including drone battery level, navigation strength, drone attitude, heading, position, etc.; Device 3: Flight Control Device |
| Payload Status Display | Includes payload attitude, zoom ratio, working mode, etc.; | 4\. Comprehensive Monitoring |  |
|  | Camera, first use RTSP protocol, how to control positioning Device 4: Controllable Camera Protocol | 4\. Comprehensive Monitoring |  |
| Communication Link Status Display | Includes signal strength, communication frequency band, etc. Device 2: Data Link Device: Read data packets | 4\. Comprehensive Monitoring |  |
| Airport Status Display | Includes weather, charging and discharging status, hangar open/close status, etc.; Does the airport need additional docking? Device 1: Hangar System | 4\. Comprehensive Monitoring |  |
| Drone Flight Control | Includes automatic drone dispatch, search flight tasks, takeoff, landing, return, switch to manual control, etc. Device 3: Flight Control Device | 2\. Drone Management |  |
| Payload Control | First with a set of camera control channel commands. Simultaneously load 6 clear protocol commands | 4\. Comprehensive Monitoring |  |
| Airport Control | a) Includes opening and closing the cover remotely; | 2\. Drone Management |  |
|  | Subsequent debugging and docking | 2\. Drone Management |  |
| Link Control | Includes frequency band switching, remote power on and off, etc. | 2\. Drone Management |  |
| Alert and Emergency Return | Has a voltage alert value preset function, monitors the aircraft battery throughout the flight, has obvious sound and light alarm prompts when the voltage is lower than the preset voltage value, the drone can automatically return when the voltage is low to the set alarm pressure value, has navigation signal, communication link interruption detection function, when the control link is interrupted, the drone can automatically return; | 4\. Comprehensive Monitoring |  |
|  | (Countdown 15 seconds automatic return) Determine the return standard. |  |  |
| Hikvision Camera Access | j) Can access multiple Hikvision monitoring data, support split-screen display; Are our heads Hikvision? | 4\. Comprehensive Monitoring |  |
| Task Management | Task Creation | 2\. Drone Management | Includes multi-drone patrol routes, flight tasks, duty operators, task start time, etc., for multi-drone assignment of timing tasks |
| Task Editing | Can detailed edit flight tasks such as waypoint locations, payload attitudes, execution algorithms, etc.; | 2\. Drone Management |  |
| Historical Task Viewing | Can view historical task records and detection results | 2\. Drone Management |  |
| Task Library Management | Can create, store, delete, view flight task libraries, create flight tasks through map drawing, manual entry, etc., to form a task library; | 2\. Drone Management |  |
| Route Planning | Manually plan routes on satellite maps, display the distance of the route from the starting point, the route can be dragged and edited; Can overlay payload scanning routes on waypoints; Path planning is first sent to the flight control software | 2\. Drone Management |  |
| Automatic Patrol Tasks | Drones can autonomously perform alert patrols based on edited tasks, alert when problems are found, then pop up prompts, operators manually operate to observe anomalies | 2\. Drone Management |  |
|  | AI Custom Algorithm | 3\. Intelligent Alerting | Personnel Detection |
|  | Vehicle Detection | 3\. Intelligent Alerting |  |
|  | Intrusion Detection | 3\. Intelligent Alerting |  |
|  | Flame Smoke Detection | 3\. Intelligent Alerting |  |
|  | Facial Recognition | 3\. Intelligent Alerting |  |
|  | Difference Comparison? | 3\. Intelligent Alerting |  |
| AI Intelligent Hardware and Software Integration Platform | Based on NVIDIA Jetson series board or NVIDIA GPU server, one, 8G memory, temporarily used as a data server, if capacity problems, then separate another independent system | 3\. Intelligent Alerting |  |
| Alert PDF Generation | Query alert webpage generates PDF, support image-text generation | 3\. Intelligent Alerting | 1 |
| Alert Classification | Support hierarchical intelligent alerts, can intelligently alert based on time, space, target attributes, etc. | 3\. Intelligent Alerting | 1 |
| Playback | Multi-channel video playback, drone data playback, alarms, synchronized playback | 4\. Comprehensive Monitoring |  |
| Integration of Third-Party NVR Services | Need to develop integration unique NVR support NVR video display and storage, monitoring and playback functions: time period, synchronized playback (camera, aircraft data) selectable playback. | 4\. Comprehensive Monitoring | 1 |
| Hikvision NVR | Deploy a set of recording equipment (Hikvision, Dahua) to achieve recording playback, connect to the monitoring screen | 4\. Comprehensive Monitoring | 0 |
| Drone Flight Control System Debugging | Drone control system | 2\. Drone Management | At least support 10 commands, drone remote control system. Based on server time. |
| Drone Takeoff | Hangar opens, powers on, self-checks, transmits route, route successful, unlocks, takes off, moves 5 meters, closes | 2\. Drone Management | 1 |
| Drone Return | Drone loses connection | 2\. Drone Management | Normally returns, cover automatically opens, stops (locks), returns to position, powers off, closes | 1 |
| Visual Platform | Patrol Visualization Platform | 2\. Drone Management | Patrol results visualization, drone flight time, total time, mileage, total mileage, number of abnormal events detected, etc., results information statistics chart visualization. |
|  | Map anomaly point location | 2\. Drone Management |  |
| Map Real-time Situation Display | Map real-time display of drone position situation, real-time communication drone position and photos | 2\. Drone Management | 1 |
| Map Data | Use our purchased data for data labeling | 2\. Drone Management | 1 |
| Real-time Video Monitoring Platform | Use NVR output for monitoring, WEB supports up to 6 video channels on the screen at the same time | 4\. Comprehensive Monitoring | 1 |
| Historical Playback | Time-aligned storage, store payload telemetry, flight control telemetry by time alignment, can review historical data through playback. Need to display flight route, flight photos for each time period and alarms on the route | 4\. Comprehensive Monitoring | 1 |
|  |  |  |  |

1. Statistical Analysis

   1. Visualize statistical charts of results information such as flight time, total time, mileage, total mileage, number of abnormal events detected, etc.

2. Situation Awareness

   1. Includes the longitude and latitude coordinates, altitude, heading, speed, battery, etc., of the drone

   2. Airport status display includes weather, charging and discharging status, hangar open/close status, etc.

   3. Real-time alert information, drone return, battery alarm information, etc.

   4. Communication link status display includes signal strength, communication frequency band

3. Monitoring and Viewing

   1. Monitoring and playback functions,

   2. Need to display flight route, flight photos for each time period, and alarms on the route

4. Route Planning

   1. Manually plan routes on satellite maps, display the distance of the route from the starting point, the route can be dragged and edited

   2. Can overlay payload scanning routes on waypoints?

# System Compilation and Operation

npm run build

System Startup npm run start

System Debugging

npm run dev

#Contribution If you are interested, you can join the team. We welcome development work on drones, unmanned vehicles, unmanned boats, inspections, and more, to together build the core of future intelligent control.

#Contact Project Maintainer: [magix] ([magixmin@gmail.com]) Project Link: [xship.cc]

#License This project is licensed under the MIT License. Details can be found in the LICENSE file.
