import { Stack, Typography } from "@mui/material";

export const Logo = ({ color = "inherit" }) => {
  return (
    <Stack alignItems="baseline" direction="row" spacing={0.5}>
      <Typography sx={{ fontSize: '32px', fontFamily: 'Inria Serif', fontWeight: 'bold', color: color }}>
        Chuwa
      </Typography>
      <Typography sx={{ fontSize: '16px', fontFamily: 'Inria Serif', color: color }}>
        EM System
      </Typography>
    </Stack>
  );
};
