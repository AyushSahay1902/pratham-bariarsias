# Scholarship Website - Quick Start Guide

## What You Have

A complete **scholarship registration website** with:
- 📱 **Phone-based OTP registration** (Supabase Auth)
- 🎓 **Scholarship scholarship information** pages
- 📝 **Multi-step registration form** (Phone → OTP → Details)
- 💾 **Database storage** for registrations
- 📱 **Mobile responsive** design
- ✨ **Professional UI** inspired by Unacademy & Bariar's IAS

---

## 3-Step Setup (5 minutes)

### 1. Ensure Supabase is Connected ✅
- You already have Supabase configured
- Verify in "Vars" section of v0 sidebar:
  - `NEXT_PUBLIC_SUPABASE_URL` exists
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` exists

### 2. Set Up SMS Provider

**Best Choice: Twilio (Recommended)**

```
1. Go to https://www.twilio.com/
2. Create free account (get $15 credits)
3. Get your:
   - Account SID
   - Auth Token
   - Phone Number
4. Go to Supabase Dashboard → Authentication → Providers
5. Enable "Phone" provider
6. Select "Twilio" and enter your credentials
7. Done! ✅
```

**Alternative: AWS SNS** (if already using AWS)
```
1. Create SNS service in AWS
2. Get IAM credentials
3. Go to Supabase Dashboard → Auth → Providers
4. Select "AWS SNS"
5. Enter credentials
```

### 3. Deploy to Vercel
```bash
# Push to GitHub, then:
# 1. Connect repo to Vercel
# 2. Vercel auto-deploys
# 3. Test at https://your-project.vercel.app
```

---

## Registration Flow Walkthrough

```
User lands on homepage
        ↓
Clicks "Enroll for Free"
        ↓
Enters phone number (+91 format)
        ↓
Receives OTP via SMS
        ↓
Enters 6-digit OTP
        ↓
Fills profile (name, email, class)
        ↓
Submits registration
        ↓
Saved to database
        ↓
Success page shown ✅
```

---

## File Structure

```
📁 Project Root
├── 📄 app/page.tsx           ← Main landing page
├── 📁 components/scholarship/
│   ├── phone-registration.tsx  ← Phone input & OTP flow
│   ├── otp-verification.tsx    ← OTP verification
│   ├── registration-form.tsx   ← Profile form
│   └── scholarship-card.tsx    ← Scholarship display
├── 📁 lib/
│   ├── auth.ts                 ← Auth functions
│   ├── scholarship.ts          ← DB functions
│   └── supabase/
│       ├── client.ts           ← Client instance
│       └── server.ts           ← Server instance
├── 📁 scripts/
│   └── 001_create_scholarship_tables.sql  ← DB setup
├── 📄 SETUP_GUIDE.md          ← Full documentation
├── 📄 SMS_CONFIGURATION.md    ← SMS provider guide
└── 📄 QUICK_START.md          ← This file
```

---

## Quick Customization

### Change Scholarship Details
**File:** `app/page.tsx` (top of file)

```javascript
const SCHOLARSHIP = {
  title: 'Your Scholarship Name',
  description: 'Your description',
  testSchedule: 'Your schedule',
  scholarshipPercentage: 90,    // Change percentage
  targetClasses: 'Class 6 - 12', // Change classes
}
```

### Change Colors
Search for these in components and replace:
- `blue-600` → Your primary color
- `green-600` → Your accent color
- `gray-900` → Your text color

### Change Validation
**File:** `components/scholarship/phone-registration.tsx`

```javascript
// Change country code
const formattedPhone = `+91${cleanPhone.slice(-10)}`
// To: `+1${cleanPhone.slice(-10)}` for USA, etc.
```

---

## Testing the App Locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:3000

# 4. Test registration:
#    - Click "Enroll for Free"
#    - Enter test phone number
#    - Check Supabase Auth users table
#    - You'll see new user created
```

---

## Deployment Checklist

Before going live:

- [ ] SMS provider configured (Twilio/AWS/etc)
- [ ] Environment variables set in Vercel
- [ ] Database migration executed
- [ ] Test registration end-to-end on mobile
- [ ] Check that OTP arrives in <30 seconds
- [ ] Verify success page displays correctly
- [ ] Check all links and buttons work
- [ ] Mobile responsiveness verified
- [ ] Error handling tested
- [ ] Privacy policy added (if needed)

---

## Common Issues & Fixes

### "OTP not received"
✅ Check SMS provider credentials are correct
✅ Verify phone number format is +91XXXXXXXXXX
✅ Check provider dashboard for failed deliveries
✅ Wait 60 seconds before retrying

### "Registration fails"
✅ Check browser console (F12) for error messages
✅ Verify Supabase connection (check env vars)
✅ Ensure database migration was executed
✅ Check that user_id is being passed correctly

### "Page looks broken on mobile"
✅ The design is responsive (works on all devices)
✅ Check browser dev tools → toggle device toolbar (F12)
✅ Try different screen sizes

---

## What Happens After User Registers

1. **Immediate:**
   - User sees success page ✅
   - New user created in Supabase Auth (phone verified)
   - Registration record added to database

2. **Backend (You Handle):**
   - Send welcome email
   - Add to mailing list
   - Generate scholarship certificate
   - Enable access to test

3. **Follow-up:**
   - Send test day reminders via SMS
   - Share test link
   - Collect results
   - Award scholarship

---

## Database Tables

### Scholarships Table
Stores scholarship information (pre-filled with CBSE details)

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| title | Text | "CBSE Scholarship Test" |
| description | Text | Scholarship description |
| test_schedule | Text | "Every Sunday, 12 PM" |
| scholarship_percentage | Integer | 90 |
| target_classes | Text | "Class 6 - 12" |
| created_at | Timestamp | Auto-filled |

### Registrations Table
Stores student registrations

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| user_id | UUID | Links to auth user |
| scholarship_id | UUID | Links to scholarship |
| phone_number | Text | "+91XXXXXXXXXX" |
| full_name | Text | Student name |
| email | Text | Optional email |
| class_level | Text | "class-6" to "class-12" |
| status | Text | "registered" |
| created_at | Timestamp | Auto-filled |
| updated_at | Timestamp | Auto-filled |

---

## API Functions Available

### Authentication (`lib/auth.ts`)
```typescript
await signInWithOTP(phoneNumber)      // Send OTP
await verifyOTP(phoneNumber, token)   // Verify OTP
await getCurrentUser()                 // Get user
await signOut()                        // Sign out
```

### Scholarships (`lib/scholarship.ts`)
```typescript
await registerForScholarship(...)      // Create registration
await getScholarships()                // Get all scholarships
await getScholarshipById(id)           // Get one scholarship
await getUserRegistrations(userId)     // Get user's registrations
```

---

## Next Steps

1. **Set up SMS Provider** → Follow SMS_CONFIGURATION.md
2. **Test Locally** → npm run dev
3. **Deploy** → Push to GitHub, Vercel auto-deploys
4. **Monitor** → Check Supabase for registrations
5. **Iterate** → Customize based on feedback

---

## Need Help?

📖 **Full Documentation:** `SETUP_GUIDE.md`  
📱 **SMS Setup:** `SMS_CONFIGURATION.md`  
🚀 **Deploy Guide:** Vercel Dashboard  
💬 **Supabase Help:** supabase.com/docs  

---

## That's It! 🎉

You now have a production-ready scholarship registration website. The heavy lifting is done. Just configure SMS and deploy!

Good luck! 🚀
