const { ethers, run, network } = require('hardhat');
const { linkupAddress } = require('./constants/Linkup');
const { userAddress } = require('./constants/User');

/*
 * SimpleStorage
 */
async function SimpleStorage() {
	const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');

	// Deployment
	console.log('Deploying contract..');

	const simpleStorage = await SimpleStorageFactory.deploy();
	await simpleStorage.deployed();

	console.log(`Deployed contract to: ${simpleStorage.address}`);

	// Verification
	const notHardHat = network.config.chainId !== 31337;
	if (notHardHat && process.env.ETHERSCAN_API_KEY) {
		console.log('Waiting for block confirmations..');
		await simpleStorage.deployTransaction.wait(6);
		await verify(simpleStorage.address, []);
	}

	// Action
	const currentValue = await simpleStorage.retrieve();
	console.log(`Current Value is: ${currentValue}`);

	const tranactionResponse = await simpleStorage.store(7);
	await tranactionResponse.wait(1);

	const updateValue = await simpleStorage.retrieve();
	console.log(`Update Value is: ${updateValue}`);
}

/*
 * Main
 */
async function main() {
	const contractFactory = await ethers.getContractFactory('UserLinkup');

	// Deployment
	console.log('Deploying contract..');

	// const contract = await contractFactory.deploy();
	const contract = await contractFactory.deploy([linkupAddress, userAddress]);
	// const contract = await contractFactory.deploy([userAddress]);

	await contract.deployed();

	console.log(`Deployed contract to: ${contract.address}`);

	// Verification
	const notHardHat = network.config.chainId !== 31337;
	if (notHardHat && process.env.ETHERSCAN_API_KEY) {
		console.log('Waiting for block confirmations..');
		await contract.deployTransaction.wait(6);

		// await verify(contract.address, []);
		await verify(contract.address, [[linkupAddress, userAddress]]);
		// await verify(contract.address, [[userAddress]]);
	}
}

/*
 * Verification
 */
async function verify(contractAddress, args) {
	console.log('Verifying contract..');

	try {
		await run('verify:verify', {
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (e) {
		if (e.message.toLowerCase().includes('already verified')) {
			console.log('Already verified');
		} else {
			console.log(e);
		}
	}
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});
