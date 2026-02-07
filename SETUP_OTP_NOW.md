# 🚨 URGENT: OTP Provider Setup Required

## Current Issue
Your OTP registration is showing: **"Unsupported phone provider"**

This is expected! Supabase doesn't send SMS by default. You need to configure an SMS provider.

---

## Quick Setup (5 minutes)

### What You Need
An SMS provider account. Choose one:
- **Twilio** (Recommended for India) - $0.0075/SMS
- **MessageBird** - $0.025/SMS  
- **AWS SNS** - $0.10/SMS

### Step-by-Step Instructions

#### 1️⃣ Get SMS Provider Account

**For Twilio (Recommended):**
- Go to https://www.twilio.com/console/phone-numbers/incoming
- Create a free trial account
- Get your "Account SID" and "Auth Token"
- Create or use a trial phone number

#### 2️⃣ Configure in Supabase

1. Open your Supabase project dashboard
2. Go to **Authentication > Providers > SMS**
3. Select your SMS provider (Twilio/MessageBird/AWS SNS)
4. Paste your credentials:
   - Twilio: Account SID + Auth Token + Phone Number
   - MessageBird: API Key
   - AWS SNS: Access Key ID + Secret Key
5. Click **Save**

#### 3️⃣ Test It!

1. Refresh the Pratham website
2. Click "Register Now"
3. Enter your phone number (with +91 for India)
4. Click "Send OTP"
5. You should receive an SMS!
6. Enter the OTP code
7. Complete registration with name & email

---

## Cost Estimates (Monthly)

Assuming 100 registrations per month:

| Provider | Cost | Notes |
|----------|------|-------|
| Twilio   | $0.75 | Best for India, reliable |
| MessageBird | $2.50 | Also good, slightly higher rate |
| AWS SNS | $10 | Most expensive, good if you use AWS |

For testing: Use Twilio's free trial ($15 credit) - covers 2000+ OTPs!

---

## Detailed Setup by Provider

### Twilio Setup

1. **Create Account:** https://www.twilio.com/try-twilio
2. **Get Credentials:**
   - Login to Console
   - Copy "Account SID" from top right
   - Copy "Auth Token" from top right
   - Go to Phone Numbers > Manage Numbers
   - Either use trial number or buy one
3. **In Supabase:**
   - Auth > Providers > SMS
   - Select "Twilio"
   - Paste Account SID
   - Paste Auth Token
   - Paste your Twilio phone number (with + and country code, e.g., +1234567890)
   - Save

### MessageBird Setup

1. **Create Account:** https://www.messagebird.com/app/en/dashboard
2. **Get API Key:**
   - Dashboard > API > Access Keys
   - Copy your API Key
3. **In Supabase:**
   - Auth > Providers > SMS
   - Select "MessageBird"
   - Paste API Key
   - Save

### AWS SNS Setup

1. **Create AWS Account:** https://console.aws.amazon.com
2. **Setup SNS:**
   - Go to SNS Service
   - Create a new topic for SMS
   - Note your Topic ARN
3. **Get IAM Credentials:**
   - IAM > Users > Create User with SNS permissions
   - Copy Access Key ID and Secret Key
4. **In Supabase:**
   - Auth > Providers > SMS
   - Select "AWS SNS"
   - Paste credentials
   - Save

---

## Troubleshooting

### "Still not working!"

Check these:

✅ SMS provider is **Enabled** in Supabase (toggle is on)  
✅ Phone number format is `+91XXXXXXXXXX` (with country code)  
✅ SMS provider account has credits/balance  
✅ API keys copied correctly (no extra spaces)  
✅ Reload the website after saving in Supabase  

### "Getting rate limit error"

This means too many OTP requests. Wait a minute and try again.

### "SMS not arriving"

- Check phone provider's SMS logs
- Verify your phone number is in correct format
- Try from a different browser
- Ensure SMS provider has active balance

---

## What Happens After Setup?

Once configured:
1. User enters phone → OTP is sent via SMS
2. User enters OTP → Phone is verified
3. User enters Name & Email → Registration complete
4. Data stored in Supabase database
5. User can login with phone OTP anytime

---

## Support

- **Twilio Help:** https://www.twilio.com/help
- **MessageBird Help:** https://support.messagebird.com
- **AWS SNS Help:** https://docs.aws.amazon.com/sns/
- **Supabase Docs:** https://supabase.com/docs/guides/auth/phone-login

---

## Do This Now ⏰

1. Pick an SMS provider (Twilio recommended)
2. Create account (5 min)
3. Get credentials (1 min)
4. Add to Supabase (2 min)
5. Test OTP (1 min)

**Total time: ~10 minutes** ✅

Once done, your Pratham scholarship registration is ready! 🚀
