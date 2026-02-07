# User Journey & Flow Diagrams

## Complete User Registration Journey

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   🏠 LANDING PAGE                                          │
│   ├─ Hero Section with Benefits                           │
│   ├─ Scholarship Card (90% off)                           │
│   ├─ "Enroll for Free" Button                             │
│   ├─ Features Section (3 cards)                           │
│   ├─ Statistics (50,000+ students, etc.)                  │
│   ├─ FAQ (5 questions)                                     │
│   └─ Footer with CTA                                       │
│                                                             │
└────────────────┬────────────────────────────────────────────┘
                 │
        User clicks "Enroll for Free"
                 │
┌────────────────▼────────────────────────────────────────────┐
│                                                             │
│   📱 PHONE ENTRY SCREEN                                   │
│   ├─ Heading: "Get Started"                               │
│   ├─ Subtext: "Enter mobile number"                       │
│   ├─ Country Code Selector: +91 (India)                   │
│   ├─ Phone Input Field (10 digits)                        │
│   │  └─ Real-time validation                              │
│   ├─ Error Messages (if invalid)                          │
│   ├─ Green Button: "Send OTP"                             │
│   ├─ Helper Text: "SMS will be sent..."                   │
│   └─ Cancel Button                                         │
│                                                             │
│   [User enters: 9876543210]                               │
│   [System validates: ✓ Valid phone]                       │
│                                                             │
└────────────────┬────────────────────────────────────────────┘
                 │
           User clicks "Send OTP"
                 │
        🌐 Supabase sends OTP via SMS
                 │
        📨 User receives SMS with 6-digit code
                 │
┌────────────────▼────────────────────────────────────────────┐
│                                                             │
│   ✅ OTP VERIFICATION SCREEN                              │
│   ├─ Heading: "Verify OTP"                                │
│   ├─ Message: "We sent code to +919876543210"             │
│   ├─ OTP Input (6 digits)                                 │
│   │  ├─ Auto-focus on digit
│   │  ├─ Monospace font (000000)                           │
│   │  └─ Real-time validation                              │
│   ├─ Error Messages (if wrong OTP)                        │
│   │  └─ "OTP expired / incorrect"                         │
│   ├─ Green Button: "Verify OTP"                           │
│   ├─ Resend Section                                        │
│   │  └─ "Resend OTP" (with cooldown timer)                │
│   └─ Back Button: "Change phone number"                    │
│                                                             │
│   [User enters: 123456]                                   │
│   [System validates: ✓ Correct OTP]                       │
│   [Session created automatically]                          │
│                                                             │
└────────────────┬────────────────────────────────────────────┘
                 │
     User enters correct OTP
                 │
┌────────────────▼────────────────────────────────────────────┐
│                                                             │
│   📝 PROFILE COMPLETION SCREEN                            │
│   ├─ Heading: "Complete Your Profile"                     │
│   ├─ Subtext: "Just a few details..."                     │
│   ├─                                                        │
│   ├─ Form Fields:                                          │
│   │  ├─ Full Name (required)                              │
│   │  │  └─ Placeholder: "Enter full name"                │
│   │  │  └─ Validation: Not empty                          │
│   │  │                                                     │
│   │  ├─ Email (optional)                                  │
│   │  │  └─ Placeholder: "your.email@example.com"          │
│   │  │  └─ Validation: Valid email format                 │
│   │  │                                                     │
│   │  └─ Class Level (required)                            │
│   │     └─ Dropdown with options:                         │
│   │        ├─ Class 6                                      │
│   │        ├─ Class 7                                      │
│   │        ├─ Class 8                                      │
│   │        ├─ Class 9                                      │
│   │        ├─ Class 10                                     │
│   │        ├─ Class 11                                     │
│   │        ├─ Class 12                                     │
│   │        └─ Foundation                                   │
│   │                                                         │
│   ├─ Verified Badge                                        │
│   │  └─ "Verified: +919876543210 ✓"                       │
│   │                                                         │
│   ├─ Green Button: "Complete Registration"                │
│   ├─ Loading State: "Registering..."                       │
│   └─ Error Messages (if any validation fails)             │
│                                                             │
│   [User enters:                                            │
│    Full Name: "Raj Kumar"                                 │
│    Email: "raj@example.com"                               │
│    Class: "Class 10"]                                     │
│                                                             │
└────────────────┬────────────────────────────────────────────┘
                 │
    User clicks "Complete Registration"
                 │
        🔐 System verifies auth session
                 │
        💾 Data saved to registrations table
                 │
        ✓ New registration created
                 │
