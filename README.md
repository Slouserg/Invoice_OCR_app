
<p align="center"><img src="./images/OCR-logo.png" alt="Logo" width="100"></p>
<h1 align="center">Invoice OCR App</h1>

<p align="center">
  <img src="https://img.shields.io/github/stars/Slouserg/Invoice_OCR_app?style=social" alt="GitHub Repo stars"/>
</p>

A web application for recognizing and managing data from Dutch invoices, **forked from [MatKollar's Invoice OCR App](https://github.com/MatKollar/Invoice_OCR_app)** which focuses on Slovak invoices.

## 📚 Table of Contents
1. [🌐 General Info](#general-info)
2. [🌟 Features](#features)
3. [🏗️ Tech Stack](#tech-stack)
4. [📸 Screenshots](#screenshots)
5. [🚀 Installation](#installation)
6. [🔮 Future Work](#future-work)

## 🌐 General Info
This web application is a fork specifically tailored for the recognition and management of Dutch invoices. Users can upload invoices to the platform where various preprocessing methods can be applied to optimize OCR results.
Available OCR methods include Tesseract and PaddleOCR for text recognition.

The application extracts key information from the recognized text, such as VAT numbers, IBAN, SWIFT codes, and the total amount payable, allowing users to manipulate this data as needed. The app also supports the creation of organizations where invoices can be shared among multiple users. This system streamlines invoice processing, saving time and improving accuracy.

## 🌟 Features
Here is a list of features included in the application:
* Recognize and extract information from invoices in image or PDF format
* User registration and authentication
* The system allows users to select preprocessing and OCR methods
* The system extracts key details from invoices, including VAT number, IBAN, SWIFT code, and total amount payable
* The system stores invoice data in the database
* The system enables searching and filtering invoices based on extracted data
* Ability to view, edit, and delete recognized invoices

## 🏗️ Tech Stack
The Invoice OCR App is built using the following technologies:
- **Python**: For backend development
- **Flask**: Manages the backend server
- **React**: Powers the frontend user interface
- **OpenCV**: Handles invoice image preprocessing
- **Tesseract OCR & PaddleOCR**: Manages text recognition from invoices
- **PostgreSQL**: Database for storing invoice details and user data
- **Docker**: Ensures a smooth setup through containerization

### Project Structure
![Project_Structure](./images/webapp.png)

## 🚀 Installation
Follow these steps to get the application up and running:

1. **Clone the repository**
    ```
    git clone https://github.com/Slouserg/Invoice_OCR_app.git
    ```
2. **Navigate into the project directory**
    ```
    cd Invoice_OCR_app
    ```
3. **Build the Docker image**
    ```
    docker-compose build
    ```
4. **Run the Docker container**
    ```
    docker-compose up -d
    ```
5. The application should now be running at [http://localhost:3000](http://localhost:3000)

6. After initialization, an admin user is automatically created with the login email and password: admin, admin.

## 📸 Screenshots
![screenshot](./images/screenshots.jpg)

## 🔮 Future Work
* Implementation of NER (Named Entity Recognition) for more advanced data extraction
* Support for additional language models
* Expanding data extraction to support international invoices

---

This version is **forked from [MatKollar's Invoice OCR App](https://github.com/MatKollar/Invoice_OCR_app)** and has been adapted for the processing of Dutch invoices.
