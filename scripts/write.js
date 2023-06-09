const { ethers } = require('ethers');
const { linkupAddress, linkupABI } = require('./constants/Linkup');
const { userAddress, userABI } = require('./constants/User');
const { userContactAddress, userContactABI } = require('./constants/UserContact');
const { userLinkupAddress, userLinkupABI } = require('./constants/UserLinkup');

const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const signer = wallet.provider.getSigner(wallet.address);

const linkupContract = new ethers.Contract(linkupAddress, linkupABI, signer);
const linkupContractWithWallet = linkupContract.connect(wallet);

const userContract = new ethers.Contract(userAddress, userABI, signer);
const userContractWithWallet = userContract.connect(wallet);

const userContactContract = new ethers.Contract(userContactAddress, userContactABI, signer);
const userContactContractWithWallet = userContactContract.connect(wallet);

const userLinkupContract = new ethers.Contract(userLinkupAddress, userLinkupABI, signer);
const userLinkupContractWithWallet = userLinkupContract.connect(wallet);

const main = async () => {
	try {
		// const response = await userLinkupContractWithWallet.createLinkupPlusUserLinkup(
		// 	'Radioo',
		// 	'Listening Sess',
		// 	'Library',
		// 	'1686390600000',
		// 	'1686390600000',
		// 	0,
		// 	1
		// );
		// await response.wait(1);
		//
		// const response = await userLinkupContractWithWallet.createLinkupPlusUserLinkup(
		// 	'Dancee',
		// 	'Dancee Sess',
		// 	'Library',
		// 	'1686390600000',
		// 	'1686390600000',
		// 	0,
		// 	2
		// );
		// await response.wait(1);
		//
		// const response = await userLinkupContractWithWallet.createLinkupPlusUserLinkup(
		// 	'Partty',
		// 	'Parttyy Sess',
		// 	'Library',
		// 	'1686390600000',
		// 	'1686390600000',
		// 	3,
		// 	0
		// );
		// await response.wait(1);
		//
		// const response = await userContractWithWallet.create(
		// 	'Bobbiski',
		// 	['afrobeats'],
		// 	['stew', 'fish', 'chicken'],
		// 	['tennis', 'cricket']
		// );
		// await response.wait(1);
		//
		// const response = await userContractWithWallet.update(
		// 	1,
		// 	'Jalika',
		// 	['rap', 'drill'],
		// 	['jollof', 'jerk'],
		// 	['football', 'golf', 'tennis']
		// );
		// await response.wait(1);
		//
		// const response = await userContactContractWithWallet.destroy(0, 1);
		// await response.wait(1);
	} catch (error) {
		console.log(error);
	}

	// const all = await userContactContractWithWallet.getContacts(0);

	// const all = await userLinkupContractWithWallet.getUserLinkups(0);
	// const all = await userLinkupContractWithWallet.getLinkupUsers(0);

	const all = await userContactContractWithWallet.getContacts(0);
	// const all = await userContractWithWallet.getAll();

	console.log(all);
};

main();
