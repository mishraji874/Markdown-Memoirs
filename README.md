# Markdown Memoirs - A Personal Blog Website

Welcome to **Markdown Memoirs**, a personal blog platform built with Next.js, React, Tailwind CSS, and ShadCN UI components. This project allows for easy creation and display of blog posts written in Markdown.

## Features

-   **Homepage**: Displays a brief introduction, links to blogs and about pages, and a section for the latest articles.
-   **Markdown Rendering**: Blog posts are rendered from `.md` files located in `src/content/blogs/`.
    -   Supports frontmatter for metadata like title, date, excerpt, tags, author, and featured status.
    -   Syntax highlighting for code snippets using `rehype-highlight`.
-   **Blog Listing**: A dedicated `/blogs` page lists all available blog posts with clickable titles and excerpts.
-   **About Me Page**: A customizable page (`/about`) to share information about the author.
-   **Responsive Design**: Optimized for various screen sizes.
-   **Dark/Light Mode**: Theme toggling for user preference, managed by `next-themes`.
-   **SEO Friendly**: Dynamic page titles and metadata for better search engine visibility.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **UI Library**: [React](https://react.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Markdown Processing**: `gray-matter` (for frontmatter), `react-markdown`, `remark-gfm`, `rehype-highlight`.
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Linting & Formatting**: Pre-configured (though not explicitly detailed here, standard for Next.js projects).
-   **Deployment**: Ready for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting).

## Getting Started

### Prerequisites

-   Node.js (version 18.x or higher recommended)
-   npm or yarn

### Installation

1.  **Clone the repository (if applicable) or ensure you have the project files.**
   ```bash
   git clone https://www.github.com/Markdown-Memoirs.git
   ```

2.  **Navigate to the project directory:**
    ```bash
    cd Markdown-Memoirs
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

### Running the Development Server

To start the development server:

```bash
npm run dev
# or
# yarn dev
```

Open [http://localhost:9002](http://localhost:9002) (or the port specified in your `package.json`) in your browser to see the application.

### Building for Production

To build the application for production:

```bash
npm run build
# or
# yarn build
```

This will create an optimized build in the `.next` folder.

To run the production build locally:

```bash
npm run start
# or
# yarn start
```

## Project Structure

-   `src/app/`: Contains the core application routes and pages (App Router).
    -   `(page-groups)/page.tsx`: Main page components.
    -   `layout.tsx`: Root layout for the application.
    -   `globals.css`: Global styles and Tailwind CSS setup.
-   `src/components/`: Reusable React components.
    -   `ui/`: ShadCN UI components.
    -   `layout/`: Header, Footer components.
    -   `BlogCard.tsx`: Component for displaying blog post previews.
    -   `ThemeProvider.tsx` & `ThemeToggle.tsx`: For dark/light mode.
-   `src/content/blogs/`: Markdown files for blog posts.
-   `src/lib/`: Utility functions, including `blogs.ts` for reading and processing markdown files.
-   `public/`: Static assets (images, etc.).
-   `tailwind.config.ts`: Tailwind CSS configuration.
-   `next.config.ts`: Next.js configuration.

## Adding New Blog Posts

1.  Create a new `.md` file in the `src/content/blogs/` directory (e.g., `my-new-post.md`).
2.  Add frontmatter at the top of the file. Essential fields include:
    *   `title`: The title of your blog post.
    *   `date`: The publication date (e.g., "YYYY-MM-DD").
    *   `slug`: A unique slug for the URL (this will be derived from the filename if not specified, but explicitly setting it in frontmatter is good practice, though current `blogs.ts` uses filename).
    *   `excerpt`: A short summary of the post for listings.
    *   `author`: The author's name.
3.  Optional frontmatter fields:
    *   `tags`: An array of tags (e.g., `["React", "Next.js"]`).
    *   `featured`: Set to `true` to mark the post as featured (used on the homepage).
    *   `featuredImage`: URL to an image for the featured post card.

    Example frontmatter:
    ```markdown
    ---
    title: "My Awesome New Post"
    date: "2024-08-01"
    slug: "my-awesome-new-post"
    excerpt: "A brief look into something amazing."
    author: "Your Name"
    tags: ["Tech", "Innovation"]
    featured: false
    featuredImage: "https://placehold.co/600x400.png"
    ---

    Your markdown content starts here...
    ```
4.  Write your blog post content using Markdown. Code blocks will be syntax-highlighted.

## Customization

### Theming & Styling

-   **Colors**: Primary, accent, background, and other colors are defined as CSS HSL variables in `src/app/globals.css`. You can modify these to change the overall color scheme.
-   **Fonts**: Headline, body, and code fonts are configured in `tailwind.config.ts` and linked in `src/app/layout.tsx`.
-   **ShadCN UI**: Components can be customized further. Refer to the [ShadCN UI documentation](https://ui.shadcn.com/docs).
-   **Tailwind CSS**: Modify `tailwind.config.ts` to extend or change Tailwind's default utility classes.

### Content

-   **About Page**: Edit `src/app/about/page.tsx` to update your personal information.
-   **Header/Footer**: Modify components in `src/components/layout/`.

## Deployment

This project is pre-configured to be easily deployable with **Firebase App Hosting**. The `apphosting.yaml` file contains basic configuration.

Refer to the [Firebase App Hosting documentation](https://firebase.google.com/docs/app-hosting) for detailed deployment instructions.

## Contributing

Contributions are welcome! If you have suggestions or find bugs, please open an issue or submit a pull request.

## License

This project is likely under an MIT license or similar if it's a starter. You can add a `LICENSE` file if needed.
(Consider adding a LICENSE file, e.g., MIT License)
```

This README provides a good starting point for anyone looking to understand, use, or contribute to your Markdown Memoirs blog.
