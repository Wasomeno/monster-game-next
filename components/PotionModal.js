import React from "react";

const PotionModal = () => {
  const connection = useContext(AppContext);
  const [amount, setAmount] = useState(1);
  const [potion, setPotion] = useState(0);
  const itemsHelper = itemsContract();
  const monsterGameHelper = monsterGameContract();

  async function getPotion() {
    await itemsHelper.balanceOf(connection.account[0], 2).then((response) => {
      setPotion(response);
    });
  }

  async function usePotion() {}

  function decrement() {
    if (amount <= 1) return;
    setAmount(amount - 1);
  }
  function increment() {
    if (amount >= 10) return;
    setAmount(amount + 1);
  }

  useEffect(() => {
    getPotion();
  }, []);

  if (!showFeed) return;
  return (
    <>
      <motion.div
        id="modal-screen"
        className="h-100 w-100 bg-dark bg-opacity-75"
        onClick={() => setShowFeed(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      />
      <motion.div
        id="shop-modal"
        className="container w-50 h-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      >
        <div className="row justify-content-center align-items-center">
          <h3 className="text-center p-2" id="text">
            Use Potions
          </h3>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col text-center">
            <div className="d-flex justify-content-center align-items-center">
              <img src="/2.png" width={"20%"} alt="potion-img" />
              <h5 className="m-0 p-1" id="modal-title">
                x {potion.toString()}
              </h5>
            </div>
            <button className="btn btn-success" id="text">
              Use Potion
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PotionModal;
