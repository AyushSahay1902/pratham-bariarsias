# SMS OTP Configuration Guide

## Best Recommended Approach: Supabase Native Phone Auth

Supabase provides **native phone OTP authentication** which is the most straightforward and secure approach for this project. Here's why it's the best choice:

### Advantages
✅ **Zero Extra Setup** - Integrated with Supabase Auth  
✅ **Secure** - Industry-standard OTP protocols  
✅ **Scalable** - Handles volume automatically  
✅ **Cost-effective** - Pay-as-you-go SMS pricing  
✅ **Session Management** - Automatic session handling  
✅ **No Backend Code** - Everything client-side ready  

---

## Step 1: Enable Phone Authentication in Supabase

1. **Go to Supabase Dashboard**
   - Navigate to your project
   - Click "Authentication" in the left sidebar
   - Go to "Providers"

2. **Enable Phone Provider**
   - Find "Phone" provider
   - Toggle "Enabled" to ON
   - Configure your SMS provider (see options below)

3. **Configure OTP Settings**
   - OTP validity: 6 minutes
   - OTP length: 6 digits
   - Resend cooldown: 60 seconds

---

## Step 2: Choose Your SMS Provider

### Option 1: Twilio (Recommended for Production)

**Setup Steps:**

1. **Create Twilio Account**
   - Go to https://www.twilio.com/
   - Sign up for free account
   - Verify your phone number
   - Get trial credits ($15)

2. **Get Credentials**
   - Account SID: `AC...`
   - Auth Token: `your_auth_token`
   - Phone Number: `+1234567890` (Twilio assigned)

3. **In Supabase Dashboard:**
   - Provider: Select "Twilio"
   - Account SID: Paste your Account SID
   - Auth Token: Paste your Auth Token
   - Message Template: 
     ```
     Your verification code is {{.otp}}
     ```

4. **Test**
   - Use phone registration form
   - OTP will arrive via SMS

**Costs:**
- Trial: $15 free credits
- Production: ~$0.05-0.10 per SMS
- For 1000 registrations/month ≈ $50-100

---

### Option 2: AWS SNS (If Using AWS Ecosystem)

**Setup Steps:**

1. **Create AWS Account**
   - https://aws.amazon.com/
   - Billing setup required

2. **Create SNS Credentials**
   - Service: SNS (Simple Notification Service)
   - Region: Choose closest to India (Mumbai: ap-south-1)
   - Create IAM user with SNS permissions
   - Get Access Key ID & Secret Access Key

3. **In Supabase Dashboard:**
   - Provider: Select "AWS SNS"
   - Region: `ap-south-1` (India)
   - Access Key ID: Your IAM access key
   - Secret Access Key: Your IAM secret

4. **Request India Support**
   - SMS sent from India requires special approval
   - Contact AWS support for "SMS Origination"
   - Provide use case: Educational scholarship

**Costs:**
- First 100 SMSes free/month
- Then: ~₹0.50-1 per SMS in India
- For 1000 registrations/month ≈ ₹500-900

---

### Option 3: MessageBird (Global, India Support)

**Setup Steps:**

1. **Create MessageBird Account**
   - https://www.messagebird.com/
   - Instant API keys
   - India phone support

2. **Get API Key**
   - Dashboard → Developers → API Keys
   - Copy your Live API Key

3. **In Supabase Dashboard:**
   - Provider: Select "MessageBird"
   - API Key: Paste your Live API Key

**Costs:**
- ~₹1-2 per SMS in India
- Reliable for Indian numbers

---

### Option 4: Custom SMS Provider (Advanced)

If Supabase doesn't support your preferred provider, you can:

1. **Use Supabase Edge Functions**
   - Create custom OTP logic
   - Call your SMS provider API
   - Handle OTP verification manually

2. **Or Add Custom API Route**
   - Create `/app/api/auth/send-otp.ts`
   - Integrate with any SMS API (Exotel, Route Mobile, etc.)

