<div align="center"><strong>Linus Analytics Bike Store</strong></div>
<div align="center">Built with the Next.js App Router</div>
<br />
<div align="center">
<a href="https://bikestore-assessment.vercel.app/">Demo</a>
<span> · </span>
<a href="https://github.com/wesleywang4766/bikestore-assessment/tree/main">Source</a>
<span>
</div>

## Overview

This is a web application for a fictional bike store, built using the following technology stack:

- Framework - [Next.js (App Router)](https://nextjs.org)
- Language - [TypeScript](https://www.typescriptlang.org)
- Database - [Postgres](https://vercel.com/postgres)
- Storage - [Blob](https://vercel.com/storage/blob)
- Deployment - [Vercel](https://vercel.com/docs/concepts/next.js/overview)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn UI](https://ui.shadcn.com/)

This web application uses the new Next.js App Router. Including functionality to **Create**, **Read**, **Update**, and **Delete** bikes from the inventory as if you were the shop owner.

## Getting Started

Follow these steps to set up this project on your own GitHub repository and deploy it on your own Vercel account.

## Prerequisites

- Git installed on your local machine
- A GitHub account
- A Vercel account

## Setup Instructions

### 1. Setup project on your own GitHub repository

#### 1.1. Clone the Project

Start by cloning this project to your local machine:

```bash
git clone <repository-url>
cd <project-directory>
```

Replace `<repository-url>` with the URL of this repository and `<project-directory>` with the folder where you’d like to save the project files.

#### 1.2. Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and log in.
2. Create a new, blank repository on your account. **Do not** initialize it with a README or `.gitignore` file.

#### 1.3. Update the Remote Repository URL

Now, link your local project to your new GitHub repository by updating the remote URL.

```bash
git remote set-url origin https://github.com/your-username/your-new-repository.git
```

Replace `your-username` and `your-new-repository` with your actual GitHub username and the name of the new repository.

#### 1.4. Push the Code to Your New Repository

Push the project files to your new GitHub repository:

```bash
git push -u origin main
```

This command sets `main` as the default branch and uploads all files to your new repository.

### 2. Deploy project on your own Vercel account

#### 2.1. Import your git repository to your vercel account

1. Go to the Vercel Dashboard and click **Add New…** > **Project**.
2. Import your GitHub repository into Vercel.
3. During the setup, ensure that you link the repository to the correct project on Vercel.

#### 2.2. Setup storage and connect it to your vercel project

1. **Create a Postgres Database:**
  - Go to the Vercel Dashboard and navigate to the **Storage** section.
  - Click **Create Database** and choose **Postgres**.
  - Connect this database to your vercel project.
  - Click **Show secret** in the Vercel Postgres Database Dashboard and find `POSTGRES_URL` environment variable in .env.local and copy it to your project.

2. **Create Database Table**:
  - In the Vercel Postgres database dashboard, create the `products` table and `status` type using the following SQL commands:

    ```sql
    CREATE TYPE status AS ENUM ('active', 'draft', 'archived');
    CREATE TYPE type AS ENUM ('road bike', 'mountain bike', 'racing bike');

    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      rating NUMERIC(10, 2) NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      quantity INTEGER NOT NULL,
      type type NOT NULL,
      status status NOT NULL,
      image_url TEXT NOT NULL,
      available_at TIMESTAMP NOT NULL
    );
    ```

3. **Set Up Blob Storage**:
  - In the same **Storage** section, click **Create Storage** and select **Blob Storage**.
  - Connect this storage to your vercel project.
  - Click **Show secret** in the Vercel Blob Store Dashboard and find `BLOB_READ_WRITE_TOKEN` environment variable in .env.local and copy it to your project, enabling read/write access to the storage bucket.

#### 2.3. Install Dependencies and Start the Development Server

To run the project locally, install dependencies and start the server:

```bash
pnpm install
pnpm dev
```

You should now be able to access the application at [http://localhost:3000](http://localhost:3000).

#### 2.4. Seed the Database:
Uncomment `app/api/seed.ts` in the project code, then navigate to `http://localhost:3000/api/seed` to seed your database with initial product data.

#### 2.5. Deploying the Project on Vercel

Once your repository and storage setup are complete, deploy the project on Vercel:

1. Go to your project in the Vercel Dashboard.
2. Click on the Deploy button if the project has not been deployed automatically.
3. Vercel will use the environment variables and configurations to deploy your project.

Once deployed, you will see a live URL for your web application. Any subsequent changes pushed to the main branch will automatically redeploy the project.

## Usage

After setting up the repository and deploying on Vercel, you can continue developing and pushing changes to GitHub. To update the project on GitHub, use:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements!