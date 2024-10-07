"use client";
import {
  Box,
  Button,
  ClickAwayListener,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Flight from "../../../public/assests/searchIcon/airplan.svg";
import Plan from "../../../public/assests/searchIcon/plan.svg";
import ToPlane from "../../../public/assests/searchIcon/ToPlane.svg";
import calender from "../../../public/assests/searchIcon/calender.svg";
import flightClass from "../../../public/assests/searchIcon/flightClass.svg";
import traveler from "../../../public/assests/searchIcon/traveler.svg";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Alert from "@mui/material/Alert";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AddIcon from "@mui/icons-material/Add";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { styled } from "@mui/material/styles";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import { addDays, format } from "date-fns";
import moment from "moment";

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

interface Airport {
  id: number;
  airportCode: string;
  airportName: string;
  cityName: string;
  cityCode: string;
  countryName: string;
  countryCode: string;
  activeRunways: string;
  airportElevation: string;
}
interface AirportPayload {
  cityCode: string;
  airportCode: string;
  cityName: string;
  countryName: string;
  airportName: string;
  airports: Airport[];
}

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto #003566",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "var(--primary-color)",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "var(--secondary-color)",
  },
});

function BpRadio(props: any) {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const Dashboard = () => {
  const flightClasses = [
    "Economy",
    "Premium Economy",
    "Business",
    "First Class",
  ];

  const [tabs, setTabs] = useState("Flight");
  const [currentMenu, setCurrentMenu] = useState("One Way");
  const [travelerBoxOpen, setTravelerBoxOpen] = useState(false);
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [classBoxOpen, setClassBoxOpen] = useState(false);
  const [openJourneyDate, setOpenJourneyDate] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [kidCount, setKidCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [totalPassenger, setTotalPassenger] = useState(1);
  const [airportData, setAirportData] = useState<AirportPayload[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("bangladesh");
  const [className, setClassName] = useState("Economy");
  const now = useRef(new Date());
  const [journeyDate, setJourneyDate] = useState(addDays(now.current, 0));

  const [open, setOpen] = useState(false);
  const today = new Date();
  const maxDate = new Date();

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

  useEffect(() => {
    const url = `http://82.112.238.135:88/airports/search?searchInput=${searchKeyword}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAirportData(data?.payload);
      });
  }, [searchKeyword]);

  const handleClose = () => {
    setTotalPassenger(adultCount + childCount + kidCount + infantCount);
    setTravelerBoxOpen(false);
  };

  //todo: end of form Submit section
  const handleSelect = (date: any) => {
    setJourneyDate(date);
    setOpenJourneyDate(false);
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

  const fromSuggestedText = (data: any) => {
    setFromSearchText(data);
  };

  const toSuggestedText = (data: any) => {
    setToSearchText(data);
  };

  const fromGetSuggetion = () => {
    return (
      <Box
        style={{
          height: "fit-content",
          position: "relative",
          width: "100%",
          zIndex: "100",
        }}
      >
        <Box
          sx={{
            maxHeight: "230px",
            overflowY: "auto",
            background: "#fff",
            "&::-webkit-scrollbar": { width: "5px" },
          }}
        >
          {airportData?.length !== 0 ? (
            airportData?.map((item) => (
              <>
                <Box
                  sx={{
                    padding: "10px",
                    cursor: "pointer",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    onClick={() => {
                      fromSuggestedText(item);
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#A56EB4",
                        fontSize: "13px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <LocationOnIcon
                        sx={{
                          color: "#A56EB4",
                          fontSize: "20px",
                        }}
                      />
                      {item?.cityName}
                    </Typography>

                    <Typography
                      style={{
                        fontSize: "11px",
                        color: "#6E6996",
                      }}
                    >
                      All Airport
                    </Typography>
                  </Box>

                  <Box my={1}>
                    <hr
                      style={{
                        backgroundColor: "#F2F0F9",
                        height: "2px",
                        border: "none",
                      }}
                    ></hr>
                  </Box>

                  {item?.airports ? (
                    item?.airports?.map((data) => (
                      <Box
                        key={data?.id}
                        sx={{
                          display: "flex",
                          gap: "8px",
                        }}
                        p={0.5}
                        mt={1}
                        onClick={() => {
                          fromSuggestedText(data);
                        }}
                      >
                        <Box
                          sx={{
                            height: "30px",
                            bgcolor: "#F2F0F9",
                            width: "45px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#6E0A82",
                              fontWeight: "500",
                              fontSize: "12px",
                            }}
                          >
                            {data?.airportCode}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              color: "#2D233C",
                              fontSize: "12px",
                            }}
                          >
                            {data?.cityName}, {data?.countryName}
                          </Typography>
                          <Typography
                            sx={{ color: "#6E6996", fontSize: "10px" }}
                          >
                            {data?.airportName}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          // transition: "all .3s ease-in-out",
                          // "&:hover": {
                          //   backgroundColor: "#C3A0CD",
                          // },
                        }}
                        p={0.5}
                        mt={1}
                        onClick={() => {
                          fromSuggestedText(item);
                        }}
                      >
                        <Box
                          sx={{
                            height: "30px",
                            bgcolor: "#F2F0F9",
                            width: "45px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#6E0A82",
                              fontWeight: "500",
                              fontSize: "12px",
                            }}
                          >
                            {item?.airportCode}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              color: "#2D233C",
                              fontSize: "12px",
                            }}
                          >
                            {item?.cityName}, {item?.countryName}
                          </Typography>
                          <Typography
                            sx={{ color: "#6E6996", fontSize: "10px" }}
                          >
                            {item?.airportName}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
              </>
            ))
          ) : (
            <Box>
              <Typography
                style={{
                  color: "#DC143C",
                  paddingLeft: "10px",
                }}
              >
                Not found
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  const toGetSuggetion = () => {
    return (
      <Box
        style={{
          height: "fit-content",
          position: "relative",
          width: "100%",
          zIndex: "100",
        }}
      >
        <Box
          sx={{
            maxHeight: "230px",
            overflowY: "auto",
            background: "#fff",
            "&::-webkit-scrollbar": { width: "5px" },
          }}
        >
          {airportData?.length !== 0 ? (
            airportData?.map((item) => (
              <>
                <Box
                  sx={{
                    padding: "10px",
                    cursor: "pointer",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    onClick={() => {
                      toSuggestedText(item);
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#A56EB4",
                        fontSize: "13px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <LocationOnIcon
                        sx={{
                          color: "#A56EB4",
                          fontSize: "20px",
                        }}
                      />
                      {item?.cityName}
                    </Typography>

                    <Typography
                      style={{
                        fontSize: "11px",
                        color: "#6E6996",
                      }}
                    >
                      All Airport
                    </Typography>
                  </Box>

                  <Box my={1}>
                    <hr
                      style={{
                        backgroundColor: "#F2F0F9",
                        height: "2px",
                        border: "none",
                      }}
                    ></hr>
                  </Box>

                  {item?.airports ? (
                    item?.airports?.map((data) => (
                      <Box
                        key={data?.id}
                        sx={{
                          display: "flex",
                          gap: "8px",
                        }}
                        p={0.5}
                        mt={1}
                        onClick={() => {
                          toSuggestedText(data);
                        }}
                      >
                        <Box
                          sx={{
                            height: "30px",
                            bgcolor: "#F2F0F9",
                            width: "45px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#6E0A82",
                              fontWeight: "500",
                              fontSize: "12px",
                            }}
                          >
                            {data?.airportCode}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              color: "#2D233C",
                              fontSize: "12px",
                            }}
                          >
                            {data?.cityName}, {data?.countryName}
                          </Typography>
                          <Typography
                            sx={{ color: "#6E6996", fontSize: "10px" }}
                          >
                            {data?.airportName}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          // transition: "all .3s ease-in-out",
                          // "&:hover": {
                          //   backgroundColor: "#C3A0CD",
                          // },
                        }}
                        p={0.5}
                        mt={1}
                        onClick={() => {
                          toSuggestedText(item);
                        }}
                      >
                        <Box
                          sx={{
                            height: "30px",
                            bgcolor: "#F2F0F9",
                            width: "45px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#6E0A82",
                              fontWeight: "500",
                              fontSize: "12px",
                            }}
                          >
                            {item?.airportCode}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              color: "#2D233C",
                              fontSize: "12px",
                            }}
                          >
                            {item?.cityName}, {item?.countryName}
                          </Typography>
                          <Typography
                            sx={{ color: "#6E6996", fontSize: "10px" }}
                          >
                            {item?.airportName}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
              </>
            ))
          ) : (
            <Box>
              <Typography
                style={{
                  color: "#DC143C",
                  paddingLeft: "10px",
                }}
              >
                Not found
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  const handleClassName = (event: any) => {
    setClassName(event.target.value);
    setClassBoxOpen(false);
  };

  const handleClickAway = () => {
    setTravelerBoxOpen(false);
    setOpenFrom(false);
    setOpenTo(false);
    setClassBoxOpen(false);
    // setOpenJourneyDate(false);
  };

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
          sx={{ bgcolor: "white", mt: 3, borderRadius: "4px", p: "15px 20px" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {flightMenu?.map((menu, i) => (
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
            <Grid
              sx={{
                height: "fit-content",
                width: "100%",
              }}
              container
              rowSpacing={{ lg: 0, md: 0, sm: 1, xs: 1 }}
              columnSpacing={0.1}
            >
              <Grid
                item
                container
                xs={12}
                sm={12}
                md={5.5}
                lg={5.5}
                style={{
                  border: "1px solid #D9D5EC",
                  padding: "10px",
                }}
              >
                {/* From arrival  airport */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  sx={{
                    position: "relative",
                  }}
                  onClick={() => {
                    setOpenFrom((prev) => !prev);
                    setOpenTo(false);
                    setTravelerBoxOpen(false);
                    setClassBoxOpen(false);
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

                    {/* {fromSearchText?.airportCode ===
                      toSearchText?.airportCode && (
                      <Stack
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "0",
                          width: "100%",
                        }}
                      >
                        <Alert
                          icon={<ErrorOutlineIcon fontSize="inherit" />}
                          severity="error"
                          sx={{ fontSize: "11px" }}
                        >
                          Can't choose same place!
                        </Alert>
                      </Stack>
                    )} */}

                    {openFrom ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#003566",
                          backgroundColor: "#fff",
                        }}
                      >
                        <input
                          autoComplete="off"
                          autoFocus
                          onChange={(e) => setSearchKeyword(e.target.value)}
                          placeholder="Search an airport..."
                          style={{
                            color: "#9493BD",
                            fontWeight: 500,
                            width: "100%",
                            height: "40px",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            paddingTop: "10px",
                          }}
                        />
                      </Box>
                    ) : fromSearchText?.airportCode ===
                      toSearchText?.airportCode ? (
                      <Stack
                        style={{
                          position: "absolute",
                          top: "35%",
                          left: "0",
                          width: "90%",
                        }}
                      >
                        <Alert
                          icon={<ErrorOutlineIcon fontSize="inherit" />}
                          severity="error"
                          sx={{ fontSize: "11px" }}
                        >
                          Can't choose same place!
                        </Alert>
                      </Stack>
                    ) : (
                      <Box sx={{ display: "flex", gap: "10px" }} mt={1}>
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
                          <Typography
                            sx={{ color: "#6E6996", fontSize: "11px" }}
                          >
                            {fromSearchText?.airportName}
                          </Typography>
                        </Box>
                      </Box>
                    )}

                    {openFrom && (
                      <Box
                        style={{
                          position: "absolute",
                          top: "120%",
                          left: "0",
                          right: "0",
                          width: "100%",
                          backgroundColor: "#ffffff",
                          height: "fit-content",
                          zIndex: 100,
                          border: "1px solid #6E0A82",
                        }}
                      >
                        <Box>{fromGetSuggetion()}</Box>
                      </Box>
                    )}
                  </Box>
                </Grid>
                {/* To arrival airport */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  sx={{
                    position: "relative",
                  }}
                  onClick={() => {
                    setOpenTo((prev) => !prev);
                    setOpenFrom(false);
                    setTravelerBoxOpen(false);
                    setClassBoxOpen(false);
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
                      <Image src={ToPlane} alt="plan Icon" />
                      <Typography sx={{ fontSize: "12px", color: "#9493BD" }}>
                        To
                      </Typography>
                    </Box>

                    {openTo ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#003566",
                          backgroundColor: "#fff",
                        }}
                      >
                        <input
                          autoComplete="off"
                          autoFocus
                          onChange={(e) => setSearchKeyword(e.target.value)}
                          placeholder="Search an airport..."
                          style={{
                            color: "#9493BD",
                            fontWeight: 500,
                            width: "100%",
                            height: "40px",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            paddingTop: "10px",
                          }}
                        />
                      </Box>
                    ) : fromSearchText?.airportCode ===
                      toSearchText?.airportCode ? (
                      <Stack
                        style={{
                          position: "absolute",
                          top: "35%",
                          left: "0",
                          width: "90%",
                        }}
                      >
                        <Alert
                          icon={<ErrorOutlineIcon fontSize="inherit" />}
                          severity="error"
                          sx={{ fontSize: "11px" }}
                        >
                          Can't choose same place!
                        </Alert>
                      </Stack>
                    ) : (
                      <Box sx={{ display: "flex", gap: "10px" }} mt={1}>
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
                          <Typography
                            sx={{
                              color: "#2D233C",
                              fontSize: "14px",
                            }}
                          >
                            {toSearchText?.cityName},{toSearchText?.countryName}
                          </Typography>
                          <Typography
                            sx={{ color: "#6E6996", fontSize: "11px" }}
                          >
                            {toSearchText?.airportName}
                          </Typography>
                        </Box>
                      </Box>
                    )}

                    {openTo && (
                      <Box
                        style={{
                          position: "absolute",
                          top: "120%",
                          left: "0",
                          right: "0",
                          width: "100%",
                          backgroundColor: "#ffffff",
                          height: "fit-content",
                          zIndex: 100,
                          border: "1px solid #6E0A82",
                        }}
                      >
                        <Box>{toGetSuggetion()}</Box>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>

              {/*  date */}
              <Grid
                item
                container
                xs={12}
                sm={12}
                md={3.5}
                lg={3.5}
                style={{
                  border: "1px solid #D9D5EC",
                  padding: "10px",
                  position: "relative",
                }}
                ml={{
                  sm: 1.5,
                  xs: 0,
                }}
                mt={{
                  xs: 1,
                  sm: 0,
                }}
              >
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={7.5}
                  lg={7.5}
                  sx={{
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setOpenJourneyDate((prev) => !prev);
                      setOpenFrom(false);
                      setOpenTo(false);
                      setTravelerBoxOpen(false);
                      setClassBoxOpen(false);
                    }}
                  >
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
                          {moment(journeyDate).format("DD")}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ color: "#2D233C", fontSize: "14px" }}>
                          {moment(journeyDate).format("MMMM")}
                        </Typography>
                        <Typography sx={{ color: "#6E6996", fontSize: "11px" }}>
                          {moment(journeyDate).format("dddd")},{" "}
                          {moment(journeyDate).format("YYYY")}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {openJourneyDate && (
                    <Box>
                      <Calendar
                        className={"dashboard-calendar"}
                        color="#A56EB4"
                        date={new Date(journeyDate)}
                        direction="horizontal"
                        minDate={today}
                        // maxDate={maxDate}
                        // months={1}
                        onChange={handleSelect}
                      />
                    </Box>
                  )}
                </Grid>

                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={4.5}
                  lg={4.5}
                  sx={{
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <Box
                    sx={{
                      width: "2px",
                      border: "1px solid #D9D5EC",
                      position: "absolute",
                      height: "60px",
                      left: "-25px",
                    }}
                    display={{ xs: "none", sm: "block" }}
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
                    <Box>
                      <AddIcon sx={{ fontSize: "40px", color: "#9493BD" }} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/*  //todo: Passenger info */}
              <Grid
                item
                xs={12}
                sm={12}
                md={1.9}
                lg={1.9}
                sx={{
                  position: "relative",
                }}
                ml={{
                  sm: 1.5,
                  xs: 0,
                }}
                mt={{
                  xs: 1,
                  sm: 0,
                }}
              >
                <Box
                  sx={{
                    border: "1px solid #D9D5EC",
                    padding: "10px",
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                      onClick={() => {
                        setClassBoxOpen((prev) => !prev);
                        setOpenFrom(false);
                        setOpenTo(false);
                        setTravelerBoxOpen(false);
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
                        {className}
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
                        setOpenFrom(false);
                        setOpenTo(false);
                        setClassBoxOpen(false);
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
                          backgroundColor: "#FFFFFF",
                          width: "260px",
                          border: "1px solid #6E0A82",
                        }}
                      >
                        <Box width="250px" p={2}>
                          <Typography
                            style={{
                              textAlign: "left",
                              marginBottom: "5px",
                              color: "#2D233C",
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
                            <Box width="60%">
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "#2D233C",
                                }}
                              >
                                Adult
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: "#B4B4CD",
                                }}
                              >
                                Aged 12y+
                              </Typography>
                            </Box>
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="space-between"
                              width="40%"
                            >
                              <button
                                onClick={adultDecrement}
                                style={{
                                  backgroundColor: "#C3A0CD",
                                  color: "#ffffff",
                                  border: "none",
                                  width: "22px",
                                  height: "22px",
                                  fontSize: "25px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                }}
                              >
                                -
                              </button>
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  color: "#2D233C",
                                }}
                              >
                                {adultCount}
                              </Typography>
                              <button
                                onClick={adultInclement}
                                style={{
                                  backgroundColor: "#C3A0CD",
                                  color: "#ffffff",
                                  border: "none",
                                  width: "22px",
                                  height: "22px",
                                  fontSize: "25px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                }}
                              >
                                +
                              </button>
                            </Stack>
                          </Stack>

                          <Stack
                            direction="row"
                            spacing={4}
                            justifyContent="space-between"
                            alignItems="center"
                            pb={1}
                          >
                            <Box width="60%">
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "#2D233C",
                                }}
                              >
                                Child
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: "#B4B4CD",
                                }}
                              >
                                Aged 5y - 12y
                              </Typography>
                            </Box>
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="space-between"
                              width="40%"
                            >
                              <button
                                onClick={childDecrement}
                                style={{
                                  backgroundColor: "#C3A0CD",
                                  color: "#ffffff",
                                  border: "none",
                                  width: "22px",
                                  height: "22px",
                                  fontSize: "25px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                }}
                              >
                                -
                              </button>
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  color: "#2D233C",
                                }}
                              >
                                {childCount}
                              </Typography>
                              <button
                                onClick={childIncrement}
                                style={{
                                  backgroundColor: "#C3A0CD",
                                  color: "#ffffff",
                                  border: "none",
                                  width: "22px",
                                  height: "22px",
                                  fontSize: "25px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                }}
                              >
                                +
                              </button>
                            </Stack>
                          </Stack>

                          <Stack
                            direction="row"
                            spacing={4}
                            justifyContent="space-between"
                            alignItems="center"
                            pb={1}
                          >
                            <Box width="60%">
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "#2D233C",
                                }}
                              >
                                Kids
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: "#B4B4CD",
                                }}
                              >
                                Aged 2y - 5y
                              </Typography>
                            </Box>
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="space-between"
                              width="40%"
                            >
                              <button
                                onClick={kidDecrement}
                                style={{
                                  backgroundColor: "#C3A0CD",
                                  color: "#ffffff",
                                  border: "none",
                                  width: "22px",
                                  height: "22px",
                                  fontSize: "25px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                }}
                              >
                                -
                              </button>
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  color: "#2D233C",
                                }}
                              >
                                {kidCount}
                              </Typography>
                              <button
                                onClick={kidInclement}
                                style={{
                                  backgroundColor: "#C3A0CD",
                                  color: "#ffffff",
                                  border: "none",
                                  width: "22px",
                                  height: "22px",
                                  fontSize: "25px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                }}
                              >
                                +
                              </button>
                            </Stack>
                          </Stack>

                          <Stack
                            direction="row"
                            spacing={4}
                            justifyContent="space-between"
                            alignItems="center"
                            pb={1}
                          >
                            <Box width="60%">
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "#2D233C",
                                }}
                              >
                                Infant on lap
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: "#B4B4CD",
                                }}
                              >
                                Below 24 m
                              </Typography>
                            </Box>
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="space-between"
                              width="40%"
                            >
                              <button
                                onClick={infantDecrement}
                                style={{
                                  backgroundColor: "#C3A0CD",
                                  color: "#ffffff",
                                  border: "none",
                                  width: "22px",
                                  height: "22px",
                                  fontSize: "25px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                }}
                              >
                                -
                              </button>
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  color: "#2D233C",
                                }}
                              >
                                {infantCount}
                              </Typography>
                              <button
                                onClick={infantIncrement}
                                style={{
                                  backgroundColor: "#C3A0CD",
                                  color: "#ffffff",
                                  border: "none",
                                  width: "22px",
                                  height: "22px",
                                  fontSize: "25px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                }}
                              >
                                +
                              </button>
                            </Stack>
                          </Stack>
                          <Box mt={2} style={{ textAlign: "right" }}>
                            <Button
                              size="small"
                              onClick={handleClose}
                              className="shine-effect"
                              style={{
                                backgroundColor: "#C3A0CD",
                                color: "#fff",
                              }}
                            >
                              DONE
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    )}

                    {classBoxOpen && (
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
                          backgroundColor: "#FFFFFF",
                          width: "260px",
                          border: "1px solid #6E0A82",
                          cursor: "pointer",
                        }}
                      >
                        <Box p={2}>
                          <Typography
                            style={{
                              textAlign: "left",
                              marginBottom: "5px",
                              color: "#2D233C",
                              fontWeight: 400,
                            }}
                          >
                            Class Name
                          </Typography>
                          <FormControl>
                            <RadioGroup
                              value={className}
                              onChange={handleClassName}
                            >
                              <Grid container spacing={0}>
                                {flightClasses.map((classes, i) => (
                                  <Grid key={i} item xs={12}>
                                    <FormControlLabel
                                      value={classes}
                                      control={
                                        <Radio
                                          sx={{
                                            color: "#C3A0CD",
                                            "&.Mui-checked": {
                                              color: "#6E0A82",
                                            },
                                          }}
                                        />
                                      }
                                      label={
                                        <Typography
                                          sx={{
                                            color: "#2D233C",
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
                          </FormControl>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                md={0.7}
                ml={{
                  sm: 1.5,
                  xs: 0,
                }}
                mt={{
                  xs: 1,
                  sm: 0,
                }}
              >
                <Box
                  sx={{
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