┌────────────────▼────────────────────────────────────────────┐
│                                                             │
│   🎉 SUCCESS PAGE                                         │
│   ├─ Large Success Icon (Trophy/Award)                    │
│   ├─ Heading: "Registration Successful!"                  │
│   ├─ Message: "You're all set..."                         │
│   │                                                         │
│   ├─ Next Steps Card:                                      │
│   │  ├─ ✓ Confirm email and phone                         │
│   │  ├─ ✓ Study materials sent soon                       │
│   │  └─ ✓ Join test at scheduled time                     │
│   │                                                         │
│   ├─ CTA Button: "Back to Home"                           │
│   │  └─ Resets to landing page                            │
│   │                                                         │
│   └─ Bottom Info: User sees confirmation details          │
│                                                             │
│   📨 BACKEND ACTIONS:                                     │
│   ├─ New user in Supabase Auth (phone verified)           │
│   ├─ New registration record in database                  │
│   ├─ Ready for scholarship test                           │
│   └─ Can now receive test materials                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## State Flow Diagram

```
┌─────────────┐
│   LANDING   │
│   PAGE      │
└────┬────────┘
     │ User clicks "Enroll for Free"
     │ State: showRegistration = true
     │
┌────▼──────────────────┐
│  PHONE ENTRY          │
│  step = 'phone'       │
└────┬──────────────────┘
     │ User enters phone
     │ signInWithOTP()
     │ OTP sent via SMS
     │
┌────▼──────────────────┐
│  OTP VERIFICATION     │
│  step = 'otp'         │
└────┬──────────────────┘
     │ User verifies OTP
     │ verifyOTP()
     │ Session created
     │ userId obtained
     │
┌────▼──────────────────┐
│  PROFILE FORM         │
│  step = 'details'     │
└────┬──────────────────┘
     │ User enters profile
     │ registerForScholarship()
     │ Data saved to DB
     │
┌────▼──────────────────────────┐
│  SUCCESS PAGE                 │
│  registrationComplete = true  │
│  showRegistration = false     │
└────┬───────────────────────────┘
     │ User clicks "Back to Home"
     │ registrationComplete = false
     │
└──────────────────────────────────────→ Back to LANDING PAGE
```

---

## Data Flow Diagram

```
┌─────────────────┐
│   Frontend UI   │
│  (React)        │
└────────┬────────┘
         │
         ├─→ Phone Input
         │   └─→ Validation
         │       ├─ Not empty
         │       ├─ 10 digits
         │       └─ Format: +91XXXXXXXXXX
         │
         ├─→ OTP Input
         │   └─→ Validation
         │       ├─ 6 digits
         │       └─ Not expired
         │
         ├─→ Profile Form
         │   └─→ Validation
         │       ├─ Name not empty
         │       ├─ Email format (if provided)
         │       └─ Class selected
         │
         └─→ API Calls to Supabase
             │
             ├─→ signInWithOTP()
             │   │
             │   └─→ auth.signInWithOtp()
             │       ├─ Generate 6-digit OTP
             │       ├─ Store in Supabase
             │       ├─ Send via SMS
             │       └─ Return confirmation
             │
             ├─→ verifyOTP()
             │   │
             │   └─→ auth.verifyOtp()
             │       ├─ Validate OTP
             │       ├─ Check expiry
             │       ├─ Create session
             │       └─ Return user object
             │
             └─→ registerForScholarship()
                 │
                 └─→ supabase.from('registrations').insert()
                     ├─ Insert with RLS policies
                     ├─ RLS checks auth.uid()
                     ├─ Validate foreign keys
                     └─ Return success/error


┌──────────────────────────────────┐
│  Supabase Backend                │
│  ┌────────────────────────────┐  │
│  │ Auth                       │  │
│  ├─ Phone OTP Provider       │  │
│  ├─ Session Management       │  │
│  └─ User Storage             │  │
│  ┌────────────────────────────┐  │
│  │ Database                  │  │
│  ├─ auth.users table         │  │
│  ├─ registrations table      │  │
│  ├─ scholarships table       │  │
│  └─ RLS Policies             │  │
│  ┌────────────────────────────┐  │
│  │ SMS Delivery              │  │
│  ├─ OTP generation           │  │
│  ├─ Provider integration      │  │
│  └─ Delivery confirmation    │  │
└──────────────────────────────────┘
```

