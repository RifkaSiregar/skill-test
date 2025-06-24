# Skill - Test
Developed as part of the evaluation process for the Full Stack Developer position at a company, this project utilizes the Next.js framework along with modern tooling. 

## General Description
This project serves as a practical demonstration of integrating with a public API to generate a job list page. Leveraging the public API provided by [Jobicy](https://jobicy.com/), the application showcases various functionalities including the display of job, login and registration, as well as user management capabilities.

## Features
- **Job List**: Display a list of jobs fetched from the Jobicy API.
- **Login and Registration**
- **Users Page**: Perform some operations (Read, Update, Delete) on users.

## Technologies Used
- Frontend Framework: Built using Next.js, a React framework.
- API Integration: Utilizes the public API provided by GoRest for fetching blog post data and managing users.
- Styling: Custom styling implemented with modern CSS techniques.
- Additional Libraries: Any additional libraries or tools used in the project.

## Installation Guide
* [Step 1: Download the Repository](#step1)
* [Step 2: Initialize Application](#step2)
* [Step 3: Serve](#step3)

-----
<a name="step1"></a>
### Step 1: Download the Repository

Either Clone the repository using git clone: `git clone https://github.com/RifkaSiregar/skill-test.git` or install via <a target="_blank" href="https://github.com/RifkaSiregar/skill-test/archive/master.zip">zip</a> and extract to any of your folders you wish.

-----
<a name="step2"></a>
### Step 2: Initialize the Application

Before starting the application, ensure you have added the necessary credentials to the `.env` file in root of project directory. Below is an example of how your `.env` file should look:
```
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_database_password_here
DB_NAME=app
NEXT_PUBLIC_JOBICY_URL=https://jobicy.com
```

To install the required dependencies, you need to run `npm install` in the project directory.

-----
<a name="step3"></a>
### Step 3: Serve

To serve the application, you can use `npm run dev`, then open [http://localhost:3000](http://localhost:3000) 
