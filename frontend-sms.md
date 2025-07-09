# School Management System - Frontend Development Guide

## Overview

Building a comprehensive **multi-tenant frontend interface** for the School Management Software that provides **school-branded, role-based user experiences** for all stakeholders in primary and secondary schools.

**Multi-Tenant Architecture**: Each school gets their own branded subdomain (e.g., `greenwood-academy.schoolflexi.com`) with customized branding and isolated user management.

---

## Multi-Tenant System Architecture

### 🏢 **Main Platform** (`schoolflexi.com`)
- **Landing Page**: Focused on acquiring school proprietors
- **School Registration**: Only proprietors can create new school tenants
- **Demo & Pricing**: Showcase features to potential school buyers
- **Support & Documentation**: Platform-wide resources

### 🎓 **School-Specific Sites** (`school-name.schoolflexi.com`)
- **Custom Branding**: School logo, colors, and styling
- **Invitation-Based Registration**: Users join only via proprietor invitations
- **School-Specific Dashboards**: All data isolated to that school
- **Branded Communication**: All emails, notifications use school branding

---

## Updated User Interface Requirements by Role

### 👑 **Proprietor Dashboard** (Primary Role - School Owners)

**Enhanced Responsibilities:**

- **School Setup & Branding** - Configure school branding, logos, colors
- **User Invitation Management** - Send role-based invitations to staff, students, parents
- **Multi-User Oversight** - Approve major system changes and user roles
- **School Analytics** - Cross-role performance metrics and insights
- **Financial Overview** - Revenue, expenses, fee collection reports
- **Staff Management** - Payroll oversight, staff performance
- **Approval Center** - Student promotions, major system decisions

**New Pages & Components:**
- **School Branding Center** - Logo upload, color customization, subdomain management
- **Invitation Dashboard** - Send, track, and manage user invitations
- **School Overview** - High-level analytics across all user roles
- **User Role Management** - Assign and modify user permissions

### 🔧 **Admin Dashboard** (Invited by Proprietor)

**Pages & Components:**

- **Main Dashboard** - System overview, statistics, quick actions
- **User Management** - Add/edit/delete invited users, role assignments
- **Student Management** - Registration, class assignments, bulk operations
- **Class Management** - Create classes, assign teachers, manage sections
- **Reports Center** - Generate and view all system reports
- **System Settings** - School configuration, term/session management
- **Audit Logs** - Activity monitoring and security logs

### 👩‍🏫 **Teacher Interface** (Invited by Proprietor/Admin)

**Pages & Components:**

- **Teacher Dashboard** - Class overview, today's schedule, quick stats
- **Attendance Management** - Mark attendance, view attendance records
- **Gradebook** - Enter scores, manage assessments, grade calculations
- **Assignment Center** - Create, post, and track assignments
- **Class Timetable** - View and manage teaching schedule
- **Student Profiles** - Access student information and academic history
- **Result Entry** - Input exam scores and comments

### 🏢 **Secretary/Admin Interface** (Invited by Proprietor/Admin)

**Pages & Components:**

- **Admissions Portal** - Handle new registrations, document management
- **Fee Management** - Invoice generation, payment tracking, fee setup
- **School Calendar** - Manage events, holidays, important dates
- **Communication Center** - Send announcements, manage notifications
- **Document Management** - Handle official documents and records
- **Parent Communication** - Manage parent inquiries and updates

### 👨‍👩‍👧‍👦 **Parent Portal** (Invited by Proprietor/Admin)

**Pages & Components:**

- **Parent Dashboard** - Child's overview, recent activities, quick links
- **Student Progress** - View grades, attendance, behavioral reports
- **Fee Payment** - Online payment portal, payment history, invoices
- **Communication** - Messages from teachers/school, announcements
- **School Calendar** - View school events, holidays, important dates
- **Assignment Tracking** - View child's assignments and submission status

### 🎓 **Student Interface** (Invited by Proprietor/Admin)

**Pages & Components:**

- **Student Dashboard** - Personal overview, upcoming assignments, announcements
- **Results Portal** - View exam results, report cards, academic progress
- **Assignment Submission** - Submit homework, view assignment details
- **School Announcements** - View school news and updates
- **Personal Profile** - View and update basic information
- **Academic Calendar** - View class schedule, exam dates, holidays

---

## Core Frontend Features to Implement

### 🏠 **Main Platform Pages** (`schoolflexi.com`)

1. **Landing Page** ✅ - Modern, responsive homepage targeting school proprietors
2. **School Registration** 🆕 - Comprehensive school setup and proprietor onboarding
3. **Features Showcase** - Detailed feature breakdown for school decision-makers
4. **Pricing Plans** - School-focused subscription plans and pricing
5. **Demo Portal** - Interactive demo of the school management system
6. **Contact & Support** - Contact forms, sales team, implementation support

### 🎓 **School-Specific Pages** (`school-name.schoolflexi.com`)

