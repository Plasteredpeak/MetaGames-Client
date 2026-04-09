# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Guest Demo Mode (No Backend)

This project supports a guest mode intended for Vercel demos.

1. Add this env var in Vercel project settings:
	- `VITE_GUEST_MODE=true`
2. Redeploy.
3. Login using:
	- email: `guest`
	- password: `guest`

In guest mode:

- Login and logout are simulated with a local guest session.
- Guest starts with demo GT tokens and can top up tokens locally for demos.
- RAWG game fetching and blockchain/token flows remain unchanged.