---

## Screen Layouts

### Landing Page Layout (Desktop)
```
┌──────────────────────────────────────────────────────────┐
│ [Logo] ScholarshipTest                    [Nav Links]   │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  LEFT COLUMN (50%)          RIGHT COLUMN (50%)          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ 🏆 Free Scholarship Test                         │   │
│  │                                                  │   │
│  │ Get 90% Scholarship                             │   │
│  │ on Online Subscriptions                         │   │
│  │                                                  │   │
│  │ Appear for CBSE...                              │   │
│  │                                                  │   │
│  │ ⭐ Completely Free                              │   │
│  │ ⭐ Regular Tests                                │   │
│  │ ⭐ Instant Results                              │   │
│  │                                                  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│      [Scholarship Card] OR [Registration Form]         │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ Why Join Us? [3 Feature Cards]                        │
├──────────────────────────────────────────────────────────┤
│ Stats: 50K+ Students | ₹10Cr+ | 95% | 4.8/5           │
├──────────────────────────────────────────────────────────┤
│ FAQ [5 Questions]                                      │
├──────────────────────────────────────────────────────────┤
│ Footer [Links, About, Social]                          │
└──────────────────────────────────────────────────────────┘
```

### Landing Page Layout (Mobile)
```
┌────────────────────────────────┐
│ [Logo] ScholarshipTest          │
├────────────────────────────────┤
│                                │
│ 🏆 Free Scholarship Test       │
│                                │
│ Get 90% Scholarship            │
│ on Subscriptions               │
│                                │
│ Appear for CBSE...             │
│                                │
│ ⭐ Completely Free              │
│ ⭐ Regular Tests                │
│ ⭐ Instant Results              │
│                                │
├────────────────────────────────┤
│ [Scholarship Card]             │
│ ┌──────────────────────────┐   │
│ │ CBSE Scholarship Test    │   │
│ │ Get up to 90%            │   │
│ │ Every Sunday, 12 PM      │   │
│ │ [Enroll for Free]        │   │
│ └──────────────────────────┘   │
├────────────────────────────────┤
│ Why Join Us?                   │
│ [Card 1]                       │
│ [Card 2]                       │
│ [Card 3]                       │
├────────────────────────────────┤
│ Statistics                     │
├────────────────────────────────┤
│ FAQ                            │
├────────────────────────────────┤
│ Footer                         │
└────────────────────────────────┘
```

---

## Registration Form Layouts

### Phone Entry (Full Screen)
```
┌────────────────────────────────┐
│ Get Started                    │
│ Enter mobile number to         │
│ register for the test          │
│                                │
│ Mobile Number                  │
│ [+91] [9876543210]             │
│                                │
│ [Send OTP]                     │
│                                │
│ We'll send via SMS...          │
└────────────────────────────────┘
```

### OTP Entry (Full Screen)
```
┌────────────────────────────────┐
│ Verify OTP                     │
│ We sent code to                │
│ +919876543210                  │
│                                │
│ Enter OTP Code                 │
│ [000000]                       │
│                                │
│ [Verify OTP]                   │
│                                │
│ Didn't receive?                │
│ Resend in 60s                  │
│                                │
│ ← Change number                │
└────────────────────────────────┘
```

### Profile Form (Full Screen)
```
┌────────────────────────────────┐
│ Complete Your Profile          │
│ Just a few details...          │
│                                │
│ Full Name                      │
│ [Enter name]                   │
│                                │
│ Email (Optional)               │
│ [Enter email]                  │
│                                │
│ Class Level                    │
│ [Select class ▼]               │
│                                │
│ [Complete Registration]        │
│                                │
│ Verified: +919876543210 ✓      │
└────────────────────────────────┘
```

### Success Screen (Full Screen)
```
┌────────────────────────────────┐
│                                │
│           🏆                   │
│                                │
│ Registration Successful!       │
│                                │
│ You're all set for the         │
│ CBSE Scholarship Test.         │
│ Check email for details.       │
│                                │
│ ┌──────────────────────────┐   │
│ │ Next Steps:              │   │
│ │ ✓ Confirm phone          │   │
│ │ ✓ Study materials sent   │   │
│ │ ✓ Join test at time      │   │
│ └──────────────────────────┘   │
│                                │
│ [Back to Home]                 │
│                                │
└────────────────────────────────┘
```