1. **Custom Landing Page** 🆕 - School-branded homepage for direct visitors
2. **Invitation Acceptance** 🆕 - Branded user registration via invitation links
3. **School-Branded Login** 🆕 - Custom login page with school branding
4. **Dashboard Hub** - Role-specific dashboards with school context
5. **School Directory** - Staff and student directories with photos
6. **School Calendar** - Public school events and important dates

### 🔐 **Multi-Tenant Authentication System**

1. **School Registration Flow** 🆕 - Proprietor creates school with subdomain
2. **Invitation System** 🆕 - Send branded email invitations with role assignment
3. **Invitation Acceptance** 🆕 - Complete user profile via secure invitation link
4. **School-Branded Login** 🆕 - Login with school-specific branding
5. **Password Reset** - Secure password recovery with school branding
6. **Two-Factor Authentication** - SMS/Email verification with school context

### 🎨 **School Branding System** 🆕

1. **Branding Center** - Upload logos, set colors, customize styling
2. **Subdomain Management** - Configure and manage school URL
3. **Email Templates** - Customize invitation and notification emails
4. **Logo Management** - Multiple logo variations for different uses
5. **Color Scheme Editor** - Visual color picker with preview
6. **Template Customization** - Customize dashboards and forms

### 📧 **Invitation Management System** 🆕

1. **Invitation Dashboard** - Send, track, and manage invitations
2. **Role-Based Invitations** - Invite users with specific role assignments
3. **Bulk Invitations** - Send multiple invitations with CSV upload
4. **Invitation Tracking** - Monitor invitation status and acceptance
5. **Expiry Management** - Set and manage invitation expiration dates
6. **Resend Invitations** - Resend expired or failed invitations

---

## Updated Development Phases

### Phase 1: Multi-Tenant Foundation ✅

- [x] Landing page targeting school proprietors
- [x] Mobile-responsive navigation
- [x] Basic component library setup
- [x] Multi-tenant type definitions

### Phase 2: School Registration & Branding 🆕

- [ ] School registration flow for proprietors
- [ ] Subdomain setup and management
- [ ] School branding center (logo, colors, styling)
- [ ] Custom school landing pages

### Phase 3: Invitation System 🆕

- [ ] Invitation dashboard for proprietors
- [ ] Branded invitation email templates
- [ ] Invitation acceptance flow with school branding
- [ ] Role-based user onboarding

### Phase 4: School-Branded Authentication

- [ ] School-specific login pages
- [ ] Multi-tenant user management
- [ ] School-branded password recovery
- [ ] School context preservation

### Phase 5: Enhanced Dashboards

- [ ] Proprietor dashboard with school oversight
- [ ] School-branded dashboards for all roles
- [ ] Cross-role analytics and reporting
- [ ] School-specific user directories

### Phase 6: Academic Management (School-Specific)

- [ ] Student registration within school context
- [ ] Attendance marking with school branding
- [ ] Grade entry and result viewing portals
- [ ] School-branded parent communication

### Phase 7: Advanced Features (Per School)

- [ ] Assignment and homework management
- [ ] Fee payment with school branding
- [ ] School-specific notification systems
- [ ] Custom report generation

### Phase 8: Specialized Tools (Per School)

- [ ] School-branded ID card generation
- [ ] CBT/Exam system with school context
- [ ] School-specific analytics dashboards
- [ ] Custom school integrations

### Phase 9: Mobile & Multi-Tenant Optimization

- [ ] Mobile app with school context
- [ ] Performance optimization across tenants
- [ ] Accessibility improvements
- [ ] Cross-school analytics for platform owners

---

## Updated Success Metrics

### Multi-Tenant Goals 🆕

- **School Acquisition** - Target 100+ schools in first year
- **User Adoption per School** - Average 50+ users per school
- **School Retention** - 95%+ school renewal rate
- **Brand Consistency** - Each school feels like their own system

### Technical Goals

- **Subdomain Performance** - Sub-2-second load times per school
- **Tenant Isolation** - 100% data separation between schools
- **Scalability** - Support 1000+ concurrent schools
- **Customization** - Full branding control for each school

---

## Key Frontend Architecture Changes 🆕

### **1. Routing Structure**
```
Main Platform: schoolflexi.com
├── / (Landing for proprietors)
├── /auth/register-school (School registration)
├── /features (Feature showcase)
├── /pricing (School-focused pricing)
└── /demo (Interactive demo)

School Sites: school-name.schoolflexi.com
├── / (School landing page)
├── /auth/login (School-branded login)
├── /auth/accept-invitation (Invitation acceptance)
├── /dashboard (Role-specific dashboards)
└── /directory (School directory)
```

### **2. Branding System**
- Dynamic CSS loading based on school
- Logo injection at multiple breakpoints
- Color scheme customization
- Font family options
- Template layout variations

### **3. User Context Management**
- School-specific user sessions
- Role-based permissions per school
- Cross-school administrator tools
- Tenant-isolated data handling

This updated plan transforms the system from a **single-tenant school management tool** into a **multi-tenant platform** where each school gets their own branded experience while maintaining centralized platform management! 🎯
