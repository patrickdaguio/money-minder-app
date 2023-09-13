const Accounts = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h1 className="font-bold text-2xl">Add new account</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select name="type" id="type">
              <option value="savings">Savings</option>
              <option value="investments">Invesments</option>
              <option value="current">Current</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="balance">Balance</label>
            <input type="text" id="balance" name="balance" />
          </div>
          <button className="btn btn--primary" type="submit">
            Add account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Accounts;
