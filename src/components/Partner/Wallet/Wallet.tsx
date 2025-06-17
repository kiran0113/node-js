
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { CurrenciesService } from "../../../services/Partner/Currencies/Currencies";
import { WalletService } from "../../../services/Partner/Wallet/WalletService";
import USDlogo from "../../../assets/images/USDImg.svg";
import BRLimg from "../../../assets/images/BRLimg.svg";
import INDimg from "../../../assets/images/india.svg";
import CANADAimg from "../../../assets/images/canada-flag.svg";
import sessionStorageContext from "../../context/LocalStorageContext";
import Scrollbars from "react-custom-scrollbars-2";

const Wallet: React.FC<any> = ({ onSaveAndContinueClick, onNextClick, setButtonLoadingSkip, buttonLoadingSkip }) => {

  const { partnerid, type } = useParams();

  const toast = useRef<Toast>(null);

  const navigate = useNavigate();

  const [walletList, setWalletList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [backButtonLoading , setBackButtonLoading]= useState(false)


  const [status, setstatus] = useState(sessionStorage.getItem("OnboardingStatus"));


  const [buttonLoading, setButtonLoading] = useState(false);


  const getCurrenciesByPartnerId = (partnerid: any) => {
    setLoading(true);


    let getdatafor = 'wallets'
    CurrenciesService.getCurrenciesByPartnerId(partnerid,getdatafor)
      .then((data: any) => {

        const responsedata = data.data;
        setWalletList(responsedata);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {

    getCurrenciesByPartnerId(Number(partnerid));
  }, []);

  const onBackClick = () => {
    setBackButtonLoading(true)
    setTimeout(() => {
      onSaveAndContinueClick("B");
    },1000)
 
  };

  
  const onAddClick = () => {

    setButtonLoading(true);
    WalletService.addWallet()
      .then((response: any) => {
        setButtonLoading(false);

        sessionStorage.setItem("StepFlag", "8");
        onSaveAndContinueClick("N");


      })
      .catch((error) => {
        setButtonLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <div className="spinner-class">
          <ProgressSpinner />
        </div>
      ) : (
        <div className="container-fluid acc-screen currency-screen">
           <Scrollbars
            className="contain-scroll"
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHeight
            autoHeightMin={100}
            autoHeightMax={100}
            thumbMinSize={30}
            universal={true}
          >
          <Toast ref={toast}></Toast>
          <div className="edit-content"></div>
          <div className="recevie-currency">
            <h3>We have created the following sub-account for you:</h3>
            <div className="currency-details">
              {walletList.length === 0 ? (
                <p className="wallet-empty-message">
                  You must first create a wallet.
                </p>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Currency</th>
                      <th>Sub-account ID</th>
                      <th>Wallet ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    { walletList
                     
                      .sort((a, b) => a.currency.localeCompare(b.currency))

                      .map((currency: any, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td className="border-right country-flag">
                            {currency.currency}
                          </td>
                          <td>{currency.code}</td>
                          <td>{currency.walletId}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
              <div className="button-section">
                <div className="bottom-btns">
                  <Button
                    type="button"
                    label="Back"
                    loading={backButtonLoading}
                    className="btn btn-back second-btn"
                    onClick={onBackClick}
                  />
              

                  <Button
                    iconPos="left"
                    label="Next"
                    className="btn btn-continue second-btn"
                    loading={buttonLoading}
                    onClick={onAddClick}
                  />

                </div>
              </div>
            </div>
          </div>
          <br/> <br/> <br/> <br/><br/> <br/> <br/> 
          </Scrollbars>
        </div>
      )}
    </>
  );
};

export default Wallet;
