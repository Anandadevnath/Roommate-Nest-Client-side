# RoommateFinder

RoommateFinder is a modern web application designed to help users find compatible roommates and manage roommate listings with ease. The platform provides a seamless experience for both those searching for roommates and those offering rooms, with features like secure messaging, verified profiles, and quick matching.

## Features

- **Browse Listings:** View available roommate listings with detailed information and filters.
- **Add Listings:** Authenticated users can create and manage their own roommate listings.
- **User Authentication:** Secure login and registration system.
- **Responsive Design:** Fully responsive UI for desktop and mobile devices.
- **Animated UI:** Smooth animations using [react-awesome-reveal](https://github.com/dennismorello/react-awesome-reveal) and [AOS](https://michalsnik.github.io/aos/).
- **Swiper Slider:** Featured events and highlights using Swiper.js.
- **Theme Toggle:** Switch between light and dark themes.
- **Verified Profiles:** All users are verified for a safe experience.
- **Secure Messaging:** Communicate privately with potential roommates.
- **24/7 Support:** Dedicated support section for user assistance.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Swiper.js, react-awesome-reveal, AOS
- **Backend:** Node.js, Express (API endpoint assumed)
- **Authentication:** Context API (with Firebase/Auth or custom backend)
- **Icons:** react-icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm

### Installation

1. **Clone the repository:**
    ```
    git clone https://github.com/yourusername/roommatefinder.git
    cd roommatefinder
    ```

2. **Install dependencies:**
    ```
    npm install
    ```

3. **Start the development server:**
    ```
    npm start
    ```

4. **Open in your browser:**
    ```
    http://localhost:3000
    ```

### Environment Variables

If authentication or backend API requires environment variables, create a `.env` file in the root directory and add your keys as needed.

## Project Structure

```
frontend/
  ├── src/
  │   ├── components/
  │   │   ├── Home/
  │   │   ├── NavBar/
  │   │   ├── Footer/
  │   │   └── ...
  │   ├── contexts/
  │   ├── App.js
  │   └── index.js
  └── public/
```

## Scripts

- `npm start` – Start the development server
- `npm run build` – Build for production
- `npm test` – Run tests

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

**RoommateFinder** – Find your perfect roommate, safely and easily!
