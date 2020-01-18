## memo

```bash
# デプロイ
firebase deploy --only functions

# ローカルで試す
## GOOGLE_APPLICATION_CREDENTIALS = 秘密鍵のパス

GOOGLE_APPLICATION_CREDENTIALS=./src/my-app2-bcfdb-firebase-adminsdk-6l97u-c66fd3d0f2.json firebase serve --only functions

## 時間を無視して即時実行
GOOGLE_APPLICATION_CREDENTIALS=./src/my-app2-bcfdb-firebase-adminsdk-6l97u-c66fd3d0f2.json firebase functions:shell
## からの
fetchCalendar()
```

