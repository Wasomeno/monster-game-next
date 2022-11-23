import { useContext } from "react";
import AppContext from "../../contexts/AppContext";
import { useQuery } from "@tanstack/react-query";
import { getApprovalStatus, getTrades } from "../../fetchers/fetchers";
import { dailyTradeModalStores } from "../../stores/modalStores";
import BackButton from "../BackButton";
import Modal from "../Modal";
import { ModalTitle } from "../Texts";
import TradeDetails from "./TradeDetails";

const DailyTrader = () => {
  const [show, toggleShow] = dailyTradeModalStores((state) => [
    state.show,
    state.toggleShow,
  ]);
  const user = useContext(AppContext).account[0];
  const trades = useQuery(["dailyTrades"], getTrades());
  const approvalStatus = useQuery(
    ["approvalStatus", process.env.TRADER_CONTRACT_ADDRESS],
    getApprovalStatus(user, process.env.TRADER_CONTRACT_ADDRESS)
  );

  return (
    <Modal show={show}>
      <BackButton onClick={toggleShow} />
      <div className="flex justify-center">
        <ModalTitle>Daily Trader</ModalTitle>
      </div>
      <div className="">
        {trades.data?.map((trade, index) => (
          <TradeDetails
            key={index}
            user={user}
            details={{ id: index, trade: trade }}
            approval={approvalStatus.data}
          />
        ))}
      </div>
    </Modal>
  );
};

export default DailyTrader;
