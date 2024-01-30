import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Users from "./Users";
import performRequest from "../../api/AxiosConfig";
import NoResultsImage from "../../assets/search.svg";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [balance, setBalance] = useState(0);

  const token = localStorage.getItem("token");

  const getUsers = async () => {
    try {
      if (search.length > 0) {
        const results = await performRequest(
          "GET",
          `/user/bulk?filter=${search}`,
          "",
          token
        );
        setUsersData(results.users);
      } else if (search.length === 0 || search === "") {
        setUsersData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [search]);

  useEffect(() => {
    getUserBalance();
  }, []);

  const getUserBalance = async () => {
    try {
      const accountBalance = await performRequest(
        "GET",
        "/account/balance",
        "",
        token
      );
      setBalance(accountBalance.balance);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p={3}>
      <Box>
        <Typography variant="h6" fontWeight={600}>
          Your Balance - ₹{balance ? balance : "Fetching..."}
        </Typography>
        <Typography variant="h6" fontWeight={600}>
          Users
        </Typography>
      </Box>
      <Box>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          label="Search"
          placeholder="Search for users..."
          sx={{ marginTop: "1rem", marginBottom: "1.5rem" }}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <Box>
        <Stack direction={"column"} spacing={3}>
          {usersData.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={NoResultsImage}
                alt="no results found"
                width={"250px"}
                height={"250px"}
              />
              <p>No results found</p>
            </Box>
          ) : (
            usersData.map((user, i) => <Users userData={user} key={i} />)
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default Dashboard;
