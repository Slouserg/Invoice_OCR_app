import { useState, useContext, useEffect } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useStyles } from "./styles";
import { Typography } from "@mui/material";
import userContext from "../../../context/user-context";

const OrganizationTabbar = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const userCtx = useContext(userContext);
  const role = userCtx.role;

  useEffect(() => {
    setValue(props.activePage);
  }, [props.activePage]);

  const handleChange = (event, newValue, tabName) => {
    setValue(newValue);
    props.onPageChange(tabName);
  };

  return (
    <>
      <div className={classes.rootContainer}>
        <Tabs
          className={classes.tabsContainer}
          centered
          value={value}
        >
          <Tab
            sx={{ mx: 5, p: 2 }}
            label={
              <Typography>
                <GroupAddIcon />
                ORGANIZATIONS
              </Typography>
            }
            value={0}
            onClick={(e) => handleChange(e, 0, "ORGANIZATIONS")}
          />
          <Tab
            sx={{ mx: 5, p: 2 }}
            label={
              <Typography>
                <GroupAddIcon />
                JOIN
              </Typography>
            }
            value={1}
            onClick={(e) => handleChange(e, 1, "JOIN")}
          />
          {role == "admin" && (
            <Tab
              sx={{ mx: 5, p: 2 }}
              label={
                <Typography>
                  <AddCircleIcon />
                  CREATE
                </Typography>
              }
              value={2}
              onClick={(e) => handleChange(e, 2, "CREATE")}
            />
          )}
        </Tabs>
      </div>
    </>
  );
};

export default OrganizationTabbar;
