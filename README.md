# karavan-frontend
## Setup
### On Linux
```console
# Download and install fnm (Node.js version manager):
curl -o- https://fnm.vercel.app/install | bash

# Download and install Node.js:
fnm install 22

# Verify the Node.js version:
node -v

# Verify npm version:
npm -v
```

### On Windows
Download the latest version of the Windows installer (.msi) from [Node.js official website](https://nodejs.org/en/download) or use the following command lines :
```console
# Download and install fnm (Node.js version manager):
winget install Schniz.fnm

# Download and install Node.js:
fnm install 22

# Verify the Node.js version:
node -v

# Verify npm version:
npm -v
```

## Installation
```console
git clone <URL>
cd karavan-frontend

npm install # install dependencies
```

## Run the app
### Dev
```console
npm run dev # Then go to http://localhost:5173
```

### To preview production
```console
npm run build
npm run preview # Should not be used for real production
```

## Backend
See [karavan-backend](https://github.com/Azorlebleu/karavan-backend)