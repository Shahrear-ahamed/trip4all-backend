# **Project Analysis: Trip4all**

## **Site Overview:**

Trip4all is a comprehensive tour management website designed with three distinct user roles: Super Admin, Admin, and User. Users can create accounts, purchase tours (domestic or international), and engage in various site features such as a blog and guide section (currently text-based, with the option to embed YouTube video links). Users can also provide feedback and reviews. The Frequently Asked Questions (FAQ) section is dynamic, using visibility numbers and importance levels. The site allows users to search and filter tours by categories, name, location, minPrice, maxPrice, slots, and status. Security measures limit users to purchasing a maximum of two slots. The design follows a seamless pattern for a consistent user experience.

## **Advanced Features:**

- If tour slots are full, users can choose the same upcoming tour.
- Users can request advanced or upcoming tours.
- Integration of a payment system.

## **Functional Requirements:**

### **Common Function:**

- All users can sign in and sign out.
- All users can edit profile info.

### **User Part:**

- Users can sign up their account.
- Password management, including change and reset options (future email implementation).
- Users can purchase tours but cannot buy multiple tours simultaneously or during the same tour period.
- Track the status of bookings.
- Leave reviews and ratings for booked services.
- Display reviews and ratings on each service listings.
- User dashboard showing booking history and statuses.
- Option for users to cancel bookings.
- User can request for upcoming tours slot.

### **Admin Part:**

- Admins access a centralized dashboard to monitor and manage website activities.
- Manage user account statuses.
  - Block/Unblock user
- Add, edit, and remove service listings, including pricing, descriptions, and availability management.
- Booking management system for administrators to view and manage booking requests.
- Accept, reject, or adjust schedules as needed.
- Content management system for blog posts, guide posts, and FAQs.

### **Super Admin:**

- Super admins can add new admin users.
- Manage admin permissions.
  - Content management
  - Tour & payment verification

### **Future Implementation:**

- Account Verification
- Send email for password change
- Optional notifications center for booking confirmations, reminders, and updates.

## **Api Endpoints**

### **Auth:**

- auth/sign-up (POST)
- auth/sign-in (POST)
  - Email
  - Password
- auth/change-password (POST)
- auth/refresh-token (POST)
- auth/forgot-password(POST)
- auth/reset-password (POST)
- auth/create-admin (POST)

### **User:**

- users/me (GET)
- users/me (PUT)

### **Category:**

- category/ (POST)
- category/ (GET)
- category/:id (GET)
- category/:id (PUT)
- category/:id (DELETE)

### **Booking:**

- bookings/ (POST)
- bookings/ (GET) (Pagination and Filtering)
- bookings/:id (GET)
- bookings/:id (PUT)
- bookings/:id (DELETE)
- bookings/book-status/:status (GET)
- bookings/my-bookings (GET)

This search will be dashboard end so its not require to make hard pagination
<br>

**Pagination & Filter::** page, limit, sortBy, sortOrder, price

### **Service:**

- services/ (POST)
- services/page=1&limit=10&maxPrice=1000&minPrice=100 (GET) (Pagination and Filtering)
- services/:id (GET)
- services/:id (PUT)
- services/:id (DELETE)

**Pagination & Filter:** page, limit, sortBy, sortOrder, location, title, category, status, minPrice, maxPrice, slot and tourDuration

### **Blog:**

- blogs/ (POST)
- blogs/ (GET) (Pagination and Filtering)
- blogs/:id (GET)
- blogs/:id (PUT)
- blogs/:id (DELETE)

This search will be dashboard end so its not require to make hard pagination
<br>

**Pagination & Filter::** page, limit, sortBy, sortOrder

### **FAQ:**

- faqs/ (POST)
- faqs/ (GET)
- faqs/:id (GET)
- faqs/:id (PUT)
- faqs/:id (DELETE)

This search will be dashboard end and service end
<br>

**Pagination & Filter:** page, limit, sortBy, sortOrder, status, isActive


### **Review:**

- reviews/ (POST)
- reviews/ (GET)
- reviews/:id (GET)
- reviews/:id (PUT)
- reviews/:id (DELETE)

This search will be dashboard end and service end
<br>

**Pagination & Filter:** page, limit, sortBy, sortOrder, ratings

### **Feedback:**

- feedbacks/ (POST)
- feedbacks/ (GET)
- feedbacks/:id (GET)
- feedbacks/:id (PUT)
- feedbacks/:id (DELETE)

### **Tag:**

- tags/ (POST)
- tags/ (GET)
- tags/:id (GET)
- tags/:id (PUT)
- tags/:id (DELETE)

## **Tables**

#### **Permission:**

- title

#### **UserPermission:**

- permissionId
- userId

#### **User:**

- id
- email
- role
- password
- createdAt
- updatedAt
