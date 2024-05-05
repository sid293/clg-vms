Visitor Management System
Visitor Management System (VMS) is a personal project (web application) aimed at simplifying the meeting process between visitors and employees working in an organization. The project aims to build a system similar to Swipedon, starting with core functionalities. This project is currently in the Minimum Viable Product (MVP) stage, and further development is planned. As it is not yet tested in a real-world environment, feedback and contributions are welcomed.

How does the system work?
The system works by creating accounts for different entities: admin, employee, visitor, and reception. The admin can manage the employees present in the organization. The reception account has features to verify QR codes and track people's presence and timing within the building. Employees can handle meeting requests from visitors who want to meet them. Visitors can create accounts and send meeting requests to employees. If a request is accepted, the visitor will receive a temporary QR code, which they can use to gain access to the building.
Technologies Used

The following technologies were used in the development of the Visitor Management System:
Frontend: React, HTML, CSS, JavaScript, Material-UI
Backend: Node.js, Express
Libraries: qr-reader (and other necessary libraries)

How to use the application
You can host this web application on your network. Provide account access to the admin, who will manage the employee accounts in the organization. Receptionists will have access to their own accounts. Visitors can create accounts and send meeting requests to employees. Employees can accept or reject these requests. If a request is accepted, visitors can gain access to the building through their QR code by checking in with the reception.
Key Features and Functionalities
Admin

Manage employee accounts within the organization

Employee

Handle meeting requests from visitors
Accept or reject meeting requests

Visitor

Create an account
Send meeting requests to employees
Receive a temporary QR code upon request acceptance for building access

Reception

Verify QR codes presented by visitors
Track visitor presence and timing within the building

Future Enhancements and Roadmap
This project is in its initial phase and currently has the main features implemented. Future enhancements and the project roadmap include:

Improving the user interface and styling
Refining and enhancing the main functionalities based on user feedback
Adding additional features present in similar applications like Swipedon, such as:

Visitor check-out functionality
Reporting and analytics capabilities
Multi-site support for large organizations

Based on user feedback and contributions, further decisions will be made to expand the system's functionality and improve the overall user experience.