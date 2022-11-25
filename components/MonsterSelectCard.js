import Image from "next/image";

const MonsterSelectCard = ({
  monster,
  level,
  exp,
  expCap,
  energy,
  energyCap,
  onClick,
}) => {
  return (
    <div
      className="w-36 flex flex-col justify-center items-center bg-slate-100 bg-opacity-40 rounded-md cursor-pointer transition duration-300 ease-in-out hover:bg-slate-600"
      onClick={onClick}
    >
      <div className="m-1 p-2 flex items-center">
        <Image
          src={"/monsters/" + (parseInt(monster) + 1) + ".png"}
          alt="monster-img"
          width="150"
          height="150"
          quality={100}
        />
      </div>

      <div className="m-2 py-1">
        <h5 className="text-white font-monogram text-2xl text-center">
          Monster #{monster}
        </h5>
        <div className="text-start font-monogram text-white text-lg">
          <h5>Level : {level} / 10</h5>
          <h5>
            Exp : {exp} / {expCap}
          </h5>
          <h5>
            Energy : {energy} / {energyCap}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default MonsterSelectCard;
