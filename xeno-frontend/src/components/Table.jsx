export default function Table({ data }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Total Spent</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.firstName} {item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.totalSpent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
