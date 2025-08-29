# 🤖 AI-Powered Question Generation Setup

## 🚀 **Free AI Options (No Cost)**

### 1. **Google Gemini (Recommended)**
- **Cost**: Completely FREE
- **Rate Limit**: 60 requests/minute
- **Quality**: Excellent for educational content

#### Setup Steps:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key
5. Add to your `.env.local` file:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

### 2. **Hugging Face Inference API**
- **Cost**: FREE (30,000 requests/month)
- **Models**: Multiple AI models available
- **Setup**: Requires Hugging Face account

### 3. **OpenAI API (Free Credits)**
- **Cost**: $5 free credits for new users
- **Quality**: Highest quality
- **Setup**: Requires credit card for verification

## 🔧 **How It Works Now**

1. **AI First**: Tries to generate questions using AI
2. **Fallback**: If AI fails, uses mock questions
3. **Subject-Specific**: Questions are only from the selected subject
4. **No Mixing**: No more cross-subject questions
5. **Unique**: Each question is unique and relevant

## 📝 **Features**

- ✅ **AI-Generated Questions**: Unique, interview-focused
- ✅ **Subject-Specific**: Only questions from selected subject
- ✅ **Difficulty Matching**: Questions match selected difficulty
- ✅ **Fallback System**: Mock questions if AI fails
- ✅ **Visual Indicator**: Shows when AI was used
- ✅ **No Repetition**: Each question is unique

## 🎯 **Example Prompts**

The AI generates questions like:
- "What is the time complexity of binary search in a sorted array?"
- "Which data structure would you use to implement a priority queue?"
- "Explain the difference between BFS and DFS algorithms."

## 🚨 **Important Notes**

1. **API Key Security**: Never commit your API key to git
2. **Rate Limits**: Respect the free tier limits
3. **Fallback**: System works even without AI
4. **Quality**: AI questions are interview-focused and practical

## 🔄 **Testing**

1. Set up your API key
2. Start a practice session
3. Look for "✨ AI-Generated Questions" indicator
4. Check console for AI generation logs

## 💡 **Customization**

You can modify the AI prompt in `generateQuestionsWithAI()` function to:
- Change question style
- Adjust difficulty levels
- Add specific topics
- Modify question format

## 🆘 **Troubleshooting**

- **AI Not Working**: Check API key and rate limits
- **Questions Not Loading**: Check console for errors
- **Fallback Issues**: Verify mock questions database

---

**The system now generates unique, subject-specific questions using AI, with a robust fallback to mock questions!** 🎉
