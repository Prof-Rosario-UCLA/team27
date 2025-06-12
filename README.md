# Team 27 - Jarvis

# Deployment instructions

## Local deployment
To deploy the application locally, you will need to set values for the following environment variables:

```text
MONGO_URI="" 

AUTH_SECRET=""
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""

TAVILY_API_KEY=""
OPENAI_API_KEY=""
```

Once the environment variables are set, run `npm run dev`. The application will run on `http://localhost:3000`.

## Google App Engine deployment
To deploy the application to Google App Engine (GAE), you will need to modify the `app.yaml` file and replace the placeholder environment variables with the correct values:

```yaml
build_env_variables:
  NEXT_TELEMETRY_DISABLED: "1"
  NEXTAUTH_URL: "https://cs144-25s-tzantchev.uw.r.appspot.com"
  MONGO_URI: "${MONGO_URI}" # Replace
  AUTH_SECRET: "${AUTH_SECRET}" # Replace
  AUTH_GOOGLE_ID: "${AUTH_GOOGLE_ID}" # Replace
  AUTH_GOOGLE_SECRET: "${AUTH_GOOGLE_SECRET}" # Replace
  TAVILY_API_KEY: "${TAVILY_API_KEY}" # Replace
  OPENAI_API_KEY: "${OPENAI_API_KEY}" # Replace

env_variables:
  NODE_ENV: production
  NEXT_TELEMETRY_DISABLED: "1"
  NEXTAUTH_URL: "https://cs144-25s-tzantchev.uw.r.appspot.com"
  MONGO_URI: "${MONGO_URI}" # Replace
  AUTH_SECRET: "${AUTH_SECRET}" # Replace
  AUTH_GOOGLE_ID: "${AUTH_GOOGLE_ID}" # Replace
  AUTH_GOOGLE_SECRET: "${AUTH_GOOGLE_SECRET}" # Replace
  TAVILY_API_KEY: "${TAVILY_API_KEY}" # Replace
  OPENAI_API_KEY: "${OPENAI_API_KEY}" # Replace
```

Once you set the environment variables in the `app.yaml` file, run `gcloud app deploy --project cs144-25s-tzantchev --promote`. This will trigger the Google Cloud Build of the project. Once the build completes successfully, you will be able to visit the deployed URL by running `gcloud app browse`.