---

## Interaction Timeline

```
TIME          ACTION                      SYSTEM RESPONSE
────────────────────────────────────────────────────────────
T+0s         User clicks "Enroll"        Show phone input
T+5s         Enter phone: 9876543210     Validate in real-time
T+10s        Click "Send OTP"            
             ├─ Disable button
             ├─ Show "Sending..."
             └─ Call signInWithOTP()

T+15s        OTP generation              Behind the scenes:
             ├─ Generate 6-digit code    ├─ OTP created
             ├─ Store in Supabase        ├─ SMS queued
             └─ Send via SMS provider    └─ Provider sends

T+20-30s     SMS arrives on phone        User receives message
             ├─ Supabase shows
             │  "Sending OTP..."
             └─ No action needed

T+35s        User enters OTP: 123456     Validate as typed
T+40s        Click "Verify OTP"          
             ├─ Disable button
             ├─ Show "Verifying..."
             └─ Call verifyOTP()

T+45s        OTP verification            Behind the scenes:
             ├─ Match against stored     ├─ OTP verified
             ├─ Check not expired        ├─ Session created
             └─ Create session           └─ User authenticated

T+50s        Show profile form           Display name, email, class
T+60s        User enters details         Real-time validation
T+65s        Click "Complete"            
             ├─ Disable button
             ├─ Show "Registering..."
             └─ Call registerForScholarship()

T+70s        Database insert             Behind the scenes:
             ├─ RLS policy check         ├─ Data validated
             ├─ FK check                 ├─ Inserted to DB
             └─ Trigger (if any)         └─ Timestamps set

T+75s        Show success page           Display confirmation
T+80s        User clicks "Home"          Back to landing page
```

---

## Error Scenarios

### Scenario 1: Invalid Phone Number
```
User enters: 123  (too short)
System shows: ❌ "Please enter valid 10-digit number"
Button state: Disabled
User corrects: 9876543210
System: ✅ "Valid" (enables button)
```

### Scenario 2: OTP Expired
```
User waits > 6 minutes
Tries to enter OTP: 123456
System shows: ❌ "OTP expired, please request new one"
User clicks: "Resend OTP"
System: Shows 60-second cooldown
```

### Scenario 3: Invalid OTP
```
User enters: 111111 (wrong code)
Clicks "Verify OTP"
System shows: ❌ "Incorrect OTP, please try again"
Button: Re-enabled for retry
User has: Unlimited attempts
After 3 attempts: Shows "Resend OTP" option
```

### Scenario 4: Network Error
```
User fills profile
Clicks "Complete Registration"
Network drops
System shows: ❌ "Connection error, please try again"
Data: Saved in local form state
User can: Retry immediately
```

---

## Accessibility Features

- ✅ Semantic HTML (`<form>`, `<label>`, `<input>`)
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus visible on all inputs
- ✅ Error messages linked to inputs
- ✅ Color contrast ratio 4.5:1+
- ✅ Mobile touch targets 48px+
- ✅ Screen reader friendly
- ✅ Alt text on icons
- ✅ Form validation messages clear

---

## Mobile Optimization

```
Phone Screen (375px)         Tablet Screen (768px)      Desktop (1024px)
─────────────────────────────────────────────────────────────────────
│ [Logo]                     │ [Logo]        Nav Links   │ [Logo] Nav │
├─────────────────────────────────────────────────────────────────────┤
│ Hero Content               │ 2-Col Layout              │ 2-Col Layout
│ (100% width)               │ Better proportions        │ Full use
│                            │                           │
│ Scholarship Card           │ Card + Content            │ Card + Content
│ (100% width)               │ (Side by side)            │ (Optimized)
│                            │                           │
│ Features: Stacked          │ Features: 2x2             │ Features: 3 Cols
│ (1 per row)                │                           │
│                            │                           │
│ Stats: Stacked             │ Stats: 2x2                │ Stats: 4 Cols
│ FAQ: Full width            │ FAQ: Better spacing       │ FAQ: 2 Cols max
└─────────────────────────────────────────────────────────────────────┘
```

---

This journey shows every step, every screen, and every interaction a user experiences from landing on your scholarship page to successful registration!
