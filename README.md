# HelaKenya-
This site is made for educational purposes only. Risk of loss by the user is users risk

Cross-platform fintech app for Kenya with STK Push deposits.

## Structure

- `mobile/` - Flutter app for Android/iOS (with aviator icon)
- `web/` - React web app (with aviator icon)
- `backend/` - Node.js backend for M-Pesa STK Push
- `README.md` - Overview and setup instructions

## Setup

### Backend

1. Copy `backend/.env.example` to `backend/.env` and fill in your M-Pesa sandbox credentials.
2. Run `npm install` in `backend/`, then `node mpesaStkPush.js`.

### Mobile

1. Run `flutter pub get` in `mobile/`.
2. Update the backend API URL in `main.dart`.
3. Use `flutter run` to launch the app.

### Web

1. Run `npm install` in `web/`.
2. Update the backend API URL in `DepositForm.jsx`.
3. Use `npm start` to launch the app.

## Icon

- Replace `helakenya_icon.png` in both `mobile/assets/icons/` and `web/public/` with your provided aviator logo.

## Next Steps

- Implement Google Play and Apple in-app purchases.
- Connect UI to backend endpoints for deposits.
- Add authentication, user management, and business logic as needed.
