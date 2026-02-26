# Deploy Steps

## 1. Stage all changes
```
git add -A
```

## 2. Commit with a message
```
git commit -m "your message here"
```

## 3. Push to GitHub
```
git push origin main
```

## 4. Deploy to Vercel
Vercel auto-deploys on push to `main` if connected. To trigger manually or check status:
```
vercel --prod
```
Or visit https://vercel.com/dashboard to monitor the deployment.
