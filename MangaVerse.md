# MangaVerse

## 1. Introduction

### 1.1 Purpose
The purpose of this document is to provide a detailed Software Requirements Specification (SRS) for **MangaVerse**, an online platform that allows users to read, write, and share manga freely. It covers the functional requirements such as user registration, login, management of manga posts, and administrative functionalities.

### 1.2 Scope
The system will allow users to:
- Create accounts, log in, and manage profiles.
- Create, manage, and delete their own manga posts and chapters.
- Browse and favorite manga posted by others.
- Admins will have elevated roles to manage user roles, delete user content, and monitor site activities.



### 1.3 Definitions
- **User**: Any individual who uses the site to read, write, or share manga.
- **Admin**: A user with special privileges to manage user roles and content.
- **Manga**: A post that represents a manga, containing multiple chapters.

## 2. Functional Requirements

### 2.1 User Registration and Authentication

#### 2.1.1 User Registration
- **Description**: Users should be able to create an account by providing basic information such as username, email, and password.
- **Pre-condition**: None
- **Post-condition**: The user is registered and can log in.

#### 2.1.2 User Login
- **Description**: Registered users can log in using their email and password.
- **Pre-condition**: The user must have a valid account.
- **Post-condition**: The user is authenticated and redirected to their dashboard.

#### 2.1.3 Forget Password
- **Description**: Users can reset their password if they forget it by providing their registered email.
- **Pre-condition**: The user must provide a valid registered email.
- **Post-condition**: A password reset link is sent to the user's email.

### 2.2 User Profile Management

#### 2.2.1 Edit Profile
- **Description**: Users can update their profile information, such as username, bio, and avatar.
- **Pre-condition**: The user must be logged in.
- **Post-condition**: The updated profile is saved.

#### 2.2.2 Favorite Manga
- **Description**: Users can favorite or bookmark manga that they like.
- **Pre-condition**: The user must be logged in.
- **Post-condition**: The manga is added to the user's favorite list.

### 2.3 Manga Management

#### 2.3.1 Create Manga Post
- **Description**: Users can create a new manga post by providing a title, description, and cover image.
- **Pre-condition**: The user must be logged in.
- **Post-condition**: The manga post is published and visible to other users.

#### 2.3.2 Post Manga Chapter
- **Description**: Users can add chapters to their manga posts by uploading images or text content.
- **Pre-condition**: The user must have created a manga post.
- **Post-condition**: The chapter is added to the manga post and available for viewing.

#### 2.3.3 Get Manga
- **Description**: Users can browse through all manga posts available on the platform.
- **Pre-condition**: None
- **Post-condition**: The user can view manga posts along with descriptions and available chapters.

#### 2.3.4 Get Manga Chapter
- **Description**: Users can read chapters of any manga post they select.
- **Pre-condition**: The user must select a manga post.
- **Post-condition**: The selected manga chapter is displayed.

#### 2.3.5 Delete Own Manga
- **Description**: Users can delete their own manga posts, including all related chapters.
- **Pre-condition**: The user must be logged in and be the owner of the manga post.
- **Post-condition**: The manga post and its chapters are permanently deleted.

### 2.4 Administrative Functions

#### 2.4.1 Manage User Roles
- **Description**: Admins can assign roles to users (e.g., Admin, User, Moderator).
- **Pre-condition**: The admin must be logged in with appropriate privileges.
- **Post-condition**: The selected role is assigned to the user.

#### 2.4.2 Delete User Manga
- **Description**: Admins can delete any manga post created by users.
- **Pre-condition**: The admin must be logged in with appropriate privileges.
- **Post-condition**: The manga post is permanently deleted.

#### 2.4.3 Get All User Manga
- **Description**: Admins can view all manga posts created by any user.
- **Pre-condition**: The admin must be logged in with appropriate privileges.
- **Post-condition**: All user manga posts are retrieved for admin review.

## 3. Non-Functional Requirements

### 3.1 Security
- User passwords must be encrypted.
- Admin roles must be restricted to certain functionalities only accessible by admin accounts.

### 3.2 Performance
- The system must handle a large number of simultaneous users without performance degradation.
- Loading times for manga content should not exceed 3 seconds.

### 3.3 Usability
- The website should have a clean and intuitive interface that is user-friendly for both readers and creators.

## 4. System Requirements

### 4.1 Hardware Requirements
- The system should be hosted on a server that can handle multiple requests and store large image files (for manga chapters).

### 4.2 Software Requirements
- The system should be built using web development technologies (HTML, CSS, JavaScript).
- Server-side functionality should use technologies like Node.js, Django, or Ruby on Rails.
- The database should be capable of storing user data, manga posts, and images (e.g., MySQL, MongoDB).

### SERVICE

| method  | path                            | authen | params | query | body                                      |
|---------|---------------------------------|--------|--------|-------|------------------------------------------|
| POST    | /auth/login                     | -      | -      | -     | { email, password }                      |
| POST    | /auth/register                  | -      | -      | -     | { username, email, password }            |
| PATCH   | /auth/forget-password           | -      | -      | -     | { email }                                |
| PATCH   | /auth/edit-profile              | y      | -      | -     | { username, bio, avatar }                |
| POST    | /favourite                      | y      | -      | -     | { mangaId }                              |
| GET     | /favourite                      | y      | -      | -     | -                                        |
| POST    | /cartoon                        | y      | -      | -     | { title, description, coverImage }       |
| POST    | /cartoon/:id/chapter            | y      | :id    | -     | { chapterTitle, content, Images }                |
| GET     | /cartoon                        | -      | -      | -     | -                                        |
| GET     | /cartoon/:id                    | -      | :id    | -     | -                                        |
| DELETE  | /cartoon/:id                    | y      | :id    | -     | -                                        |
| GET     | /cartoon/all                    | -      | -      | -     | -                                        |
| PATCH   | /admin/role                     | y      | -      | -     | { userId, role }                         |
| DELETE  | /admin/cartoon/:id              | y      | :id    | -     | -                                        |
| GET     | /admin/cartoon/all              | y      | -      | -     | -                                        |
