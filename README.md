# Bug Alert

![BUG Alert am i responsive image](src/assets/main_image_responsive.png)

## Overview

Bug Alert is a frontend application designed to help developers track bugs and manage issues in their applications. Users can log in and add a project they want to track. Bugs, issues and console errors can be added. All registered users can add bugs and issues that they have observed. The issues are marked with their relative priority eg. Critical, High, Medium or Low.
Users can also add comments about specific issues. The owner of an added issue can mark the issue as resolved.
The goal of Bug Alert is to have a place where all issues are stored, so that teams working on specific projects can be alerted about bugs and therefore have them squashed more efficiently.

## Live Site

https://bug-alert-frontend-b009aeb2d91a.herokuapp.com/

## Repository

https://github.com/Drekkg/bug-alert-frontend66.git

## Author

Derek Garnett

## Features

**Navigation Bar**

The logged out Navbar contains the app title and logo; sign in and sign up links.
The title is also a link to the start page.

![navbar logged out](src/assets/navbar_logged_out.png)

The logged in Navbar contains the logged in user's username, a link to the add a project page and a link to log out.

![navbar logged in](src/assets/navbar_logged_in.png)

**Sign in Page**
The Sign in page contains the form to sign in. It also contains 2 buttons: one to sign in and one to close the form. Also a link to the sign up form if the user doesn't have an account.

![sign in form](src/assets/signin_page.png)

**Sign up Page**
The sign up page contains a form for the user to create an account.
It contains 2 buttons: a submit button to sign up and a button to close the form. It also contains a link to the sign in page.

**Main Page - Logged out**

The main page in a logged out state contains a banner informing the user to either sign in or sign up. They are links that lead to the relative page.
An un authorised used can view the list of projects on the application, but any of the specific details.

- Each project header card will contain:
  - a description of the project.
  - A link to the project if supplied.
  - A link to the Github repository if supplied.
  - The owner of the project.
  - The date the project was added.

![main page logged out](src/assets/project_page_logged_out.png)

**Main Page Logged in**
The main page in a logged in state will additionaly display 3 buttons:

- an open the issues Panel button
  This button will open the list of issues that have been logged for the specific project.
- an edit Project Button(If the user is the owner of the project)
  This button will take the user to the edit project form. Here the user can edit the particulars of the project.
- A delete button(If the user is the owner of the project)
  This button will allow the user to the delete project.
  ![mainpage logged in ](src/assets/main_page_logged_in.png)

**Project Issues Page**
This page displays the issues that have been logged to each project.

- Add an issue button: The add an issue button will take the user to the adda an issue form, where they can log an issue.

- The header contains: The project name and a unique issue number.
- if the issue has been resolved, a green badge with the word resolved will also be displayed.
- The main block contains:

  - The name of the user that logged the issue.
  - A description of the issue
  - A console error, if one has been uploaded.
  - The date the issue was logged.
  - If the issue is repeatable.
  - A coloured box containing the priority level of the issue.

- The view issue button:
  - A button that will take the user to the issue details page. Here the user
    can view and add any additional information regarding the issue.
- The Close/Re-open button:
  - If the user is the owner of the project they can set the issue as resolved by clicking the button. Once resolved the button can be used to reopen the issue.

![project issue image](src/assets/project_issue.png)

**Issue Detail Page**
The issue detail displays all the information of the project detail page, but also
including:

- A back to Issues Button:
  Takes the user back to the project Issues page
- A response Form:
  Here the user can enter any additional information or comments regarding the issue.
  Also any steps taken to rectify the problem/solutions/fixes/workarounds
- A button to enter and display the information.
- Comments box:
  A field that lists all comments and information that have been entered.
  including the username, time and date.

**Add Project Page**
The add project page is where a user can add a new project.

- It contains the relative fields in the form.
  Project Name
  Project Description
  Project URL
  GitHub URL
  ![edit project page](src/assets/edit_project_page.png)

**Add Project Page**
The add project page contains a form for the relative information.

- The project name
- A description of the project
- The project URL
- The GitHub Url
- A submit Button and a close button

![add project image](src/assets/add_project.png)

\*\*Future Features

- The ability to search projects and issues is a definite must for the future.
- Also the abilility to edit issues and comments.
- Assigning issues to a specific user.

## UX

I strove to keep the design of Bug Alert simple, with basic colours and
typography, with the aim of focusing the attention of the user on the informational context.
While most users would be on full size screens, the app is still fully functional on mobile.
The idea of using cards that only display details when clicked is an attempt at keeping the UI clean and less cluttered and hopefully less distracting to the user.
The user can click on pertinent projects and issues without being flooded with irrelevant information.

- All operations that the user undertakes are confirmed on the front end:
  - Signing in, signing up, deleting a project, editing a project and logging out are all
    confirmed with an alert.(With the exception of adding a comment - The spinner alerts the user that their information is being uploaded. Adding an alert seemed irrelevant and just another unneccassary step for the user.)
  - Data being written and being fetched from the API is always accompanied with a spinner (The Bug Alert Cross-Hair logo) to communicate to the user that there is a process happening in the background.

**Typography**
For the font I used "Play Fair" from google fonts. A sharp easy to read font.

**Colours**
The colour choice in Bug alert was made in the hopes of not distracting the user from the information. The buttons are coloured to draw attention to them. The colours for the different priorities helps make them stick out and help the user to quickly decide which issues to tackle. For the alerts I used the standard bootstrap colours with minimal customisation.

## Agile Project

https://github.com/users/Drekkg/projects/9

I used the M.o.S.C.o.W principal to help me prioritise what should be included in the application
in the available time.

#### M - must have:

     - The ability to log user reported issues and bugs.
     - The ability to create an account
     - The ability to tie issues to specific projects.
     - The ability to comment upon issues

#### S - should have:

      - The ability to mark the priority of an issue.

#### C - could have:

      - The ability to mark an issue as resolved

#### W - will not have:

      - The ability to search through issues and projects

## Testing

### Manual Testing

https://github.com/user-attachments/assets/e73f6091-0577-4353-8e22-89833c7c2704
video of the app being tested.

1.  A new user clicks on the sign up page
2.  They enter a username.
3.  They enter a password
4.  They confirm their password.
5.  After clicking submit they are taken to the sign in page.
6.  They enter their username and password and signin.
7.  After signing in they are taken to the main projects page.
8.  They click on one of the project and open the issues panel.
9.  They then click on the add issue button and are taken to the add issue form.
10. After filling out all the relevant information and hitting add issue they are taken to the issue.
11. After clicking on view issue they are taken to the comments/response page.
12. Here the user enters any actions they have taken to fix the issue and or any comments.
13. The user the clicks on the back to issues button.
14. They then logout.
15. A new user logs.
16. Aas they are the owner of the issue and they are aware that the issue has been fixed they mark the issue as resolved.
