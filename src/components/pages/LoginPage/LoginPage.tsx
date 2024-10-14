import CardWrapper from "@/components/global/CardWrapper/CardWrapper";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <>
      <CardWrapper sx={{ display: "flex", flexDirection: "column" }}>
        <label>email</label>
        <input type="text" />
        <label>password</label>
        <input type="password" />
        <Link href="/dashboard">
          <Button>Login </Button>
        </Link>
      </CardWrapper>
    </>
  );
};

export default LoginPage;
