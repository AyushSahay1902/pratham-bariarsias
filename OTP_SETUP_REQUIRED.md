# OTP Provider Configuration - REQUIRED STEP

## Current Status
The OTP feature is returning: **"Unsupported phone provider"**

This means Supabase does not have an SMS provider configured in your project.

---

## How to Fix (3 Steps)

### Step 1: Go to Supabase Dashboard
1. Open your Supabase project dashboard
2. Navigate to **Authentication > Providers > SMS**

### Step 2: Enable and Configure SMS Provider

Choose ONE of these providers:

#### Option A: Twilio (Recommended for India)
- Go to [Twilio Console](https://www.twilio.com/console)
- Get your `Account SID` and `Auth Token`
- Create a phone number (or use trial number)
- In Supabase SMS settings:
  - Select **Twilio**
  - Paste your Account SID
  - Paste your Auth Token
  - Enter your Twilio phone number
- Click **Save**

#### Option B: MessageBird
- Go to [MessageBird Dashboard](https://dashboard.messagebird.com)
- Get your API Key
- In Supabase SMS settings:
  - Select **MessageBird**
  - Paste your API Key
- Click **Save**

#### Option C: AWS SNS
- Go to AWS Console
- Set up SNS service
- Get your credentials
- In Supabase SMS settings:
  - Select **AWS SNS**
  - Configure with your AWS credentials
- Click **Save**

### Step 3: Test the OTP

After configuring, refresh the page and test the OTP flow:
1. Enter your phone number (with +91 for India)
2. You should receive an SMS with OTP code
3. Enter the OTP to verify

---

## Why This is Needed

Supabase Phone OTP requires a third-party SMS provider to actually send SMS messages. Without one configured, it can't deliver OTPs.

---

## Cost Considerations

- **Twilio**: ~$0.0075 per SMS in India
- **MessageBird**: ~$0.025 per SMS in India
- **AWS SNS**: ~$0.10 per SMS in India

Start with Twilio - it's reliable and cost-effective for India.

---

## Still Having Issues?

Check these:
1. Phone number format: Must be `+91XXXXXXXXXX` (with country code)
2. Verify SMS provider is actually **Enabled** in Supabase
3. Check your SMS provider account has credits
4. Ensure API keys are correct (no extra spaces)

Once configured, OTP should work instantly! 🚀
