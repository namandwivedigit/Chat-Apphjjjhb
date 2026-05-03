const pages = [
  'Splash Screen',
  'Login Page',
  'Signup Page',
  'Forgot Password Page',
  'Home Page',
  'Service/Doctor List Page',
  'Service/Doctor Details Page',
  'Select Date & Time Page',
  'Appointment Booking Form',
  'Booking Confirmation Page',
  'My Appointments Page',
  'Appointment Details Page',
  'Cancel/Reschedule Appointment Page',
  'User Profile Page',
  'Edit Profile Page',
  'Notifications Page',
  'Payment Page',
  'Payment Success Page',
  'Reviews & Ratings Page',
  'Help & Support Page',
  'Settings Page',
  'Admin Dashboard',
  'Manage Appointments Page',
  'Manage Users Page',
  'Manage Services/Doctors Page'
];

const templates = {
  'Splash Screen': ['App Logo', 'Welcome Text', 'Get Started Button'],
  'Login Page': ['Email Input', 'Password Input', 'Login Button', 'Forgot Password Link'],
  'Signup Page': ['Name Input', 'Email Input', 'Phone Input', 'Password Input', 'Create Account'],
  'Forgot Password Page': ['Email Input', 'Send OTP/Reset Link'],
  'Home Page': ['Search Bar', 'Popular Services', 'Top Doctors', 'Upcoming Appointment Card'],
  'Service/Doctor List Page': ['Filter Chips', 'Doctor Cards', 'Service Cards'],
  'Service/Doctor Details Page': ['Profile', 'Experience', 'Fee', 'Book Now Button'],
  'Select Date & Time Page': ['Calendar', 'Time Slots', 'Continue Button'],
  'Appointment Booking Form': ['Patient Details', 'Symptoms Notes', 'Submit Booking'],
  'Booking Confirmation Page': ['Booking ID', 'Doctor Summary', 'Download Receipt'],
  'My Appointments Page': ['Upcoming Tab', 'Past Tab', 'Appointment Cards'],
  'Appointment Details Page': ['Date & Time', 'Doctor Info', 'Status', 'Action Buttons'],
  'Cancel/Reschedule Appointment Page': ['Reason Dropdown', 'New Time Picker', 'Confirm Action'],
  'User Profile Page': ['Photo', 'Name', 'Email', 'Medical History Snapshot'],
  'Edit Profile Page': ['Editable Form', 'Save Button'],
  'Notifications Page': ['Reminder Cards', 'System Alerts'],
  'Payment Page': ['Booking Amount', 'Payment Method', 'Pay Now'],
  'Payment Success Page': ['Success Message', 'Transaction ID', 'Back to Home'],
  'Reviews & Ratings Page': ['Rating Stars', 'Write Review', 'Submit Review'],
  'Help & Support Page': ['FAQ', 'Contact Form', 'Call Support'],
  'Settings Page': ['Language', 'Notification Preferences', 'Privacy Controls'],
  'Admin Dashboard': ['Stats Cards', 'Recent Bookings', 'Quick Links'],
  'Manage Appointments Page': ['Appointments Table', 'Status Update Actions'],
  'Manage Users Page': ['Users List', 'Block/Activate Controls'],
  'Manage Services/Doctors Page': ['Service CRUD', 'Doctor CRUD', 'Availability Management']
};

const descriptions = {
  'Splash Screen': 'Initial branding and app loading screen.',
  'Login Page': 'Secure sign-in for patients/admin users.',
  'Signup Page': 'Create a new account to start booking appointments.',
  'Forgot Password Page': 'Password recovery using email/OTP flow.',
  'Home Page': 'Landing dashboard with quick booking options.',
  'Service/Doctor List Page': 'Browse all available services and doctors.',
  'Service/Doctor Details Page': 'Detailed profile before booking.',
  'Select Date & Time Page': 'Choose preferred date and available slot.',
  'Appointment Booking Form': 'Collect final booking details and symptoms.',
  'Booking Confirmation Page': 'Final confirmation after successful booking.',
  'My Appointments Page': 'List of upcoming and past appointments.',
  'Appointment Details Page': 'Deep view for each appointment record.',
  'Cancel/Reschedule Appointment Page': 'Cancel or move an appointment to new slot.',
  'User Profile Page': 'View profile and account-related details.',
  'Edit Profile Page': 'Update personal information and preferences.',
  'Notifications Page': 'Reminder and status notifications.',
  'Payment Page': 'Handle payment for paid consultations.',
  'Payment Success Page': 'Success acknowledgment after payment.',
  'Reviews & Ratings Page': 'Rate consultation and write feedback.',
  'Help & Support Page': 'Customer support and issue helpdesk.',
  'Settings Page': 'Manage app preferences and privacy.',
  'Admin Dashboard': 'Overview metrics and management shortcuts.',
  'Manage Appointments Page': 'Admin controls for appointment operations.',
  'Manage Users Page': 'Admin controls for user accounts.',
  'Manage Services/Doctors Page': 'Admin management for catalog and doctors.'
};

const pageList = document.getElementById('pageList');
const screenTitle = document.getElementById('screenTitle');
const screenDescription = document.getElementById('screenDescription');
const screenContent = document.getElementById('screenContent');

function renderPage(name) {
  screenTitle.textContent = name;
  screenDescription.textContent = descriptions[name] || '';
  screenContent.innerHTML = '';

  (templates[name] || []).forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `<span class="tag">UI Block</span><h3>${item}</h3>`;
    screenContent.appendChild(card);
  });

  [...document.querySelectorAll('.page-btn')].forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.page === name);
  });
}

pages.forEach((name) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'page-btn';
  button.dataset.page = name;
  button.textContent = name;
  button.addEventListener('click', () => renderPage(name));
  pageList.appendChild(button);
});

renderPage('Splash Screen');
