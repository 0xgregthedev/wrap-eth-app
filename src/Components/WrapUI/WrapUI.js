import WrapForm from './WrapForm';
import './WrapUI.css';
function WrapUI(props) {

    const transactionHandler = async (txData) => {
        props.onTransaction(txData);
    }
    return (
        <div className={'wrap-container wrap-container__' + props.theme}>
            <h1 className={'heading__' + props.theme}>Wrap</h1>
            <WrapForm accountData = {props.accountData} onTransaction = {transactionHandler} theme = {props.theme}></WrapForm>
        </div>
    );
  }
  
  export default WrapUI;
  