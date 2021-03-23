# FinText

After clone to local, do
```
cd frontend
npm install
```
to install all the dependeces (ignored by git)

You might be prompted to fix dependences by 
```
npm audit fix
```

And then, start expo by
```
npm start
```


You can find all the XXXscreens.js in app/screens

The App.js is the main entry point, where you can change the screen shown in your phone.

Please store your reusable component is the app/components folder, edit reusable color to app/config/colors.js, store all images in app/assets


There are already some reusable components like buttons, text, textInput, feel free to use them and make the UI consistent.


To start the backend
```
nodemon index.js
```

Use a real phone (not emulator) with Expo client installed if you want to test the real time tweet features. Then set your own WLAN IP address in the config/connection.js.

I also set up a simple web app for the tweets features testing. Go to http://localhost:4000. You can start multiple instances to test.  



