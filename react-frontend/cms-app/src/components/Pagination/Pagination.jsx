const Pagination = () => {
  return (
    <div class="table-pagination">
      <div class="flex items-center justify-between">
        <div class="buttons">
          <button type="button" class="button active">
            1
          </button>
          <button type="button" class="button">
            2
          </button>
          <button type="button" class="button">
            3
          </button>
        </div>
        <small>Page 1 of 3</small>
      </div>
    </div>
  );
};

export default Pagination;
