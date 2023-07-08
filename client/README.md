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
│   ├── cart.helper.js
│   ├── currency.helper.js
│   ├── errors.helper.js
│   ├── notification.helper.js
│   ├── services.helper.js
│   └── validation.helper.js
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

## Production Environment Variables

In production, these environment variables are crucial for the operations of the
application.

```bash
# for front end functionalities
NEXT_PUBLIC_NODE_ENV=production
NEXT_PUBLIC_STRIPE_API_KEY
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGE_SENDING_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_RECAPTCHA_SITE_KEY

# for back end functionalities
BACKEND_ENV=production
FRONTEND_DEPLOYMENT_URL=domain.provider
STRIPE_API_KEY
STRIPE_WEBHOOK_SECRET
RECAPTCHA_SITE_KEY
MAILER_COMPANY_EMAIL
MAILER_API_KEY
```

## Development Environment Variables

These include everything above and some extras listed below:

```bash
NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG_TOKEN
MAILER_EMAIL=development.email.target@mail.com
```

## Production Notes

In the `/helpers/services.helper.js` file, the `firebaseData` variable needs to
be synchronized with the Firebase Firestore data manually, otherwise the Cart &
checkout will not work.

To debug this, check the cart and see if the total price is properly calculated,
otherwise it should be `NaN` if not configured properly.

The `pages/services/*` pages are manually encoded so changes need to be
redeployed.

## Deploy on Vercel

We will use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
to deploy the application after linking the GitHub repository inside Vercel.

