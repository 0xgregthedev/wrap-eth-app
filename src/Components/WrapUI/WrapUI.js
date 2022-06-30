import WrapForm from './WrapForm';
import './WrapUI.css';
function WrapUI(props) {

    const transactionHandler = async (txData) => {
        props.onTransaction(txData);
    }


    return (
        <div className='wrap-container'>
            <h1>Wrap</h1>
            <WrapForm accountData = {props.accountData} onTransaction = {transactionHandler}></WrapForm>
        </div>
    );
  }
  
  export default WrapUI;
  