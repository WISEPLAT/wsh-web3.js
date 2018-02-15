/**
 * This utility module helps to demonstrate following features
 * a. Signing a message by an Wiseplat user
 * b. Finding the account address using which the message was signed
 */
var Web3 = require('../index.js');
var wshURL = ""; 
var defaultAc = ""; 
var defaultAcPWD=""; 
var signatureContractCodeReadable="\n\tcontract SignatureVerifier {\n\t\tfunction verify( bytes32 hash, uint8 v, bytes32 r, bytes32 s) \n"+ 
    "\t\tconstant returns(address returnAddress) {\n \t\t\treturnAddress = ecrecover(hash, v, r, s);\n\t\t}\n\t}\n\n";

var sigContractInstance = null;
var sigContractAddress= ""; 
var sigContractInstance = null;
var strAbi='[{"constant":true,"inputs":[{"name":"hash","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"verify","outputs":[{"name":"returnAddress","type":"address"}],"payable":false,"type":"function"}]';
var signMessage=""; 

var wshWeb3 = null;

function setContractAddress(conAddress){
    sigContractAddress = conAddress;
}

function setAccount(act){
    defaultAc = act;
}

function setPassword(pwd){
    defaultAcPWD = pwd;
}

function setWiseplatURL(url){
    wshURL = url;
}

function setMessage(msg){
    signMessage = msg;
}

function initializeWiseplatConnection(){
   if(wshWeb3!=null && wshWeb3.isConnected()==true)  {
    return true;
  }
  
  wshWeb3 = new Web3(new Web3.providers.HttpProvider(wshURL));
  
  if(wshWeb3.isConnected()==true){
      if(defaultAc==''){
        defaultAc=wshWeb3.wsh.accounts[1];
      }
      return true;
  }

  return false;
}

function unlockAccount(acAddress){
  if(acAddress!=undefined && acAddress!=null){
    var state=wshWeb3.personal.unlockAccount(defaultAc, defaultAcPWD, 100);
    return state;
  }

  return false; 
}


function initializeContract(){
    initializeWiseplatConnection();
    if(wshWeb3.isConnected()==false){
        return;
    }  
    var abi = JSON.parse(strAbi);
    var contract = wshWeb3.wsh.contract(abi);

    sigContractInstance =  contract.at(sigContractAddress)  
}

function signMessage(message){

    initializeWiseplatConnection();
    if(wshWeb3.isConnected()==false){
        return false;
    }
    
    var state=unlockAccount(defaultAc);
    
    const msg = new Buffer(message);
    const sig = wshWeb3.wsh.sign(defaultAc, '0x' + msg.toString('hex'));

    return sig;
}

function verifySignedByAc(message, sig){
    initializeWiseplatConnection();

    if(wshWeb3.isConnected()==false){
        return false;
    }
    initializeContract();

    const res = splitSig(sig);

    // Unfortunately Gwsh client adds this line to the message as a prefix while signing
    // So while finding who signed it we need to prefix this part 
    const prefix = new Buffer("\x19Wiseplat Signed Message:\n");
    const msg = new Buffer(message);
    const prefixedMsg = wshWeb3.sha3(
    Buffer.concat([prefix, new Buffer(String(msg.length)), msg]).toString('utf8')
    );

    var strPrefixedMsg=prefixedMsg;

    var finalAddress=sigContractInstance.verify.call(strPrefixedMsg, res.v, res.r, '0x'+ res.s);

    return finalAddress;
}

function splitSig(sig) {
  return {
    v: wshWeb3.toDecimal('0x' + sig.slice(130, 132)),
    r: sig.slice(0, 66),
    s: sig.slice(66, 130)
  }

}

function sign(){
    var message = document.getElementById('txtMessage').value;
    var signMsg = signMessage(message);
    document.getElementById('dvSig').innerText = signMsg;
}

function verify(){
    var message = document.getElementById('txtMessage').value;
    var actAddr = verifySignedByAc(message, document.getElementById('dvSig').innerText);
    document.getElementById('dvSignedBy').innerText = actAddr;
}


function execute(){
    console.log("\n\n**********************************************************************");
    console.log("Steps to Run");
    console.log("**********************************************************************");
    console.log("1. Deploy the following conract in your wiseplat environment");
    console.log(signatureContractCodeReadable);
    console.log("2. Set the following parameters (i.e. at the end of the code)");
    console.log("\ta. Wiseplat URL");
    console.log("\tb. Wiseplat Account Address");
    console.log("\tc. Wiseplat Account Passphrase");
    console.log("\td. Signature Contract Address");
    console.log("\te. Message for signing");
    console.log("**********************************************************************");

    if(wshURL==''){
        console.log("Error: Wiseplat URL is not specified");
        return;
    }
    if(defaultAc==''){
        console.log("Error: Account Address is not specified");
        return;
    }
    if(defaultAcPWD==''){
        console.log("Error: Account password is not specified");
        return;
    }
    if(sigContractAddress==''){
        console.log("Error: Signature Contract Address is not specified");
        return;
    }
    if(signMessage==''){
        console.log("Error: Message for signing is not specified");
        return;
    }
    

    console.log("Following parameters applied");
    console.log("\ta. Wiseplat URL                  :",wshURL);
    console.log("\tb. Wiseplat Account Address      :",defaultAc);
    console.log("\tc. Wiseplat Account Passphrase   :",defaultAcPWD);
    console.log("\td. Signature Contract Address    :",sigContractAddress);
    console.log("\te. Message for signing           :",signMessage);

    console.log("**********************************************************************");
    console.log("Result");
    console.log("**********************************************************************");

    var sig=signMessage(signMessage);
    console.log("Signature");
    console.log(sig);

    var addr=verifySignedByAc(signMessage, sig);
    console.log("Signed By");
    console.log(addr);

    console.log("**********************************************************************");
    console.log("Exit");
    console.log("**********************************************************************");
}

// Please uncomment the below listed three lines of code and provide the required values

// Value 1- Please provide the wiseplat account address which you want to use to perform the operation
//setAccount('<Provide the account address>');

// Value 2- Please provide the password of the accound to be used 
//setPassword('<Provide teh password>');

// Value 3- Please update the address of the contract after deployment
// The contract code is made available at the top under signatureContractCodeReadable variable
// Please deploy teh contract and update the contract address here
//setContractAddress('<Provide the deployed contract address>');

// Value 4- If required please update with a different message
setWiseplatURL('http://localhost:8545');

// Value 5- If required please update with a Wiseplat URL
setMessage('This the test sign message');


execute();