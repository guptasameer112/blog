
## Getting Started

First, add your Sanity project ID and dataset name to the `.env.local` file:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset_name
```

If you want to have comments system, you need to add your Sanity API token to the `.env.local` file:

```bash
NEXT_PUBLIC_SANITY_TOKEN=your_api_token
```

Then, install the dependencies:
  
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
Open [http://localhost:3000/studio](http://localhost:3000/studio) for sanity studio.

## credits - stefandjikic
