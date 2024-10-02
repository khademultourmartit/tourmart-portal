"use client";
import {
  Box,
  Button,
  ClickAwayListener,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
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
  const [travelerBoxOpen, setTravelerBoxOpen] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [kidCount, setKidCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [totalPassenger, setTotalPassenger] = useState(1);

  const [fromSearchText, setFromSearchText] = useState({
    airportCode: "DAC",
    airportName: "Hazrat Shahjalal Intl Arpt",
    cityName: "Dhaka",
    countryName: "Bangladesh",
  });

  const [toSearchText, setToSearchText] = useState({
    airportCode: "CXB",
    airportName: "Coxs Bazar Airport",
    cityName: "Coxs Bazar",
    countryName: "Bangladesh",
  });

  const handleClose = () => {
    setTotalPassenger(adultCount + childCount + kidCount + infantCount);
    setTravelerBoxOpen(false);
  };
  const handleClickAway = () => {
    setTravelerBoxOpen(false);
  };
  //  adult Increment
  function adultInclement(e: React.FormEvent) {
    e.preventDefault();
    if (adultCount < 9 - (childCount + kidCount)) {
      setAdultCount(adultCount + 1);
    }
  }
  // adult decrement
  function adultDecrement(e: React.FormEvent) {
    e.preventDefault();
    if (adultCount > 1) {
      setAdultCount(adultCount - 1);
      if (infantCount === adultCount) {
        if (infantCount > 1) {
          setInfantCount(infantCount - 1);
        }
      }
    }
  }
  //  child incerement
  function childIncrement(e: React.FormEvent) {
    e.preventDefault();
    if (childCount < 9 - (adultCount + kidCount)) {
      setChildCount(childCount + 1);
    }
  }
  // child decrement
  function childDecrement(e: React.FormEvent) {
    e.preventDefault();
    if (childCount > 0) {
      setChildCount(childCount - 1);
    }
  }
  //  kid increment
  function kidInclement(e: React.FormEvent) {
    e.preventDefault();
    if (kidCount < 9 - (adultCount + childCount)) {
      setKidCount(kidCount + 1);
    }
  }
  // kid decrement
  function kidDecrement(e: React.FormEvent) {
    e.preventDefault();
    if (kidCount > 0) {
      setKidCount(kidCount - 1);
    }
  }
  // Increment the default value if the value is not a child.
  function infantIncrement(e: React.FormEvent) {
    e.preventDefault();
    if (infantCount < adultCount) {
      setInfantCount(infantCount + 1);
    }
  }
  // Decrement the infant by 1.
  function infantDecrement(e: React.FormEvent) {
    e.preventDefault();
    if (infantCount > 0) {
      setInfantCount(infantCount - 1);
    }
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
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
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
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
                        <Typography
                          sx={{ color: "#6E0A82", fontWeight: "500" }}
                        >
                          {fromSearchText?.airportCode}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            color: "#2D233C",
                            fontSize: "14px",
                          }}
                        >
                          {fromSearchText?.cityName},
                          {fromSearchText?.countryName}
                        </Typography>
                        <Typography sx={{ color: "#6E6996", fontSize: "11px" }}>
                          {fromSearchText?.airportName}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
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
                        <Typography
                          sx={{ color: "#6E0A82", fontWeight: "500" }}
                        >
                          {toSearchText?.airportCode}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ color: "#2D233C", fontSize: "14px" }}>
                          {toSearchText?.cityName}, {toSearchText?.countryName}
                        </Typography>
                        <Typography sx={{ color: "#6E6996", fontSize: "11px" }}>
                          {toSearchText?.airportName}
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
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
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
                        <Typography
                          sx={{ color: "#6E0A82", fontWeight: "500" }}
                        >
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
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Image src={calender} alt="plan Icon" />
                      <Typography sx={{ fontSize: "12px", color: "#9493BD" }}>
                        Add Return
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                md={2}
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    border: "1px solid #D9D5EC",
                    p: 1,
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
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
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setTravelerBoxOpen((prev) => !prev);
                      }}
                    >
                      <Image src={calender} alt="plan Icon" />
                      <Typography
                        sx={{
                          fontSize: "15px",
                          color: "#2D233C",
                          fontWeight: 500,
                        }}
                      >
                        {totalPassenger} Traveler
                      </Typography>
                    </Box>

                    {travelerBoxOpen && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: {
                            lg: "105%",
                            md: "100%",
                            sm: "100%",
                            xs: "100%",
                          },
                          right: "0px",
                          zIndex: 100,
                          borderRadius: "5px",
                          backgroundColor: "#A56EB4",
                          width: "260px",
                        }}
                      >
                        <Box width="250px" p={2}>
                          <Typography
                            style={{
                              textAlign: "left",
                              marginBottom: "5px",
                              color: "#fff",
                              fontWeight: 400,
                            }}
                          >
                            Passenger
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={4}
                            justifyContent="space-between"
                            alignItems="center"
                            pb={1}
                          >
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="space-between"
                              width="40%"
                            >
                              <button
                                onClick={adultDecrement}
                                style={{
                                  backgroundColor: "#fff",
                                  color: "var(--white)",
                                  border: "none",
                                  width: "25px",
                                  height: "25px",
                                  fontSize: "20px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "2px",
                                  cursor: "pointer",
                                }}
                              >
                                -
                              </button>
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "#fff",
                                }}
                              >
                                {adultCount}
                              </Typography>
                              <button
                                onClick={adultInclement}
                                style={{
                                  backgroundColor: "#fff",
                                  color: "var(--white)",
                                  border: "none",
                                  width: "25px",
                                  height: "25px",
                                  fontSize: "20px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "2px",
                                  cursor: "pointer",
                                }}
                              >
                                +
                              </button>
                            </Stack>
                            <Box width="60%">
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "#fff",
                                }}
                              >
                                Adult
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: "#fff",
                                }}
                              >
                                12+ yrs
                              </Typography>
                            </Box>
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={4}
                            justifyContent="space-between"
                            alignItems="center"
                            pb={1}
                          >
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="space-between"
                              width="40%"
                            >
                              <button
                                onClick={childDecrement}
                                style={{
                                  backgroundColor: "#fff",
                                  color: "var(--white)",
                                  border: "none",
                                  width: "25px",
                                  height: "25px",
                                  fontSize: "20px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "2px",
                                  cursor: "pointer",
                                }}
                              >
                                -
                              </button>
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "#fff",
                                }}
                              >
                                {childCount}
                              </Typography>
                              <button
                                onClick={childIncrement}
                                style={{
                                  backgroundColor: "#fff",
                                  color: "var(--white)",
                                  border: "none",
                                  width: "25px",
                                  height: "25px",
                                  fontSize: "20px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "2px",
                                  cursor: "pointer",
                                }}
                              >
                                +
                              </button>
                            </Stack>
                            <Box width="60%">
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "#fff",
                                }}
                              >
                                Child
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: "#fff",
                                }}
                              >
                                5- less than 12 yrs
                              </Typography>
                            </Box>
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={4}
                            justifyContent="space-between"
                            alignItems="center"
                            pb={1}
                          >
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="space-between"
                              width="40%"
                            >
                              <button
                                onClick={kidDecrement}
                                style={{
                                  backgroundColor: "#fff",
                                  color: "var(--white)",
                                  border: "none",
                                  width: "25px",
                                  height: "25px",
                                  fontSize: "20px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "2px",
                                  cursor: "pointer",
                                }}
                              >
                                -
                              </button>
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "#fff",
                                }}
                              >
                                {kidCount}
                              </Typography>
                              <button
                                onClick={kidInclement}
                                style={{
                                  backgroundColor: "#fff",
                                  color: "var(--white)",
                                  border: "none",
                                  width: "25px",
                                  height: "25px",
                                  fontSize: "20px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "2px",
                                  cursor: "pointer",
                                }}
                              >
                                +
                              </button>
                            </Stack>
                            <Box width="60%">
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "#fff",
                                }}
                              >
                                Kid
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: "#fff",
                                }}
                              >
                                2- less than 5 yrs
                              </Typography>
                            </Box>
                          </Stack>

                          <Stack
                            direction="row"
                            spacing={4}
                            justifyContent="space-between"
                            alignItems="center"
                            pb={1}
                          >
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="space-between"
                              width="40%"
                            >
                              <button
                                onClick={infantDecrement}
                                style={{
                                  backgroundColor: "#fff",
                                  color: "var(--white)",
                                  border: "none",
                                  width: "25px",
                                  height: "25px",
                                  fontSize: "20px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "2px",
                                  cursor: "pointer",
                                }}
                              >
                                -
                              </button>
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "#fff",
                                }}
                              >
                                {infantCount}
                              </Typography>
                              <button
                                onClick={infantIncrement}
                                style={{
                                  backgroundColor: "#fff",
                                  color: "var(--white)",
                                  border: "none",
                                  width: "25px",
                                  height: "25px",
                                  fontSize: "20px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "2px",
                                  cursor: "pointer",
                                }}
                              >
                                +
                              </button>
                            </Stack>
                            <Box width="60%">
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "#fff",
                                }}
                              >
                                Infant
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: "#fff",
                                }}
                              >
                                0 - 23 month
                              </Typography>
                            </Box>
                          </Stack>
                          {/* <FormControl>
                          <RadioGroup
                            value={className}
                            onChange={handleClassName}
                          >
                            <Grid container spacing={0}>
                              {flightClasses.map((classes, i) => (
                                <Grid key={i} item xs={6}>
                                  <FormControlLabel
                                    value={classes}
                                    control={
                                      <Radio
                                        sx={{
                                          color: "#fff",
                                          "&.Mui-checked": {
                                            color: "#fff",
                                          },
                                        }}
                                      />
                                    }
                                    label={
                                      <Typography
                                        sx={{
                                          color: "#fff",
                                          fontSize: "11px",
                                        }}
                                      >
                                        {classes.replace(
                                          /([a-z])([A-Z])/g,
                                          "$1 $2"
                                        )}
                                      </Typography>
                                    }
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </RadioGroup>
                        </FormControl> */}

                          <Box mt={2} style={{ textAlign: "right" }}>
                            <Button
                              size="small"
                              onClick={handleClose}
                              className="shine-effect"
                              style={{
                                backgroundColor: "#fff",
                                color: "var(--white)",
                              }}
                            >
                              DONE
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    )}
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
    </ClickAwayListener>
  );
};

export default Dashboard;
