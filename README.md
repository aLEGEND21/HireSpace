# HireSpace

HireSpace is a web application that allows high school students to easily find and apply for internships. Before HireSpace, students had to spend hours searching for internships on various websites, and even then, they were not guaranteed to find an internship that matched their interests. This is because other job & internship search engines are not tailored to high school students, and often return results that are only relevant to college students or adults. HireSpace solves this problem by providing a platform that is specifically designed for high school students, and only displays internships that are suitable for them.

HireSpace was built using React.js for the frontend, Express.js for the backend, and MongoDB for the database. The application is secured using Passport.js for authentication, and the frontend is styled using Tailwind CSS.

## Features

- **Internship Listing Page**: Students can view a list of internships that are available to them. Internships are displayed in a card format, and students can click on a card to view more details about the internship.
- **Keyword Search Engine**: Students can search for internships using keywords. The search engine will return a list of internships that match the student's search query, filtering through the internship's title, description, company name, and more.
- **Tag Filtration System**: Students can filter internships by tags, such as "IT", "Business", "Data Science", etc. This allows students to easily find internships that match their interests.
- **User Authentication**: Users can sign up for an account, log in, and log out. Passwords are hashed using PBKDF2 for security.
- **Internship Submission System**: Companies and organizations can submit internships to be listed on the platform. Additionally, students can submit internships they find on other websites to be listed on HireSpace.
- **Submission Approval System**: Submitted internships are reviewed by moderators before being listed on the platform. This ensures that all internships are suitable for high school students.

## Installation & Usage

1. Clone the repository:

```bash
git clone https://github.com/aLEGEND21/HS-Internship-Finder.git
```

2. Install the dependencies:

```bash
cd HS-Internship-Finder/client
npm install
cd ../server
npm install
cd ..
```

3. Run the application:

```bash
cd server
npm start
cd ../client
npm run dev
```

4. Open your web browser and navigate to `http://localhost:3030` to view the application.

## License

This project is not permitted for reuse or redistribution without the author's permission. All rights reserved. If you have any questions or concerns, please contact the author via their GitHub profile.
