# Real Time Chat Application

![image](https://github.com/user-attachments/assets/16c47435-44e1-4cea-8379-3fc046a0007f)
![image](https://github.com/user-attachments/assets/18c56035-c415-487c-a3e0-3fdbb902b811)



## Overview

This is a real-time chat application built using WebSockets for full-duplex communication, offering a significant advantage over traditional HTTP-based communication. 
It allows users to create temporary chat rooms and communicate with others who join using the same unique room code. The room automatically expires once all users have left.

## Key Features

* **Real-time Communication:** Leverages WebSockets for instant, bidirectional communication between users.
* **Room-Based Chat:** Users can create and join chat rooms using a unique room code.
* **Temporary Rooms:** Chat rooms automatically expire and are destroyed when all users disconnect.
* **User Count:** Displays the current number of users present in the chat room.
* **Join/Leave Notifications:** Notifies users when someone joins or leaves the chat room.
* **Simple and Intuitive Interface:** Easy-to-use interface for seamless communication.

## How It Works

1.  A user can initiate a new chat session, which generates a unique **Room Code** (e.g., `ASD123`).
2.  The user can then share this **Room Code** with their friends or colleagues.
3.  Other users can join the same chat room by entering the provided **Room Code**.
4.  Once connected to the same room, all users can send and receive messages in real-time.
5.  The application displays the messages along with the username of the sender.
6.  Notifications are shown when a user joins or leaves the room.
7.  The chat room remains active as long as there is at least one user connected. Once all users disconnect, the room is automatically closed.

## Advantages of Using WebSockets

This application utilizes WebSockets, which provides several advantages over traditional HTTP communication for real-time applications:

* **Full-Duplex Communication:** Unlike HTTP, which follows a request-response model, WebSockets allow for bidirectional data flow between the client and the server over a single, long-lived connection. This enables instant message delivery without the overhead of constantly making new HTTP requests.
* **Reduced Latency:** The persistent connection minimizes latency, resulting in a smoother and more responsive chat experience.
* **Lower Overhead:** Once the WebSocket connection is established, the data transfer has lower overhead compared to repeated HTTP requests, making it more efficient for real-time data exchange.

## Installation

*(Provide specific installation instructions here based on your project's technology stack. For example:)*

1.  Clone the repository:
    ```bash
    git clone <your_repository_link>
    ```
2.  Navigate to the project directory:
    ```bash
    cd your_project_directory
    ```
3.  Install the necessary dependencies (e.g., using npm, pip, etc.):
    ```bash
    npm install  # or pip install -r requirements.txt
    ```
4.  Configure any environment variables (if required).
5.  Run the application:
    ```bash
    npm start  # or python manage.py runserver
    ```

## Usage

1.  Open the application in your web browser.
2.  You will be presented with an option to create a new room or join an existing one.
3.  **To create a new room:** Simply proceed, and the application will generate a unique **Room Code**. Share this code with others you want to chat with.
4.  **To join an existing room:** Enter the **Room Code** provided by the person who created the room and click "Join".
5.  Once in the room, you can type your messages in the input field and press "Send" or hit Enter to communicate with other users in the same room.
6.  The application will display new messages in real-time, along with join and leave notifications.

## Contributing

*(If you welcome contributions, explain how others can contribute to your project. For example:)*

If you'd like to contribute to this project, please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Push your changes to your fork.
5.  Submit a pull request with a clear description of your changes.

## License

*(Specify the license under which your project is distributed. For example:)*

This project is licensed under the [MIT License](link_to_your_license_file).

## Support

If you encounter any issues or have any questions, please feel free to [open an issue](link_to_your_issues_page) on GitHub or contact me directly at [your_email@example.com].

---

**Note:** Please replace the placeholder links (e.g., `link_to_your_screenshot_here.png`, `<your_repository_link>`, `link_to_your_license_file`, `link_to_your_issues_page`, `your_email@example.com`) with the actual links relevant to your project. Also, make sure to provide accurate installation and usage instructions based on your specific implementation.
