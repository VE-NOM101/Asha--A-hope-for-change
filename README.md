# 🌱 Asha - A Hope for Change

**Asha** is a decentralized crowdfunding platform built on the Ethereum blockchain. It empowers users to launch and support campaigns focused on meaningful causes like education, health, and animal welfare. With secure blockchain integration, decentralized IPFS storage, and a modern Vue.js-based UI, Asha is a dApp that fosters transparency and trust in fundraising.

---

## 🚀 Features

### 🖥️ Frontend
- Developed with **Vue.js** (Vite)
- **Dark/Light Mode** toggle with state persistence using **Pinia** and `localStorage`
- Responsive and dynamic **navbar**
- Campaign display using a **card-based layout** on Home View
- Real-time **toast notifications** and **spinners** for UI interaction

### 🔗 Web3 & Blockchain
- **Solidity** smart contracts deployed via **Remix IDE** and **Hardhat**
- Interacts with the Ethereum chain via **Ethers.js**
- **Alchemy** used as the blockchain RPC provider
- **MetaMask** wallet integration
- Campaign images are stored on **IPFS** using **Pinata**

### 🖥️ Backend
- Built using **Node.js** and **Express.js**
- Handles requests between the frontend and blockchain

---

## 🧩 Core Functionality

- 🔐 **Connect Wallet** (MetaMask)
- 📝 **Create Campaign**: 
  - Add a title, description, category (education, animal, health, etc.), goal amount
  - Upload campaign image to IPFS
- 🏠 **Home View**:
  - Browse all campaigns via interactive cards
  - Click a card to view full campaign details
- 📄 **Campaign Detail View**:
  - Displays detailed information
  - **Donate Now** functionality
  - Displays **recent donations** and **your donations**
- 📋 **Dashboard View**:
  - View and manage campaigns you've created

---

## 🛠 Tech Stack

| Layer        | Technologies                                      |
|--------------|---------------------------------------------------|
| Blockchain   | Solidity, Hardhat, Remix, Ethereum, Alchemy       |
| Web3         | Ethers.js, MetaMask                               |
| Storage      | Pinata IPFS                                       |
| Frontend     | Vue.js, Vite, TailwindCSS, Pinia, localStorage    |
| Backend      | Node.js, Express.js                               |
| Deployment   | Vercel (Frontend), Render (Backend)               |

---

## 🔧 Setup Instructions

### Prerequisites
- Node.js and npm
- MetaMask browser extension
- Alchemy, Pinata accounts
- Vercel & Render accounts (for deployment)

### 1. Clone the Repository
```bash
git clone https://github.com/VE-NOM101/Asha--A-hope-for-change.git

```

### 2. Install Dependencies
#### Frontend
```bash
npm install
```

#### Backend
```bash
cd server
npm install
```

### 3. Smart Contracts
- Write and compile contracts in **Remix** or **Hardhat**
- Deploy them to the Ethereum testnet (e.g., Sepolia)
- Update contract address and ABI in the frontend

### 4. Environment Variables

Create `.env` files in both `/` and `server/` directories.

#### Frontend (`frontend/.env`)
```
VITE_CONTRACT_ADDRESS=your_contract_address
VITE_ALCHEMY_API_KEY=your_alchemy_key
VITE_PINATA_API_KEY=your_pinata_key
VITE_PINATA_SECRET=your_pinata_secret
```

#### Backend (`server/.env`)
```
PORT=5000
PINATA_API_KEY=your_pinata_key
PINATA_SECRET=your_pinata_secret
```

### 5. Run Locally

#### Backend
```bash
cd server
npm run dev
```

#### Frontend
```bash
npm run dev
```

---

## 📦 Deployment

- **Frontend**: Hosted on [Vercel](https://vercel.com/)
- **Backend**: Hosted on [Render](https://render.com/)

Make sure environment variables are set correctly on both platforms.

---

## 📸 Screenshots

> Add screenshots or demo GIFs here for better understanding.

---

## 🙌 Contribution

Pull requests and feedback are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📜 License

This project is licensed under the MIT License.

---
