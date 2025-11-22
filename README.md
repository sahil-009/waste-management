# Smart Waste Management App - Setup Guide

## Prerequisites
- Node.js installed
- Expo CLI installed
- Android Studio (for Android) or Xcode (for iOS)
- Appwrite account and project

## Installation

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Appwrite credentials:**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update `.env` with your Appwrite credentials:
     ```env
     EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
     EXPO_PUBLIC_APPWRITE_PROJECT_NAME=your_project_name
     EXPO_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
     ```

3. **Setup Appwrite Backend:**
   - Create database: `waste_management_db`
   - Create collections: `users`, `waste_reports`
   - Create storage buckets: `waste_photos`, `pickup_photos`
   - Deploy cloud functions from `/functions` directory

4. **Run the app:**
   
   **For Android:**
   ```bash
   npm run android
   ```
   
   **For iOS:**
   ```bash
   npm run ios
   ```
   
   **For Web:**
   ```bash
   npm run web
   ```

## Testing the Setup

1. Open the app on your device/simulator
2. Navigate to Create Report screen
3. Test GPS location by tapping "Use Current Location"
4. Test image upload by tapping the photo area
5. Submit a report to verify Appwrite integration

## Features

- 📍 GPS location tracking with reverse geocoding
- 📷 Image upload (camera & gallery)
- ☁️ Appwrite backend integration
- 🎨 Beautiful UI with animations
- 🔐 User authentication
- 📊 Real-time reports and task management

## Troubleshooting

- **Location not working:** Grant location permissions in device settings
- **Camera not working:** Grant camera permissions in device settings
- **Appwrite errors:** Verify credentials in `.env` file
- **Build errors:** Clear cache with `npm start -- --clear`

## Project Structure

```
├── app/                    # Expo Router screens
│   ├── (onboarding)/      # Splash, role selection
│   ├── (auth)/            # Login, signup
│   ├── (resident)/        # Resident screens
│   └── (worker)/          # Worker screens
├── components/            # Reusable UI components
├── lib/                   # Utilities and Appwrite config
├── functions/             # Appwrite cloud functions
└── .env                   # Environment variables (not in git)
```

## Support

For issues or questions, please refer to the documentation or create an issue in the repository.
# waste-management
