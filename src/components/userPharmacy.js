function UserPharmacy() {
  return (
    <div className="page" style={{ marginTop: "50px"}}>
      <h2>Available Medicines</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Paracetamol</td>
            <td>Tablet</td>
            <td>20</td>
            <td>Available</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserPharmacy;
