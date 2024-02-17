# True Tech Blog

## User Story

```md
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
```

## Acceptance Criteria

```md
GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts
```

## Objective

From scratch, create a fully-functional, responsive website that will allow for users to register a new account, and be able to login, where their information is stored inside a database. Once they have either created a new account or successfully logged in, they will be granted the option to be able to create a new post that can be shared in a global landing page (even displayed for users currently logged off). They will be able to include a title and a description to be included in their post, where the date posted will be shown in the post, including the name of the user. As long as the user is currently logged into the session, he/she will also have a dashboard page in which the person will be able to see all of their posts, and be able to update/delete any post. If updated/deleted, the post will be immediately updated in both the landing page and the dashboard page. Lastly, if the user wishes to log out, they will be able to do so by clicking on a 'logout' button that will terminate their current session, and be taken back into the landing page, where they will be given the option to log back in.

![img](./Assets/true-tech-blog-screenshot-1.png)
![img](./Assets/true-tech-blog-screenshot-2.png)

## Heroku Deployed URL
https://blooming-peak-29118-29e0be2b30b7.herokuapp.com/

## How to Run

1. Run 'git clone (repo link)' on Git Bash'
2. CD into project directory
3. Run project via code editor (e.g. Visual Studio Code)
4. Open the terminal
5. Run 'npm install' to download all necessary dependencies
6. Make sure to create the database (DBTrueTechBlog) first prior to executing application via bash or MySQL Workbench
6. Run 'npm start' and navigate to localhost:3001 to view the running website
