"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Flight from "../../../public/assests/searchIcon/airplan.svg";
import Plan from "../../../public/assests/searchIcon/plan.svg";
import Image from "next/image";

type MenuItem = {
  name: string;
  icon: string;
};
const searchBars: MenuItem[] = [
  {
    name: "Flight",
    icon: Flight,
  },
];
type FlightMenu = {
  name: string;
};

const flightMenu: FlightMenu[] = [
  {
    name: "One Way",
  },
  {
    name: "Round Trip",
  },
  {
    name: "Multi City",
  },
];

const Dashboard = () => {
  const [tabs, setTabs] = useState("Flight");
  const [currentMenu, setCurrentMenu] = useState("One Way");
  return (
    <Box>
      <Box>
        {searchBars.map((bar, i) => (
          <Button
            key={i}
            sx={{
              bgcolor: "#6E0A82",
              width: "120px",
              textTransform: "capitalize",
              color: "white",
              display: "flex",
              gap: "5px",
              fontSize: "13px",
            }}
          >
            <Image src={bar.icon} alt={bar.name} width={20} height={20} />{" "}
            {bar?.name}
          </Button>
        ))}
      </Box>

      <Box
        sx={{ bgcolor: "white", mt: 3, borderRadius: "4px", p: "15px 25px" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {flightMenu.map((menu, i) => (
            <Button
              onClick={() => setCurrentMenu(menu?.name)}
              key={i}
              sx={{
                bgcolor: currentMenu === menu?.name ? "#A56EB4" : "#F2F0F9",
                width: "100px",
                textTransform: "capitalize",
                color: currentMenu === menu?.name ? "white" : "#A56EB4",
                display: "flex",
                gap: "5px",
                fontSize: "13px",
                height: "28px",
              }}
            >
              {menu?.name}
            </Button>
          ))}
        </Box>

        <Box mt={2}>
          <Grid container>
            <Grid item md={7}>
              <Box
                sx={{
                  border: "1px solid #D9D5EC",
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Image src={Plan} alt="plan Icon" />
                    <Typography sx={{ fontSize: "12px", color: "#9493BD" }}>
                      From
                    </Typography>
                  </Box>

                  <Box mt={1} sx={{ display: "flex", gap: "10px" }}>
                    <Box
                      sx={{
                        height: "36px",
                        bgcolor: "#F2F0F9",
                        width: "55px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography sx={{ color: "#6E0A82", fontWeight: "500" }}>
                        DAC
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ color: "#2D233C", fontSize: "14px" }}>
                        Dhaka, Bangladesh
                      </Typography>
                      <Typography sx={{ color: "#6E6996", fontSize: "11px" }}>
                        Hazrat Shahjalal Intl Airport
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Image src={Plan} alt="plan Icon" />
                    <Typography sx={{ fontSize: "12px", color: "#9493BD" }}>
                      To
                    </Typography>
                  </Box>

                  <Box mt={1} sx={{ display: "flex", gap: "10px" }}>
                    <Box
                      sx={{
                        height: "36px",
                        bgcolor: "#F2F0F9",
                        width: "55px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography sx={{ color: "#6E0A82", fontWeight: "500" }}>
                        DAC
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ color: "#2D233C", fontSize: "14px" }}>
                        Bangkok, Thailand
                      </Typography>
                      <Typography sx={{ color: "#6E6996", fontSize: "11px" }}>
                        Hazrat Shahjalal Intl Airport
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
