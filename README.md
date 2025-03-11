# FlexyDev - Next.js Portfolio Template

![Next.js Portfolio Template](https://ik.imagekit.io/cpnw7c0xpe/Tailwind%20Components/nextjs-dev-portfolio-template.png?updatedAt=1731588307541)

## Folder Structure Overview

- **content:** Contains data for projects. Add any additional section data here.
- **Components:** All the UI components of app e.g. navbar, hero, projects, footer etc
- **src/services:** Retrieves data (e.g., projects) using the fs module. Update this file if you change or modify the data source.
- **src/assets:** Stores all assets, including images and icons, additionally you can add audio, video, and local fonts here.
- **src/hooks:** Holds custom hooks.
- **src/lib/types.d.ts:** Contains TypeScript types.
- **util/icons:** Centralizes icons and images for easy updates.
- **appData:** Includes app data, such as services and skills (including icons).
- **app/page.tsx:** Root file of the app.
- **app/layout.tsx:** Manages global and SEO configurations (e.g., fonts, head tags, analytics).

## How to run a project?

- After downloading the project, run npm install (or npm i) in the project directory to install dependencies.
- Once dependencies are installed, start the server by running npm run dev.

### Remember (Add .env file)

Add this line in .env.local file
`NEXT_PUBLIC_SITE_URL=http://localhost:3000`

## Customizing the Template

1. Navbar
   - File: navbar.tsx
     - Update the navbar name from john_doe to your name.
2. Hero Section
   - File: hero.tsx
     - Edit the title, description, and optionally, replace the SVG with your image.
3. Projects Section
   - File: content/projects
     - Replace the dummy projects with your own.
     - If you are modifying the properties or going to add new ones, then update types in types.d.ts.
4. Services Section
   - File: appData
     - Add your services with relevant icons. If icons are missing, contact me on LinkedIn or via email.
5. Skills Section
   - File: appData
     - Add your skills with relevant icons. Contact if you can’t find specific icons online.
6. Footer
   - Location: Visit [Flexy UI](http://flexyui.com/)
     - You can replace the default footer or choose from additional variants [from Flexy UI](http://flexyui.com/) (simple or column footer).

## Configuring Online Images

To display online images (e.g., from a CDN) in your deployed project, configure allowed image hostnames in next.config.js.

For demo purposes, we’re using Unsplash images. You can use any image host, but be sure to add the hostname in your configuration.

Replace 'unsplash' with your own image `hostnames` if using a different service.

## Theming and Styling

We use Tailwind CSS for styling. In tailwind.config.ts, you can customize theme settings such as fonts, colors, and animations.

## SEO & Branding

1. Favicon: Replace the default favicon with your own.
2. Metadata: Update meta title and description in layout.tsx.
3. SEO Files: robots.ts and sitemap.ts are included for search engines.
4. Open Graph Images:
   - Replace `opengraph-image.png` and `twitter-image.png `with custom images.
   - Alternatively, edit `opengraph-image.tsx` to generate images dynamically.

## Premium Portfolio Template

The premium version of FlexyDev includes a Blog feature. You can write blogs in Markdown (.MDX) format, which also supports code snippets. You can find [more details here](https://basit313.gumroad.com/l/nextjs-developer-portfolio-template).

## Analytics

You can integrate analytics easily:

1. Simple Analytics or Vercel Analytics: Quick and easy to set up.
2. Google Analytics 4: Also straightforward.

## Deployment Notes

Before deploying, add environment variables from .env.local wherever you are deploying:

1. NEXT_PUBLIC_SITE \_URL: Set to your actual site URL (e.g., https://johndoe.com).
2. For local development, use the localhost URL.

For any query or suggestion, I am available on [LinkedIn](https://www.linkedin.com/in/abdulbasitprofile/) or email me at basit@codevertiser.com
