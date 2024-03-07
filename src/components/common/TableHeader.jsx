import React, { memo } from "react";

const TableHeader = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th className="clickable" key={column.path || column.key}>
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default memo(TableHeader);
