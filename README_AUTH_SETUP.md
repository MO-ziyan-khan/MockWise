# Supabase Authentication Setup

This document explains how Supabase authentication is implemented in the MockWise app.

## 🚀 Features

- **User Registration**: Email + password signup
- **User Login**: Email + password authentication
- **OAuth Authentication**: Google and GitHub login options
- **Password Visibility Toggle**: Show/hide password functionality
- **Protected Routes**: Dashboard and all dashboard sub-routes require authentication
- **Automatic Redirects**: Unauthenticated users are redirected to login
- **Session Management**: Automatic session handling with Supabase
- **Logout Functionality**: Secure logout with session cleanup

## 🏗️ Architecture

### 1. Authentication Context (`lib/auth-context.tsx`)
- Manages global authentication state
- Provides authentication functions (signUp, signIn, signOut)
- Provides OAuth functions (signInWithGoogle, signInWithGitHub)
- Listens to Supabase auth state changes
- Wraps the entire app in `AuthProvider`

### 2. Protected Routes
- **Dashboard Layout** (`app/dashboard/layout.tsx`): Protects all dashboard routes
- **AuthGuard Component** (`components/auth-guard.tsx`): Reusable route protection
- **Automatic Redirects**: Unauthenticated users → `/login`

### 3. Authentication Pages
- **Login** (`app/login/page.tsx`): Sign in with email/password or OAuth
- **Signup** (`app/signup/page.tsx`): Create new account with email/password
- **Landing Page** (`app/page.tsx`): Public page with auth redirects

## 🔧 Configuration

### Environment Variables
Make sure these are set in your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup

#### 1. Basic Authentication
1. Create a Supabase project
2. Enable Email authentication in Authentication > Providers
3. Configure email templates (optional)
4. Set up Row Level Security (RLS) for your tables

#### 2. OAuth Setup

##### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client IDs
5. Set Application Type to "Web application"
6. Add authorized redirect URIs:
   - `https://your-project.supabase.co/auth/v1/callback`
   - `http://localhost:3000/auth/callback` (for development)
7. Copy Client ID and Client Secret
8. In Supabase Dashboard > Authentication > Providers > Google:
   - Enable Google provider
   - Paste Client ID and Client Secret
   - Save

##### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in application details:
   - Application name: "MockWise"
   - Homepage URL: `http://localhost:3000` (for development)
   - Authorization callback URL: `https://your-project.supabase.co/auth/v1/callback`
4. Copy Client ID and Client Secret
5. In Supabase Dashboard > Authentication > Providers > GitHub:
   - Enable GitHub provider
   - Paste Client ID and Client Secret
   - Save

## 📱 Usage

### For Users
1. **Sign Up**: Visit `/signup` to create account with email/password
2. **Sign In**: Visit `/login` to authenticate with:
   - Email + password
   - Google account
   - GitHub account
3. **Access Dashboard**: Automatically redirected after login
4. **Logout**: Click logout button in dashboard header

### For Developers
1. **Protect Routes**: Wrap components with `AuthGuard`
2. **Access User Data**: Use `useAuth()` hook
3. **Check Authentication**: `const { user, loading } = useAuth()`
4. **OAuth Functions**: Use `signInWithGoogle()` and `signInWithGitHub()`

## 🛡️ Security Features

- **Route Protection**: All dashboard routes require authentication
- **Session Validation**: Automatic session checking on route changes
- **Secure Logout**: Proper session cleanup
- **Loading States**: Prevents flash of protected content
- **OAuth Security**: Secure OAuth flow with proper redirects

## 🔄 Flow Diagram

```
Unauthenticated User
        ↓
    Landing Page (/)
        ↓
    Login/Signup
        ↓
    Authentication (Email/Google/GitHub)
        ↓
    Redirect to Dashboard
        ↓
    Protected Routes
        ↓
    Logout → Back to Landing
```

## 🚨 Error Handling

- **Invalid Credentials**: Clear error messages
- **OAuth Errors**: Proper error handling for OAuth failures
- **Network Issues**: Graceful fallbacks
- **Session Expiry**: Automatic redirect to login
- **Loading States**: Prevents UI glitches

## 📝 Customization

### Adding New Protected Routes
1. Place them under `/app/dashboard/`
2. They'll automatically be protected by the dashboard layout

### Modifying Auth Logic
1. Update `lib/auth-context.tsx`
2. Modify authentication functions as needed
3. Update error handling and validation

### Adding More OAuth Providers
1. Add new provider function in `auth-context.tsx`
2. Add provider button in login page
3. Configure provider in Supabase dashboard

### Styling Changes
1. Update components in `components/` directory
2. Modify Tailwind classes as needed
3. Ensure consistent design with existing UI

## 🧪 Testing

### Manual Testing
1. Try accessing `/dashboard` without login → should redirect to `/login`
2. Sign up with new account → should redirect to dashboard
3. Test OAuth login (Google/GitHub) → should redirect to dashboard
4. Logout → should return to landing page
5. Refresh page → should maintain session
6. Test password visibility toggle → should show/hide passwords

### Common Issues
- **CORS Errors**: Check Supabase project settings
- **OAuth Redirect Errors**: Verify callback URLs in both Supabase and OAuth provider
- **Environment Variables**: Ensure `.env.local` is properly configured
- **Build Errors**: Check TypeScript types and imports

## 🔗 Related Files

- `lib/auth-context.tsx` - Authentication context and provider
- `components/auth-guard.tsx` - Route protection component
- `app/dashboard/layout.tsx` - Protected dashboard layout
- `app/login/page.tsx` - Login page with OAuth and password toggle
- `app/signup/page.tsx` - Signup page with password toggle
- `app/page.tsx` - Landing page with auth logic

## 📚 Next Steps

1. **Email Verification**: Enable email confirmation in Supabase
2. **Password Reset**: Add forgot password functionality
3. **Additional OAuth**: Add more providers (Facebook, Twitter, etc.)
4. **User Profiles**: Add user profile management
5. **Role-Based Access**: Implement different user roles
6. **Two-Factor Authentication**: Add 2FA support
