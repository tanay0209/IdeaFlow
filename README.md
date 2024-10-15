# IdeaFlow

**IdeaFlow** is a collaborative tool for idea generation and brainstorming. With real-time updates and collaboration features, users may set up organizations, collaborate on a shared canvas board, and develop ideas intuitively. Ideal for groups wishing to foster invention and creativity among themselves.

**Tech Stack**:  
- **Frontend**: Nextjs, TypeScript, Tailwind CSS, Shadcn, Liveblocks
- **Backend**: Node.js, TypeScript, Clerk, Convex 

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tanay0209/IdeaFlow.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd IdeaFlow
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Setup convex:**
   execute in root directory and follow the instructions or refer the documentation
   ```bash
   npx convex dev 
   ```
   > *(Or use `yarn install` if you prefer Yarn)*

---

## Environment Variables

In the `root` directory, create a `.env` file with the following variables, some are auto generated when setting up convex and clerk:

```plaintext
CONVEX_DEPLOYMENT=

NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
LIVEBLOCK_SECRET_KEY=
```

Replace placeholders with your actual configuration.

---

## API Routes

Available API endpoints:

**Board & Boards Routes:**
- `GET api.boards.get` - Get all boards of the user
- `GET api.board.get` - Get a specific board
- `DELETE api.board.remove` - Remove a board
- `PATCH api.board.update` - Update a board
- `POST api.board.favorite` - Favorite a board
- `POST api.board.unfavorite` - Unfavorite a board
- `POST api.board.create` - Create a board

**Liveblocks Routes:**
- `POST /api/liveblocks-auth` - Creation and authorization of users for a room.
---

## Usage

### Starting the Server and Client

1. **Start the Convex server:**
   - Open a terminal in the `root` directory:
     ```bash
     npm convex dev
     ```

2. **Start the Client:**
   - Open a separate terminal in the `root` directory:
     ```bash
     npm run dev
     ```
   - Access the client at `http://localhost:3000`.

3. **Interacting with API Endpoints:**
   - Use tools like Postman or `curl` for API testing.

---
