import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllColor } from "../../../../redux/color/colorAction";

const ColorSelect = () => {
  const { colors } = useSelector((state) => state.color);
  const dispatch = useDispatch();

  const [showSelect, setShowSelect] = useState(false);
  const [onHover, setOnHover] = useState(false);
  const [id, setId] = useState(null);
  const [nameColor, setNameColor] = useState('');

  useEffect(() => {
    if (!colors) {
      dispatch(getAllColor());
    }
  }, [colors, dispatch]);

  return (
    <div>
      <div className="field relative">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Màu sắc"
            value={nameColor}
            onInput={(e) => {setNameColor(e.target.value)}}
            onChange={(e) => {setNameColor(e.target.value)}}
            onFocus={(e) => {
              setShowSelect(true);
            }}
            onBlur={(e) => {
              if (!onHover) setShowSelect(false);
            }}
          />
        </div>
        {showSelect && (
          <div className="absolute mt-1 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto z-10">
            {colors &&
              colors.filter(color => nameColor === '' || color.name.includes(nameColor)).map((color) => (
                <div
                  className="cursor-pointer flex w-100 hover:bg-black hover:bg-opacity-10 p-2 border"
                  onMouseEnter={(e) => {
                    setOnHover(true);
                  }}
                  onMouseLeave={(e) => {
                    setOnHover(false);
                  }}
                  onClick={(e) => {
                    setId(color.id);
                    setNameColor(color.name);
                    setShowSelect(false);
                  }}
                >
                  <div
                    className="w-6 h-6 mr-2 w-100 border rounded-md"
                    style={{ background: color.hexCode }}
                  ></div>
                  <div className="">{color.name}</div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorSelect;
