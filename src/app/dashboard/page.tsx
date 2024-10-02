"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Flight from "../../../public/assests/searchIcon/airplan.svg";
import Plan from "../../../public/assests/searchIcon/plan.svg";
import calender from "../../../public/assests/searchIcon/calender.svg";
import flightClass from "../../../public/assests/searchIcon/flightClass.svg";
import traveler from "../../../public/assests/searchIcon/traveler.svg";
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
          <Grid container spacing={2}>
            <Grid item md={5}>
              <Box
                sx={{
                  border: "1px solid #D9D5EC",
                  p: 1,
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
                      <Typography
                        sx={{
                          color: "#2D233C",
                          fontSize: "14px",
                        }}
                      >
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
                        BKK
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

            <Grid item md={4}>
              <Box
                sx={{
                  border: "1px solid #D9D5EC",
                  p: 1,
                  display: "flex",
                  gap: "15px",
                  // justifyContent: "space-between",
                }}
              >
                <Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Image src={calender} alt="plan Icon" />
                    <Typography sx={{ fontSize: "12px", color: "#9493BD" }}>
                      Departure
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
                        25
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ color: "#2D233C", fontSize: "14px" }}>
                        November
                      </Typography>
                      <Typography sx={{ color: "#6E6996", fontSize: "11px" }}>
                        Wednesday, 2024
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    border: "1px solid #D9D5EC",
                    width: "1px",
                  }}
                ></Box>

                <Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Image src={calender} alt="plan Icon" />
                    <Typography sx={{ fontSize: "12px", color: "#9493BD" }}>
                      Add Return
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item md={2}>
              <Box
                sx={{
                  border: "1px solid #D9D5EC",
                  p: 1,
                }}
              >
                <Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Image src={calender} alt="plan Icon" />
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "#2D233C",
                        fontWeight: 500,
                      }}
                    >
                      Economy
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      border: "1px solid #D9D5EC",
                      width: "100%",
                    }}
                    my={1}
                  ></Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Image src={calender} alt="plan Icon" />
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "#2D233C",
                        fontWeight: 500,
                      }}
                    >
                      3 Traveler
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item md={1}>
              <Box
                sx={{
                  border: "1px solid #D9D5EC",
                  p: 1,
                  display: "flex",
                  gap: "15px",
                  background: "#A56EB4",
                  borderRadius: "3px",
                  cursor: "pointer",
                  height: "100%",

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Search
                  </button>
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
