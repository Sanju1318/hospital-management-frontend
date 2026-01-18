function UserReports() {
  return (
    <div className="page">
      <h2>My Reports</h2>

      <table>
        <thead>
          <tr>
            <th>Report</th>
            <th>Date</th>
            <th>PDF</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Blood Test</td>
            <td>10/06/2025</td>
            <td><button>Download</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserReports;
