###  Tasks

---

1. On the two file upload simulation buttons that appear on `/dashboard`:
    1. Add a spinner that appears for three seconds before displaying the success message
    2. Add a green tick alongside the success message
2. Only display the Continue button on the `/dashboard` screen once a (simulated) medical record and guidelines doc have been uploaded
3. Do not allow the User to upload a Guidelines file until a Medical Record has been uploaded. You can use the `react-toast` library to show the user a prompt.

### Installation

---
All commands listed below should be executed from the `frontend` directory.

Requirements are listed in the package.json file. To install the dependencies, execute the following command:

```bash
npm install
```

To add a new dependency, execute the following command:

```bash
npm install <dependency>
```

### Building and Running the Frontend Service

---

To build the frontend service, execute the following command:

```bash
npm run build
```

To run the frontend service, execute the following command:

```bash
npm start
```

To access the frontend service, open a web browser and navigate to the following URL:

```
http://localhost:3000
```

### Linting

---

To lint the code, execute the following command:

```bash
npm run lint
```

You can also fix linting issues by executing the following command:

```bash
npm run lint:fix
```

Additionally `prettier` is installed for code formatting if you would like to use that to format any typscript code.
```commandline
npx prettier --write components/*
npx prettier --write app/*
npx prettier --write context/*
```