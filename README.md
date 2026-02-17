# Payment Collection App — Frontend

React Native (Expo) mobile application for loan payment collection.

---

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Framework    | React Native (Expo SDK 51)          |
| Navigation   | React Navigation (Native Stack)     |
| HTTP Client  | Axios                               |
| Forms        | Formik + Yup                        |
| State        | React Hooks                         |

---

## Project Structure

```
frontend/
├── screens/
│   ├── AccountLookupScreen.js   # Account search
│   ├── LoanDetailsScreen.js     # Loan info + payment form
│   └── SuccessScreen.js         # Payment confirmation
├── components/
│   ├── Button.js                # Primary/secondary/outline button
│   ├── Card.js                  # Content card wrapper
│   ├── ErrorMessage.js          # Error display
│   ├── InputField.js            # Form input with validation
│   └── LoadingSpinner.js        # Loading indicator
├── services/
│   └── api.js                   # Axios API client
├── navigation/
│   └── AppNavigator.js          # Stack navigator
├── hooks/
│   └── useApi.js                # API call state management
├── utils/
│   └── formatters.js            # Currency & date formatters
├── App.js                       # Root component
├── app.json                     # Expo config
├── babel.config.js
├── package.json
└── .env.example
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- npm ≥ 9
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (for testing)

---

## 🚀 Quick Test Guide (For Reviewers)

To quickly verify the mobile app, follow these steps:

1. **Connect to Backend**: Ensure your backend is running at the URL specified in `app.json` (or use the provided AWS live URL).
2. **Launch App**: Run `npx expo start --web` (or scan the QR code with Expo Go).
3. **Use Test Accounts**:
   - `ACC-10001`: Test a **Surplus Payment** (Pay ₹12k instead of ₹10k) to see the next month's due reduce.
   - `ACC-10002`: Test an **Underpayment** (Pay ₹5k instead of ₹15k) to see the rollover with interest.
4. **Observe Success Screen**: Notice the professional Transaction ID and the updated "Next Month's Due" amount.

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/payment-collection-frontend.git
cd payment-collection-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Edit `app.json` → `extra.apiUrl` to point to your backend:

```json
{
  "extra": {
    "apiUrl": "http://YOUR_BACKEND_IP:3000/api"
  }
}
```

> **Tip**: For local development on a physical device, use your computer's local IP (e.g., `http://192.168.1.100:3000/api`). `localhost` won't work from a phone.

### 4. Start the App

```bash
# Start Expo dev server
npx expo start

# Or for specific platform
npx expo start --android
npx expo start --ios
npx expo start --web
```

### 5. Run on Device

1. Open the **Expo Go** app on your phone
2. Scan the QR code from the terminal
3. The app loads on your device

---

## Screens

### 1. Account Lookup
- Enter a customer account number
- Validates input with Yup
- Fetches loan details from the backend
- Shows loading spinner and error states

### 2. Loan Details
- Displays full loan information (account, rate, tenure, EMI)
- Payment form with amount validation
- Quick-pay button for full EMI amount
- Expandable payment history section

### 3. Success
- Payment confirmation with details
- Transaction ID and status badge
- Navigate to make another payment or return home

---

## Environment Variables

| Variable   | Description          | Location              |
|------------|----------------------|-----------------------|
| `apiUrl`   | Backend API base URL | `app.json → extra`    |

---

## CI/CD

GitHub Actions automatically:
1. **On PR/Push** → Install → Build Expo web export
2. Build artifacts uploaded for 7-day retention

---

## License

ISC
