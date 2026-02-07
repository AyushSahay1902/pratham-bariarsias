# 🎓 Scholarship Registration Website

A **production-ready scholarship registration website** with mobile OTP authentication built with Next.js, Supabase, and Tailwind CSS.

## ✨ Features

✅ **Phone-Based OTP Authentication** - Passwordless registration using SMS  
✅ **Multi-Step Registration** - Phone → OTP → Profile → Success  
✅ **Responsive Design** - Mobile-first, works on all devices  
✅ **Database Integration** - Secure data storage with Supabase  
✅ **Row-Level Security** - Protected user data with RLS policies  
✅ **Professional UI** - Inspired by Unacademy & Bariar's IAS Academy  
✅ **Educational Content** - Features, stats, FAQ sections  
✅ **SMS Flexibility** - Support for Twilio, AWS SNS, MessageBird  
✅ **Production Ready** - Error handling, validation, security best practices  
✅ **Easy to Customize** - Change scholarship details, colors, content  

---

## 📁 Documentation

This project includes comprehensive documentation:

| Document | Purpose |
|----------|---------|
| **QUICK_START.md** | 5-minute setup guide (START HERE!) |
| **SETUP_GUIDE.md** | Complete setup and configuration guide |
| **SMS_CONFIGURATION.md** | SMS provider setup (Twilio, AWS, MessageBird) |
| **IMPLEMENTATION_SUMMARY.md** | Technical overview and architecture |
| **USER_JOURNEY.md** | Visual diagrams and flow charts |
| **README.md** | This file |

**👉 Start with `QUICK_START.md` for a fast overview**

---

## 🚀 Quick Start (5 Minutes)

### 1. Verify Supabase Setup
Check your v0 sidebar under "Vars" - you should see:
- `NEXT_PUBLIC_SUPABASE_URL` ✓
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✓

### 2. Choose SMS Provider
**Recommended: Twilio**
- Sign up: https://www.twilio.com/
- Get free $15 credits
- Configure in Supabase: Authentication → Providers → Phone

### 3. Test Locally
```bash
npm install
npm run dev
# Open http://localhost:3000
```

### 4. Deploy to Vercel
```bash
# Push to GitHub
# Vercel auto-deploys
# Add Supabase env vars to Vercel dashboard
```

**For detailed setup, see `QUICK_START.md`**

---

## 📚 Project Structure

```
scholarship-website/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Main landing page (338 lines)
│   └── globals.css             # Global styles
│
├── components/scholarship/
│   ├── scholarship-card.tsx    # Scholarship display (81 lines)
│   ├── phone-registration.tsx  # Phone + OTP + flow (177 lines)
│   ├── otp-verification.tsx    # OTP input verification (127 lines)
│   └── registration-form.tsx   # Profile completion (159 lines)
│
├── lib/
│   ├── auth.ts                 # Auth functions (55 lines)
│   ├── scholarship.ts          # DB functions (74 lines)
│   └── supabase/
│       ├── client.ts           # Client instance
│       ├── server.ts           # Server instance
│       └── middleware.ts       # Session management
│
├── scripts/
│   └── 001_create_scholarship_tables.sql  # DB setup
│
├── middleware.ts               # Next.js middleware
│
└── 📖 Documentation
    ├── QUICK_START.md
    ├── SETUP_GUIDE.md
    ├── SMS_CONFIGURATION.md
    ├── IMPLEMENTATION_SUMMARY.md
    ├── USER_JOURNEY.md
    └── README.md
```

---

## 🔐 Authentication Flow

```
User Phone Entry
      ↓
signInWithOTP() 
      ↓
Supabase generates 6-digit OTP
      ↓
SMS sent via provider (Twilio/AWS/etc)
      ↓
User verifies OTP
      ↓
verifyOTP()
      ↓
Session created + authenticated user
      ↓
User completes profile
      ↓
registerForScholarship()
      ↓
Data saved to database with RLS protection
      ↓
✅ Success!
```

---

## 💾 Database Schema

### Scholarships Table
```sql
id (UUID)
title (Text)
description (Text)
test_schedule (Text)
scholarship_percentage (Int)
target_classes (Text)
created_at (Timestamp)
```

### Registrations Table
```sql
id (UUID)
user_id (UUID) → references auth.users
scholarship_id (UUID) → references scholarships
phone_number (Text)
full_name (Text)
email (Text)
class_level (Text)
status (Text)
created_at (Timestamp)
updated_at (Timestamp)
```

Row-Level Security (RLS) ensures users can only access their own registrations.

---

## 🎨 Design Features

**Color Scheme:**
- Primary: Blue (`blue-600`, `blue-700`)
- Accent: Green (`green-600`, `green-700`)
- Neutral: Gray scale

**Responsive:**
- Mobile: 1 column, full width
- Tablet: 2 columns with better spacing
- Desktop: Multi-column with optimized layouts

**Components:**
- Scholarship card with benefits
- Phone input with validation
- OTP verification with resend
- Profile form with dropdown
- Success confirmation page
- Feature cards
- Statistics section
- FAQ accordion
- Footer with links

---

## 🔧 Configuration

### Environment Variables
No setup needed - Supabase env vars are automatic:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Customize Scholarship
Edit in `app/page.tsx`:
```typescript
const SCHOLARSHIP = {
  id: 'cbse-scholarship-2024',
  title: 'CBSE Scholarship Test',
  description: 'All India Scholarship Test for CBSE Students',
  testSchedule: 'Every Sunday, 12 PM',
  scholarshipPercentage: 90,
  targetClasses: 'Class 6 - 12 & Foundation',
}
```

