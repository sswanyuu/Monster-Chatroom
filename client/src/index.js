import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/user.context.jsx";
import { MessageProvider } from "./context/message.context.jsx";
import { MonsterProvider } from "./context/monster.context.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MonsterProvider>
    <UserProvider>
      <MessageProvider>
        <App />
      </MessageProvider>
    </UserProvider>
  </MonsterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
