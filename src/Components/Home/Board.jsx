function Board({ name, children }) {
  return (
    <div className="w-[24rem] justify-center items-center bg-white shadow-lg rounded-lg flex flex-col">
      <div className="w-full p-4 justify-start flex flex-col">
        <h4
          className="unselectable text-4xl mb-3 text-gray-700 break-words min-w-0"
          unselectable="on"
        >
          {name}
        </h4>
        {children}
      </div>
    </div>
  );
}

export default Board;