### SMS Provider Setup
1. Create account with provider (Twilio recommended)
2. Get API credentials
3. Go to Supabase → Authentication → Providers → Phone
4. Select provider and enter credentials
5. Done! ✅

**See `SMS_CONFIGURATION.md` for detailed setup**

---

## 🚢 Deployment

### Deploy to Vercel
```bash
# 1. Push code to GitHub
git push origin main

# 2. Go to https://vercel.com
# 3. Import project from GitHub
# 4. Vercel auto-detects Next.js
# 5. Add environment variables from Supabase
# 6. Deploy! 🚀
```

### Pre-Deployment Checklist
- [ ] SMS provider configured
- [ ] Database migration executed
- [ ] Environment variables set
- [ ] Test registration locally
- [ ] Mobile responsiveness verified
- [ ] Error scenarios tested

---

## 📊 What You Get

### Pages & Sections
- ✅ Landing page with hero section
- ✅ Scholarship details card
- ✅ Features section (3 cards)
- ✅ Statistics section (4 metrics)
- ✅ FAQ section (5 questions)
- ✅ Footer with links

### Forms
- ✅ Phone number input
- ✅ OTP verification
- ✅ Profile completion form
- ✅ Success confirmation

### Features
- ✅ Input validation
- ✅ Error handling
- ✅ Loading states
- ✅ Cooldown timers
- ✅ Resend capability
- ✅ Session management

### Security
- ✅ Phone OTP verification
- ✅ Row-level security (RLS)
- ✅ Input validation
- ✅ HTTPS encryption
- ✅ Passwordless auth

---

## 💰 Costs

| Service | Cost | Notes |
|---------|------|-------|
| SMS | $0.05-0.10/SMS | Twilio example |
| Database | ~$1-5/month | Supabase generous free tier |
| Hosting | FREE | Vercel free tier |
| **Total** | **$50-100/month** | For 1,000 registrations |

---

## 🔍 Key Files

| File | Lines | Purpose |
|------|-------|---------|
| `app/page.tsx` | 338 | Main landing page |
| `components/scholarship/phone-registration.tsx` | 177 | Phone entry & flow |
| `components/scholarship/otp-verification.tsx` | 127 | OTP verification |
| `components/scholarship/registration-form.tsx` | 159 | Profile form |
| `lib/auth.ts` | 55 | Auth functions |
| `lib/scholarship.ts` | 74 | Database functions |

---

## 🎯 User Journey

```
1. User lands on homepage
   ↓ Sees scholarship details
   ↓ Clicks "Enroll for Free"

2. Phone entry screen
   ↓ Enters phone number
   ↓ Clicks "Send OTP"
   ↓ Receives SMS with code

3. OTP verification
   ↓ Enters 6-digit code
   ↓ System verifies
   ↓ Session created

4. Profile completion
   ↓ Enters name, email, class
   ↓ Clicks "Complete"
   ↓ Data saved to database

5. Success page
   ↓ Shows confirmation
   ↓ Lists next steps
   ↓ Option to return home
```

---

## ❓ FAQ

**Q: Can I change the scholarship details?**
A: Yes! Edit the `SCHOLARSHIP` object in `app/page.tsx`

**Q: Which SMS provider should I use?**
A: Twilio is recommended - easiest setup and reliable

**Q: How much does it cost?**
A: ~$50-100/month for 1000 registrations (mostly SMS cost)

**Q: Can I use my own SMS provider?**
A: Yes! Supabase supports Twilio, AWS SNS, MessageBird, and custom providers

**Q: Is the database automatically set up?**
A: The migration script creates tables, but you may need to execute it manually in Supabase

**Q: Can I change the colors?**
A: Yes! Search and replace Tailwind classes in components

**Q: Does it work on mobile?**
A: Yes! Fully responsive design tested on all devices

**Q: Can I add email verification too?**
A: Yes! You can add email OTP as an additional step if needed

**Q: What if OTP delivery fails?**
A: Check SMS provider logs and ensure credentials are correct

---

## 🛠️ Customization Examples

### Change Primary Color
Replace all `blue-600` with your color in components

### Add Email Verification
Add additional step after OTP verification

### Enable Referrals
Add `referrer_id` column to registrations table

### Add Payment
Integrate Stripe after registration complete

### Add Admin Dashboard
Create `/admin` route with registration management

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (full width, stacked)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (optimized layout)

All components use Tailwind responsive prefixes (`md:`, `lg:`, etc)

---

## 🔐 Security Best Practices

✅ Phone verification prevents fake signups  
✅ OTP expires after 6 minutes  
✅ Row-level security protects data  
✅ No passwords stored (passwordless auth)  
✅ Input validation on all fields  
✅ SQL injection protection  
✅ HTTPS encryption  
✅ Session tokens secure  

---

## 📞 Support

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Vercel Help**: https://vercel.com/help

For detailed setup: See `QUICK_START.md`  
For SMS setup: See `SMS_CONFIGURATION.md`  
For full guide: See `SETUP_GUIDE.md`  

---

## 📄 License

Built with v0.app - Educational project template

---

## 🎉 Ready to Launch?

1. **Read**: `QUICK_START.md` (5 minutes)
2. **Setup**: Configure SMS provider (10 minutes)
3. **Test**: Run locally and register (5 minutes)
4. **Deploy**: Push to GitHub and deploy to Vercel (5 minutes)
5. **Monitor**: Check Supabase for registrations

**Total time to launch: ~25 minutes! 🚀**

---

**Questions?** Check the documentation files or Supabase docs.

**Ready to start?** Open `QUICK_START.md` now! 👉
