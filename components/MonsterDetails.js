import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BigNumber, ethers } from "ethers";
import MoonLoader from "react-spinners/MoonLoader";
import FeedModal from "./modals/FeedModal";
import { monsterContract } from "../hooks/useContract";
import PotionModal from "./modals/PotionModal";
import BackButton from "./buttons/BackButton";

const MonsterDetails = ({ tokenId, setShowDetails }) => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [showFeed, setShowFeed] = useState(false);
  const [showPotions, setShowPotions] = useState(false);
  const monsterHandler = monsterContract();

  async function getDetails() {
    await monsterHandler.monsterStats(tokenId).then((response) => {
      setDetails({
        level: response.level.toString(),
        energy: response.energy.toString(),
        energyCap: response.energyCap.toString(),
        exp: response.exp.toString(),
        expCap: response.expCap.toString(),
        status: response.status.toString(),
        cooldown: response.cooldown.toString(),
      });
    });
    setLoading(false);
  }

  useEffect(() => {
    getDetails();
  }, [details.energy]);

  return (
    <>
      <motion.div
        className="container h-75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      >
        <BackButton onClick={() => setShowDetails(false)} />
        <div className="row justify-content-center">
          <h2 id="modal-title" className="text-center p-3">
            Monster #{tokenId}
          </h2>
        </div>
        <div className="d-flex justify-content-center">
          <MoonLoader color="#8E3200" loading={loading} size={50} />
          {loading ? (
            <></>
          ) : (
            <>
              <div className="col">
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="col-6 m-3">
                    <img
                      alt="monster-img"
                      src={"/monsters/" + (parseInt(tokenId) + 1) + ".png"}
                      width={"100%"}
                    />
                  </div>

                  <div className="d-flex justify-content-center align-items-center my-2">
                    <button
                      id="text"
                      className="btn btn-success mx-1 col-6"
                      onClick={() => setShowFeed(true)}
                    >
                      Feed
                    </button>

                    <button
                      id="text"
                      className="btn btn-success mx-1 col-6"
                      onClick={() => setShowPotions(true)}
                    >
                      Potion
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-8">
                <div className="container">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="col-3">
                      <h5 className="m-0" id="modal-title">
                        Level :
                      </h5>
                    </div>
                    <div className="col-2 text-center">
                      <h5 className="m-0" id="modal-title">
                        {details.level} / 10
                      </h5>
                    </div>
                    <div className="col-7">
                      <div class="progress">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{
                            width:
                              ((details.level / 10) * 100).toString() + "%",
                          }}
                          aria-valuenow={details.level}
                          aria-valuemin="1"
                          aria-valuemax="10"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="col-3">
                      <h5 className="m-0" id="modal-title">
                        Energy :
                      </h5>
                    </div>
                    <div className="col-2">
                      <h5 className="m-0 text-center" id="modal-title">
                        {details.energy} /{details.energyCap}
                      </h5>
                    </div>
                    <div className="col-7">
                      <div class="progress">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{
                            width:
                              ((details.hunger / 100) * 100).toString() + "%",
                          }}
                          aria-valuenow={details.hunger}
                          aria-valuemin="1"
                          aria-valuemax="10"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="col-3">
                      <h5 className="m-0" id="modal-title">
                        Exp :
                      </h5>
                    </div>
                    <div className="col-2">
                      <h5 className="m-0 text-center" id="modal-title">
                        {details.exp} / {details.expCap}
                      </h5>
                    </div>
                    <div className="col-7">
                      <div class="progress">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{
                            width:
                              (
                                (details.exp / details.expCap) *
                                100
                              ).toString() + "%",
                          }}
                          aria-valuenow={details.exp}
                          aria-valuemin="1"
                          aria-valuemax="10"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="col-3">
                      <h5 className="m-0" id="modal-title">
                        Status :
                      </h5>
                    </div>
                    <div className="col">
                      {details.status === "1" ? (
                        <h5 className="m-0 text-center" id="modal-title">
                          On a Mission
                        </h5>
                      ) : details.status === "2" ? (
                        <h5 className="m-0 text-center" id="modal-title">
                          On Nursery
                        </h5>
                      ) : details.status === "3" ? (
                        <h5 className="m-0 text-center" id="modal-title">
                          On Dungeon
                        </h5>
                      ) : (
                        <h5 className="m-0 text-center" id="modal-title">
                          Inactive
                        </h5>
                      )}
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="col-3">
                      <h5 className="m-0" id="modal-title">
                        Cooldown :{" "}
                      </h5>
                    </div>
                    <div className="col">
                      <h5 className="m-0 text-center" id="modal-title">
                        {details.cooldown > Date.now() / 1000
                          ? "On Cooldown"
                          : "Cooldown finished"}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
      <FeedModal
        setShowFeed={setShowFeed}
        showFeed={showFeed}
        monster={tokenId}
        level={details.level}
      />
      <PotionModal
        setShowPotions={setShowPotions}
        showPotions={showPotions}
        monster={tokenId}
      />
    </>
  );
};

export default MonsterDetails;
