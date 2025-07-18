# Frontend Project Setup Guide

### 1. Set up the Backend Server
Follow the provided documentation to configure the backend server.

[Asana clone app for backend](../../../apps/api/README.md)

### 2. Start the Backend Server
Start the backend server by running the following command:

```bash
cd apps/api
make start
```

### 3. Create a `.env.local` file in the `apps/nextjs` directory.

```dotenv
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:8082/api/graphql
NEXT_PUBLIC_API_SUBSCRIPTION_URL=ws://localhost:8082/api/subscription
```

### 4. Generate GraphQL TypeScript Types

Go to the frontend repository and run the command to generate TypeScript types for the GraphQL schema:

```bash
pnpm codegen
```

### 5. Set up Firebase Project

1. Go to the Firebase Console.
2. Create a Firebase project or use an existing one (make sure it's the same as the one used for the backend).
3. Retrieve the Firebase configuration details (API Key, Project ID, etc.).

### 6. Configure Firebase in the Frontend
Add your Firebase project information to the `.env.local` file like this:

```dotenv
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:8082/api/graphql
NEXT_PUBLIC_API_SUBSCRIPTION_URL=ws://localhost:8082/api/subscription
NEXT_PUBLIC_FIREBASE_API_KEY="your FIREBASE_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your FIREBASE_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your FIREBASE_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your FIREBASE_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your FIREBASE_MESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APPID="your FIREBASE_APPID"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="your FIREBASE_MEASUREMENT_ID"
```

### 6. Enable Anonymous sign-in

1. Go to the Firebase Console
2. In the Firebase console, open the Auth section.
3. On the Sign-in Methods page, enable the Anonymous sign-in method.

Check out the details here.

[Authenticate with Firebase Anonymously Using JavaScript](https://firebase.google.com/docs/auth/web/anonymous-auth)
