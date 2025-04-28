# 🚀 Real-Time Chat Application

![Real Time Chat Application Banner](https://github.com/user-attachments/assets/16c47435-44e1-4cea-8379-3fc046a0007f)

[![GitHub stars](https://img.shields.io/github/stars/HemanthBangera/Chat-room?style=social)](https://github.com/HemanthBangera/Chat-room/stargazers) 
[![GitHub forks](https://img.shields.io/github/forks/HemanthBangera/Chat-room?style=social)](https://github.com/HemanthBangera/Chat-room/network/members) 
[![GitHub issues](https://img.shields.io/github/issues/HemanthBangera/Chat-room)](https://github.com/HemanthBangera/Chat-room/issues)

---

## 📄 Overview

This is a **real-time chat application** that allows users to create temporary chat rooms and communicate instantly using **WebSockets**.  
Unlike traditional HTTP polling, WebSockets enable **instant, bidirectional communication**, making your conversations smoother and faster!

---
## ✨ Key Features

- 🔥 **Real-time Communication:** Instant message delivery using WebSocket technology.
- 🔑 **Room-Based Chat:** Create or join chat rooms with a **unique room code**.
- ⏳ **Temporary Rooms:** Rooms expire once all users leave.
- 👥 **Live User Count:** Displays active user count inside the room.
- 🔔 **Join/Leave Notifications:** Stay informed when users enter or exit.
- 🖥️ **Simple & Clean UI:** A straightforward interface for an enhanced chat experience.

---
## ⚙️ Tech Stack

| Frontend | Backend | Real-time |
|:--------:|:-------:|:---------:|
| React.js | Node.js (Express) | WebSockets (Socket.IO) |

---
## 🎯 How It Works

1. Create a new room ➡️ get a **unique Room Code** (example: `ASD123`).
2. Share this code with your friends to join.
3. Everyone connected to the same room can chat **in real-time**.
4. Messages are displayed alongside usernames.
5. When all users disconnect, the room **automatically closes**.

---
## 🛠️ Installation & Setup

Follow these steps to run the application locally:

### 1. Clone the Repository
```bash
git clone https://github.com/HemanthBangera/Chat-room.git
```

### 2. Setup Backend
```bash
cd Chatroom-be
npm install
npm run dev
```

### 3. Setup Frontend
```bash
cd Chatroom-fe
npm install
npm run dev
```

---
## 🎮 Usage Guide

1. Launch the application in your browser.
2. Click **Create Room** to start a new session (it generates a Room Code).
3. Share the **Room Code** with others.
4. Others can **Join Room** using the code.
5. Start chatting! 🚀

---

## ⚡ Advantages of Using WebSockets

- **Full-Duplex:** Simultaneous two-way communication.
- **Reduced Latency:** No need for repeated HTTP requests = faster interaction.
- **Lower Overhead:** More efficient real-time data transfer.

---

## 🌟 Screenshots

| Create Room | Join Room | Chat Room |
|:-----------:|:---------:|:---------:|
| ![Create Room](![image](https://github.com/user-attachments/assets/c3c20011-2839-4c85-8e98-aeb0a77c857c)
) | ![Join Room](![image](https://github.com/user-attachments/assets/6304d637-34d8-4850-8715-8c96b7e25ebf)
) | ![Chat Room](![image](![image](https://github.com/user-attachments/assets/453cee27-30e1-45a6-a73b-41d2c8b41527)
) |

---

## 🤝 Contributing

Contributions are always welcome!

1. Fork the project.
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

---

## 📬 Support

- Feel free to [open an issue](https://github.com/HemanthBangera/Chat-room/issues) for bugs, questions, or feature requests.
- 📧 Email: **hemanthbangera843@gmail.com**

---

> Made with ❤️ using **React**, **Node.js**, and **Socket.IO**.

---
