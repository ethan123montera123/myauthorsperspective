# My Author's Perspective Client

## Setup

```bash
npm install # install the necessary packages
npm run dev # run the local development enviroment
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## File Structure

```
client/
├── components/
│   └── ui/
├── helpers/
│   ├── currency.helper.js
│   └── services.helper.js
├── pages/
│   ├── _app.js
│   ├── _document.js
│   └── index.js
├── public/
│   └── images/
├── services/
│   ├── api/
│   ├── firebase/
│   └── utils/
├── styles/
│   └── globals.css
├── .env.example
├── .prettierrc
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

- all the configuration files are found in the `client` root `.` directory.
- all assets found in the `./public/` directory are served from `/` when using
  `href` or `src` HTML attributes.
- to edit the different pages, check the `./pages/<PAGE_NAME>/` directories for
  the `index.js` file.
- `./components/` contains the React components used in the different
  `./pages/<PAGE_NAME>/index.js` files.
- `./helpers/` contains the model for the services domain information and also
  small helper functions in determining what to render in the application.

## Deploy on Vercel

We will use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
to deploy the application after linking the GitHub repository inside Vercel.

