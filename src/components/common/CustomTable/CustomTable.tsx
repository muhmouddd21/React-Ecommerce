import { ColumnDefinition } from "src/Types/shared";



interface TableProps<T> {
  data: T[];
  columns: ColumnDefinition<T>[];
  
}

const CustomTable = <T extends { id: number | string }>({ data, columns }: TableProps<T>) => {
  return (
    <table className="table table-striped table-bordered table-hover" style={{ tableLayout: 'fixed' }}>
      <thead className="table-dark">
        <tr >
          {columns.map((col) => (
            <th scope="col"  key={col.header} style={{ width: col.width }}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>

        {data.map((row) => (

          <tr key={row.id}>
            {columns.map((col) => (
              <td key={col.header}>
                {col.cell(row)}
              </td>
            ))}
          </tr>

        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;