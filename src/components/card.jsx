const Card = ({ data, hideButton, onClickButton }) => {
  function buttonClick(status) {
    onClickButton(status);
  }
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="p-2">
        <img src={data.photo} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {data.firstName} {data.lastName}
        </h2>
        <p>{data.about}</p>
        {!hideButton && (
          <div className="card-actions justify-end">
            <button
              onClick={() => buttonClick("ignored")}
              className="btn btn-error"
            >
              Ignore
            </button>
            <button
              onClick={() => buttonClick("interested")}
              className="btn btn-success"
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
