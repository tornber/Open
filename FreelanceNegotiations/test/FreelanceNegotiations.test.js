const Employer = artifacts.require('Employer')
const Storage = artifacts.require('Storage')

contract('Employer',async (accounts) => {
    
    let employerDeployer
    let storageDeployer
    let workerAddress
    let otherAddress
    let employer
    let storage
    let employerAddress
    let storageAddress

    before(async () => {
        employerDeployer = accounts[0]
        storageDeployer = accounts[1]
        workerAddress = accounts[2]
        otherAddress = accounts[3]
        employer = await Employer.deployed({from: employerDeployer})
        storage = await Storage.deployed({from: storageDeployer})
        employerAddress = await employer.address
        storageAddress = await storage.address
    })

    it('deployes successfully',async() => {
        assert.notEqual(employerAddress,'')
        assert.notEqual(storageAddress,'')
    })

    it('funds transfer with not owner address',async() => {
        await employer.fundsTransfer(storageAddress,workerAddress,{from: otherAddress,value: web3.utils.toWei('1',"ether"),gas: 40000})
    })

    it('funds transfer with thero value',async() => {
        await employer.fundsTransfer(storageAddress,workerAddress,{from: employerDeployer,value: web3.utils.toWei('0',"ether"),gas: 40000})
    })

    it('funds transfer runs out of gas',async() => {
        await employer.fundsTransfer(storageAddress,workerAddress,{from: employerDeployer,value: web3.utils.toWei('1',"ether"),gas: 40000})
    })
    it('funds transfer runs out of gas revert Failure, funds not sent ',async() => {
        await employer.fundsTransfer(storageAddress,workerAddress,{from: employerDeployer,value: web3.utils.toWei('1',"ether"),gas: 70000})
    })

    it('not a worker try withdraw money',async() => {
        let result
        
        result = await employer.fundsTransfer(storageAddress,workerAddress,{from: employerDeployer,value: web3.utils.toWei('1',"ether"),gas: 100000})
        assert.equal(result.logs[0].event.toString(),'FundsRecieved')
        
        workerRevenueStruct = await storage.storageDeposits(employerAddress,{gas: 0});
        assert.equal(workerRevenueStruct.employerConfirm,false)
        assert.equal(workerRevenueStruct.revenue,web3.utils.toWei('1','ether'))
        assert.equal(workerRevenueStruct.workerAddress,workerAddress)

        await storage.withDraw(employerAddress,{from: otherAddress})

    })

    it('worker try to withdraw without employer confirmation',async() => {
        let result
        
        result = await employer.fundsTransfer(storageAddress,workerAddress,{from: employerDeployer,value: web3.utils.toWei('1',"ether"),gas: 100000})
        assert.equal(result.logs[0].event.toString(),'FundsRecieved')
        
        workerRevenueStruct = await storage.storageDeposits(employerAddress,{gas: 0});
        assert.equal(workerRevenueStruct.employerConfirm,false)
        assert.equal(workerRevenueStruct.revenue,web3.utils.toWei('2','ether'))
        assert.equal(workerRevenueStruct.workerAddress,workerAddress)

        await storage.withDraw(employerAddress,{from: workerAddress})

    })

    it('not employer contract owner try to confirm revenue to worker',async() => {
        let result
        
        result = await employer.fundsTransfer(storageAddress,workerAddress,{from: employerDeployer,value: web3.utils.toWei('1',"ether"),gas: 100000})
        assert.equal(result.logs[0].event.toString(),'FundsRecieved')
        
        workerRevenueStruct = await storage.storageDeposits(employerAddress,{gas: 0});
        assert.equal(workerRevenueStruct.employerConfirm,false)
        assert.equal(workerRevenueStruct.revenue,web3.utils.toWei('3','ether'))
        assert.equal(workerRevenueStruct.workerAddress,workerAddress)

        await employer.confirmRevenue(storageAddress,true,{from:workerAddress})

    })

    it('worker try to withdraw second time',async() => {
        let result
        
        result = await employer.fundsTransfer(storageAddress,workerAddress,{from: employerDeployer,value: web3.utils.toWei('1',"ether"),gas: 100000})
        assert.equal(result.logs[0].event.toString(),'FundsRecieved')
        
        workerRevenueStruct = await storage.storageDeposits(employerAddress,{gas: 0});
        assert.equal(workerRevenueStruct.employerConfirm,false)
        assert.equal(workerRevenueStruct.revenue,web3.utils.toWei('4','ether'))
        assert.equal(workerRevenueStruct.workerAddress,workerAddress)

        await employer.confirmRevenue(storageAddress,true,{from:employerDeployer})
        workerRevenueStruct = await storage.storageDeposits(employerAddress,{gas: 0});
        assert.equal(workerRevenueStruct.employerConfirm,true)

        await storage.withDraw(employerAddress,{from: workerAddress})
        workerRevenueStruct = await storage.storageDeposits(employerAddress,{gas: 0});
        assert.equal(workerRevenueStruct.employerConfirm,false)
        assert.equal(workerRevenueStruct.revenue,0)
        assert.equal(workerRevenueStruct.workerAddress,workerAddress)

        await employer.confirmRevenue(storageAddress,true,{from:employerDeployer})
        workerRevenueStruct = await storage.storageDeposits(employerAddress,{gas: 0});
        assert.equal(workerRevenueStruct.employerConfirm,true)

        await storage.withDraw(employerAddress,{from: workerAddress})
    })

    it('makes successfull negotiation',async() => {
        let result
        
        result = await employer.fundsTransfer(storageAddress,workerAddress,{from: employerDeployer,value: web3.utils.toWei('1',"ether"),gas: 100000})
        assert.equal(result.logs[0].event.toString(),'FundsRecieved')
        
        workerRevenueStruct = await storage.storageDeposits(employerAddress,{gas: 0});
        assert.equal(workerRevenueStruct.employerConfirm,false)
        assert.equal(workerRevenueStruct.revenue,web3.utils.toWei('1','ether'))
        assert.equal(workerRevenueStruct.workerAddress,workerAddress)

        await employer.confirmRevenue(storageAddress,true,{from:employerDeployer})
        workerRevenueStruct = await storage.storageDeposits(employerAddress,{gas: 0});
        assert.equal(workerRevenueStruct.employerConfirm,true)

        await storage.withDraw(employerAddress,{from: workerAddress})
        workerRevenueStruct = await storage.storageDeposits(employerAddress,{gas: 0});
        assert.equal(workerRevenueStruct.employerConfirm,false)
        assert.equal(workerRevenueStruct.revenue,0)
        assert.equal(workerRevenueStruct.workerAddress,workerAddress)
        
    })

    // 2 test should pass 8 should faill
})