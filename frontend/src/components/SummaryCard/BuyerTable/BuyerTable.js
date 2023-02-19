import { useStyles } from "./styles";
import DataTable from "../../Table/DataTable";

const BuyerTable = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.table}>
      <DataTable data={props.data ? props.data.buyer_data : ""} />
    </div>
  );
};

export default BuyerTable;
