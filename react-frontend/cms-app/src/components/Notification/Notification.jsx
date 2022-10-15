const Notification = (props) => {

  const onClickDismiss = (e) => {
    e.currentTarget.closest('.notification').classList.add('hidden');
  }

  return (
    <div className="notification green">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
        <div>
          <span className="icon">
            <i className="mdi mdi-buffer"></i>
          </span>
          <b>{props.result}</b> {props.message}
        </div>
        <button
          type="button"
          className="button small textual --jb-notification-dismiss"
          onClick={onClickDismiss}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default Notification;
