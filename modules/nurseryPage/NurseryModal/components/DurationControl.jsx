const DurationControl = ({ monstersOnNursery, duration, setDuration }) => {
  const increment = () => {
    if (duration >= 10) return;
    setDuration((currentValue) => currentValue + 1);
  };

  const decrement = () => {
    if (duration <= 1) return;
    setDuration((currentValue) => currentValue - 1);
  };

  return (
    <div className="mx-2 flex w-2/12 flex-col justify-center rounded-md border-2 border-white">
      {monstersOnNursery > 0 ? (
        <div className="flex items-center justify-center">
          <h5 id="text" className="m-0 p-2 text-center text-white">
            You&aposre Resting
          </h5>
        </div>
      ) : (
        <>
          <h5 className="font-monogram text-center text-xl text-white">
            Duration
          </h5>
          <div className="flex items-center justify-around">
            <h5 id="modal-title" className="m-0" onClick={decrement}>
              -
            </h5>
            <h4 id="text" className="m-0 text-white">
              {duration}
            </h4>
            <h5 id="modal-title" className="m-0" onClick={increment}>
              +
            </h5>
          </div>
        </>
      )}
    </div>
  );
};

export default DurationControl;
