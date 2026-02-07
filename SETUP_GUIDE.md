# Scholarship Registration Website - Setup Guide

## Overview
This is a complete scholarship registration landing page with **Supabase Authentication using Phone OTP**. Students can register via mobile number verification and enroll for the CBSE Scholarship Test.

## Features
✅ Landing page with scholarship information  
✅ Phone number-based OTP authentication (Supabase native)  
✅ Multi-step registration flow (Phone → OTP → Details)  
✅ Database storage for registrations  
✅ Responsive design inspired by Unacademy and Bariar's IAS  
✅ Success confirmation page  
✅ FAQ and features sections  

## Architecture

### Authentication Flow
1. **Phone Input** - User enters phone number (10 digits, Indian format)
2. **OTP Verification** - Supabase sends SMS OTP, user verifies
3. **Registration Details** - User completes profile (name, email, class)
4. **Confirmation** - Data saved to database, success page shown

### Database Schema

#### scholarships table
```sql
- id (UUID, primary key)
- title (text)
- description (text)
- test_schedule (text)
- scholarship_percentage (integer)
- target_classes (text)
- created_at (timestamp)
```

#### registrations table
```sql
- id (UUID, primary key)
- user_id (UUID, references auth.users)
- scholarship_id (UUID, references scholarships)
- phone_number (text)
- full_name (text)
- email (text)
- class_level (text)
- status (text, default: 'registered')
- created_at (timestamp)
- updated_at (timestamp)
```

**Row Level Security (RLS):**
- Scholarships: Public read access
- Registrations: Users can only view/edit their own registrations

## Project Structure

```
/app
  /layout.tsx              # Root layout with metadata
  /page.tsx                # Main landing page
  
/components
  /scholarship
    /scholarship-card.tsx  # Scholarship display card
    /phone-registration.tsx # Phone registration component
    /otp-verification.tsx   # OTP verification step
    /registration-form.tsx  # Profile completion form

/lib
  /auth.ts                 # Authentication functions
  /scholarship.ts          # Scholarship/registration functions
  /supabase
    /client.ts             # Client-side Supabase instance
    /server.ts             # Server-side Supabase instance
    /middleware.ts         # Session management middleware

/scripts
  /001_create_scholarship_tables.sql  # Database setup

/middleware.ts             # Next.js middleware for auth
```

## Setup Instructions

### 1. Environment Variables
The following variables are automatically set by Supabase integration:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Ensure these are configured in your Vercel project settings under the Vars section.

### 2. Database Setup
The migration script (`scripts/001_create_scholarship_tables.sql`) creates:
- `scholarships` table
- `registrations` table
- RLS policies for security
- Default CBSE scholarship entry

Execute this through the Vercel UI or manually in Supabase dashboard.

### 3. Supabase Configuration

#### Enable Phone Authentication
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable "Phone"
3. Add your SMS provider (Twilio, AWS SNS, or custom)
4. Configure environment variables for SMS sending

#### Configure OTP Settings
- OTP validity: 6 minutes (default)
- SMS provider template: `Your OTP is: {{.otp}}`

### 4. SMS Provider Setup (Choose One)

**Option A: Supabase Phone Auth (Recommended)**
- Uses Supabase's built-in phone authentication
- Requires SMS provider configuration in Supabase
- Automatic OTP generation and validation

**Option B: Twilio**
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

**Option C: AWS SNS**
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key_id
AWS_SECRET_ACCESS_KEY=your_secret
```

## Development

### Run Locally
```bash
npm install
npm run dev
# Open http://localhost:3000
```

### Key Files to Understand

**Authentication (`/lib/auth.ts`)**
- `signInWithOTP()` - Send OTP to phone
- `verifyOTP()` - Verify OTP token
- `getCurrentUser()` - Get authenticated user
- `signOut()` - Sign out user

**Scholarship Services (`/lib/scholarship.ts`)**
- `registerForScholarship()` - Create registration record
- `getScholarships()` - Fetch available scholarships
- `getUserRegistrations()` - Get user's registrations

**Components**
- `PhoneRegistration` - 3-step flow management
- `OTPVerification` - OTP input & verification
- `RegistrationForm` - Profile completion form
- `ScholarshipCard` - Scholarship display

## Customization

### Change Scholarship Details
Edit the `SCHOLARSHIP` object in `/app/page.tsx`:
```javascript
const SCHOLARSHIP = {
  id: 'your-scholarship-id',
  title: 'Your Scholarship Name',
  description: 'Your description',
  testSchedule: 'Your schedule',
  scholarshipPercentage: 90,
  targetClasses: 'Your target classes',
}
```

### Customize Colors
The design uses Tailwind CSS with:
- Primary: Blue (blue-600, blue-700)
- Accent: Green (green-600, green-700)
- Neutrals: Gray scale

Edit color classes in components for custom branding.

### Customize Validation
Phone validation in `phone-registration.tsx`:
```typescript
// Currently: Indian phone numbers (+91)
// Modify for your country's format
const formattedPhone = phoneNumber.startsWith('+')
  ? phoneNumber
  : `+91${cleanPhone.slice(-10)}`
```

## Deployment

### Deploy to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Pre-deployment Checklist
- [ ] Supabase project created and connected
- [ ] Phone OTP provider configured
- [ ] Database migration executed
- [ ] SMS provider credentials set
- [ ] Environment variables configured
- [ ] Test registration flow end-to-end
- [ ] Mobile responsiveness verified
- [ ] Error handling tested

## Troubleshooting

### "OTP not received"
1. Verify SMS provider is configured in Supabase
2. Check phone number format (+91 for India)
3. Check SMS provider logs for delivery errors
4. Ensure quotas/limits aren't exceeded

### "Registration fails silently"
1. Check browser console for errors
2. Verify RLS policies in Supabase
3. Ensure `user_id` is correctly passed
4. Check database constraint violations

### "OTP verification fails"
1. Ensure correct OTP format (6 digits)
2. Check OTP hasn't expired
3. Verify phone number matches signup number
4. Check Supabase session is active

## Security Considerations

✅ **OTP Verification** - Ensures phone ownership  
✅ **Row Level Security (RLS)** - Users only access their data  
✅ **No Password Storage** - Phone-based auth is passwordless  
✅ **HTTPS Only** - All connections encrypted  
✅ **Input Validation** - Phone, email, name validated  
✅ **Error Handling** - Generic messages to prevent leakage  

## API Endpoints (if needed)

The app is fully client-side with Supabase. No custom backend API required.

For advanced use cases, you can add Next.js API routes in `/app/api/`:
- `POST /api/registrations` - Create registration
- `GET /api/registrations/[id]` - Get user registrations
- `POST /api/scholarships/verify` - Custom verification

## Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js 15 Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

## License

Built with v0.app - Educational project template
