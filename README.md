# Add an account – exception handling

Interactive prototype for the Figma page **Add bank accounts – exception handling** (Add an account – exception handling).

## Run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Prototype scenarios

Use the floating **Prototype scenarios** menu:

1. **Pass** – ownership verification succeeds; account shows Verified with a success toast
2. **Fuzzy match** – verification-method choice, then bank-statement or micro-deposit paths
3. **Fail** – ownership verification fails inside the modal, with correction/retry then a final outcome

Start on **Payment methods** with no modal open, then use **Add bank account**.
