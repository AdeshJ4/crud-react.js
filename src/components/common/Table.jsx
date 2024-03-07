import React, { memo } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({ columns, data }) => {
  return (
    <>
      <div className="table-responsive mb-3">
        <table className="table table-bordered table-hover border-primary">
          <TableHeader columns={columns} />
          <TableBody columns={columns} data={data} />
        </table>
      </div>
    </>
  );
};

export default memo(Table);