Example with custom provider:
```typescript
// /app/api/auth/send-otp.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { phoneNumber, otp } = await request.json()

  // Call your SMS provider
  const response = await fetch('https://your-sms-api.com/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SMS_API_KEY}`,
    },
    body: JSON.stringify({
      to: phoneNumber,
      message: `Your OTP is: ${otp}`,
    }),
  })

  return NextResponse.json({ success: true })
}
```

---

## Step 3: Configure Environment Variables

### For Supabase Phone Auth
No additional env vars needed - Supabase handles SMS configuration in dashboard.

### For Custom Implementation
Add to your `.env.local`:
```env
# Twilio
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# AWS SNS
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret

# MessageBird
MESSAGEBIRD_API_KEY=your_api_key

# Custom Provider
SMS_API_KEY=your_custom_key
SMS_API_URL=https://your-api.com
```

---

## Step 4: Test the Flow

### Manual Testing

1. **Start the app**
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

2. **Test registration**
   - Click "Enroll for Free"
   - Enter your phone number (use test number if in trial)
   - Check SMS received
   - Enter OTP
   - Complete registration
   - Verify success page

3. **Check Supabase Dashboard**
   - Go to "Authentication" → "Users"
   - Verify new user created with phone verified
   - Go to "SQL Editor" → Query registrations table
   - Verify registration record saved

### Production Testing

Before launching:
- Test with 10 real phone numbers
- Verify OTP delivery time (usually <30 seconds)
- Test on mobile devices
- Test poor network conditions
- Test OTP resend functionality

---

## Cost Comparison

| Provider | Setup Time | Cost/SMS | Monthly (1000 SMS) | Best For |
|----------|-----------|----------|-------------------|----------|
| **Twilio** | 15 min | $0.05-0.10 | $50-100 | US/Global, reliable |
| **AWS SNS** | 30 min | ₹0.50-1 | ₹500-900 | AWS ecosystem, India |
| **MessageBird** | 10 min | ₹1-2 | ₹1000-2000 | Global, easy setup |
| **Supabase Default** | Varies | Provider's rate | Varies | Simplest setup |

---

## Troubleshooting SMS Delivery

### OTP Not Arriving

**Check 1: Provider Configuration**
- Verify credentials are correct
- Check provider dashboard for failed deliveries
- Ensure API key hasn't expired

**Check 2: Phone Number Format**
```javascript
// Correct formats:
+91 9876543210  // India with +91
+14155552671    // USA

// Current code handles:
+91{10-digit-number}
```

**Check 3: Rate Limiting**
- Check if number is rate limited
- Try different number
- Wait 5 minutes before retry

**Check 4: Provider Logs**
- Twilio: Logs → Messaging Logs
- AWS SNS: CloudWatch → SNS Logs
- MessageBird: Dashboard → Messages

### High Bounce Rates

- Invalid phone numbers in your database
- Numbers in "Do Not Call" registry (India)
- Shortcodes not allowed in country
- Carrier blocking (rare)

### Costs Higher Than Expected

- SMS to invalid numbers still charged
- International numbers cost more
- Duplicate sends cost more
- Use validation before sending

---

## Best Practices

✅ **Validate Phone Format** - Before sending OTP  
✅ **Rate Limit OTP Sends** - Max 3 per 1 hour per number  
✅ **Log OTP Attempts** - For security audits  
✅ **Use Expiring OTPs** - 6 minutes is standard  
✅ **Show Delivery Status** - "Sending OTP..." feedback  
✅ **Monitor Costs** - Set up billing alerts  
✅ **Test Failed Scenarios** - Wrong OTP, expired, etc.  

---

## Next Steps

1. **Choose SMS Provider** → Follow setup for your choice
2. **Enable in Supabase** → Configure in Auth → Providers
3. **Test Locally** → npm run dev & test registration
4. **Deploy to Vercel** → Push code & set env vars
5. **Monitor Delivery** → Check provider dashboard
6. **Collect Feedback** → Iterate on OTP flow

---

## Additional Resources

- **Supabase Phone Auth**: https://supabase.com/docs/guides/auth/phone-login
- **Twilio Setup**: https://www.twilio.com/docs/sms/
- **AWS SNS Setup**: https://docs.aws.amazon.com/sns/
- **MessageBird Setup**: https://developers.messagebird.com/

For any issues, check the provider's documentation or contact their support.
